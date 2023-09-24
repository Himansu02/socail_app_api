const express = require("express");
var app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/user");
const socket = require("socket.io");
const postRouter = require("./routes/post");
const conversationRouter = require("./routes/conversation");
const messageRouter = require("./routes/message");
const notificationRouter = require("./routes/notification");
const commentRouter = require("./routes/comment");
const {Server}= require('socket.io')

dotenv.config();

app.use(express.json());

app.use(cors());
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/conversation", conversationRouter);
app.use("/message", messageRouter);
app.use("/notification", notificationRouter);
app.use("/comment", commentRouter);

mongoose
  .connect(process.env.MONGO_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DBconnection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

var server = app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is listening at 5000");
});

var io = new Server(server,{
  cors:{
    origin:true,
    credentials: true,
  },
  allowEIO3: true,
});

// To  receive event from client use socket.on and to send event use io.emit(this is forwaded to all users) or io.to(id).emit(this will send to a specific user)

let onlineUsers = [];

const addUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId: userId, socketId: socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => {
    return user.socketId !== socketId;
  });
};

const getUser = (userId) => {
  const user = onlineUsers.find((user) => user.userId === userId);

  return user;
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on(
    "sendNotification",
    ({ senderId, receiverId, type, postId, text, commentId }) => {
      const receiver = getUser(receiverId);
      if (!receiver) {
        return;
      }

      io.to(receiver.socketId).emit("getNotification", {
        senderId,
        type,
        postId,
        text,
        commentId,
      });
    }
  );

  socket.on(
    "sendMessage",
    ({ senderId, receiverId, postId, text, conversationId }) => {
      const receiver = getUser(receiverId);
      if (!receiver) {
        return;
      }
      io.to(receiver.socketId).emit("getMessage", {
        senderId,
        text,
        conversationId,
        postId,
      });
    }
  );

  socket.on("disconnect", () => {
    console.log("disconnect");
    removeUser(socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});
