
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("../backend/db/connectDB");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const errorMiddleware = require("./middleWare/errorHandler");
const fileUpload = require("express-fileupload");
const path = require("path");
var cors = require("cors");
// routes
const userRoute = require("./route/userRoute");
const chatRuote = require("./route/chatRoute");
const messageRoute = require("./route/messageRoutes");
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());
app.use(errorMiddleware);


//this is for logging the incoming request
// app.use((req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
//   next();
// });

app.use("/api/user", userRoute);
app.use("/api/chat", chatRuote);
app.use("/api/message", messageRoute);
app.use(cors());
// conncet with cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// -----deployement code-----

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// connect to DB
connectDB();

const PORT = process.env.PORT;

const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);
// socket.io connection
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
  // join room
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  // typing message
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  // stop typing message
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // send message
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    // if there is no chat then return
    if (!chat.users) return console.log("chat.users not defined");
    // loop through all users in chat and send message to each of them individually
    chat.users.forEach((user) => {
      // if user is not sender then send message to that user  else return
      if (user._id == newMessageRecieved.sender._id) return; // if user is sender then return

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  // when user disconnect from socket then leave the room and disconnect the socket connection
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
