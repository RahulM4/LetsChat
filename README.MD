# LetsChat - A Real-Time Chat Application

LetsChat is a full stack chat application that allows users to communicate with each other in real-time. It supports features like user authentication, one-on-one chat, group chat, user profile management, and more.

**Tech Stack:**

- MERN (MongoDB, Express.js, React, Node.js)
- Socket.IO


## Screenshots

## Features
- Home
  - Login Page
  - Sign Up Page
  - Forgot Password Page
- Chat Page
  - Search User
  - One-on-One Chat
  - Group Chat
  - User Profile
  - Group Menu


## Getting Started 🎯

To get started with LetsChat, follow these steps:

1. Fork and clone the repository from GitHub:

   ```bash
   git clone https://github.com/RahulM4/LetsChat.git
   ```

## Install the required packages for the backend by running the following command in the root directory:

    npm install
 

## Install the required packages for the frontend by navigating to the frontend directory and running the following command:

    cd ./frontend
    npm install
 

## Run the following command in the root directory:

      npm start


## Setting Up .env in Backend 🔧

To set up the environment variables for the backend, create a `.env` file inside the `backend/Apputills` directory with the following contents:

```bash

PORT=5000
DB_LINK=xxxx
JWT_SECRET=xxxx
JWT_EXPIRE=2d
COOKIE_EXPIRE=2
NODE_ENV=production
CLOUDINARY_NAME=xxxx
API_KEY=xxxx
API_SECRET=xxxx
CLOUDINARY_URL=xxxx

```



## Packages Used 📦

### Server side :

| Dependency         | Description                                           |
| ------------------ | ----------------------------------------------------- |
| bcryptjs           | Library for hashing and salting passwords             |
| body-parser        | Middleware for parsing request bodies                 |
| cookie-parser      | Middleware for parsing cookies                        |
| cors               | Middleware for enabling Cross-Origin Resource Sharing |
| dotenv             | Library for loading environment variables from a file |
| express            | Web application framework for Node.js                 |
| express-fileupload | Middleware for handling file uploads                  |
| jsonwebtoken       | Library for generating and verifying JSON Web Tokens  |
| mongoose           | MongoDB object modeling tool for Node.js              |
| multer             | Middleware for handling file uploads                  |
| nodemailer         | Library for sending emails                            |
| cloudinary         | Cloud-based image and video management platform       |

### Clint-side :

| Dependency               | Description                                                    |
| ------------------------ | -------------------------------------------------------------- |
| @chakra-ui/icons         | Icon library for Chakra UI                                     |
| @chakra-ui/react         | UI component library for React with Chakra UI                  |
| @emotion/react           | Library for writing CSS styles with JavaScript                 |
| @emotion/styled          | Library for styling React components with Emotion              |
| @material-ui/core        | Material-UI component library for React                        |
| @material-ui/icons       | Material-UI icons package for React                            |
| @mui/icons-material      | Material-UI icons package for MUI (formerly Material-UI)       |
| @mui/material            | UI component library for React with MUI (formerly Material-UI) |
| axios                    | Promise-based HTTP client for the browser and Node.js          |
| framer-motion            | Library for creating fluid animations in React                 |
| react                    | JavaScript library for building user interfaces                |
| react-chips              | React component for input chips                                |
| react-dom                | Entry point for React DOM rendering                            |
| react-helmet             | Library for managing document head tags in React               |
| react-lottie             | Library for adding Lottie animations to React applications     |
| react-notification-badge | Notification badge component for React                         |
| react-router-dom         | Routing library for React applications                         |
| react-scripts            | Configuration and scripts for Create React App                 |
| react-scrollable-feed    | Scrollable feed component for React                            |
| socket.io-client         | Library for WebSocket communication in the browser             |
| styled-components        | Library for styling React components with CSS-in-JS            |

## Upcoming Features 🚀

- Dark mode
- Audio and video calls
- Reset password
- Media sharing

