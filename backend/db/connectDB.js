const mongoose = require("mongoose");
require("dotenv").config({path : "backend/appUtills/.env"});



function connectDB() {
  mongoose
    .connect(process.env.DB_LINK)
    .then(() => console.log("DB_CONNECTED"))
    .catch((err) => console.log(`err ${err.message}`));
}


module.exports = connectDB