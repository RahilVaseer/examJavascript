const express = require('express');
const connectDB = require('./config/db');
const { createServer } = require("http");
const { Server } = require("socket.io");
const Message = require('./models/Message');

const app = express();

connectDB();





const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    console.log(socket.id);


    socket.on("getChatHistory", (chatId) => {
        console.log(chatId)
        Message.find({ chatId: chatId }).then((messages) => {
            socket.emit("chatHistory", messages)
        }).catch((err) => {
            socket.emit("chatHistory", [])
        });

    });
    socket.on("sendMessage", async (msg) => {
        var newMessage = new Message({
            message: msg.message,
            chatId: msg.chatId,
            sendedAt: msg.sendedAt
        })

        await newMessage.save();

        socket.broadcast.emit("newMessage", msg);
    });
});






const PORT = process.env.PORT || 5000;
const server = httpServer.listen(PORT, () => { console.log('server started on port' + PORT) });


module.exports = server;