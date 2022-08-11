import React, { useState, useEffect } from 'react';
const { io } = require("socket.io-client");
function Chat() {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");

    const [chatId, setChatId] = useState("ExamChat")

    const [messages, setMessages] = useState([])
    const [loadingChat, setLoadingChat] = useState(false);
    useEffect(() => {
        const wsocket = io("http://localhost:5000");
        setSocket(wsocket)
    }, [])
    useEffect(() => {
        if (socket) {

            socket.on("connect", () => {
                console.log(socket.id);
                setLoadingChat(true);
                socket.emit("getChatHistory", chatId)
            });


            socket.on("chatHistory", (chatHistory) => {
                setMessages(messages => [...chatHistory])
                setLoadingChat(false);
            });

            socket.on("disconnect", () => {
                console.log(socket.id);
            });
            socket.on("newMessage", (newMessage) => {
                console.log(newMessage)
                setMessages((messages) => [...messages, newMessage])

            });
        }
    }, [socket]);

    const messageForm = (e) => {
        e.preventDefault();
        const newMessage = {
            sendedBy: "UserName",
            message: message,
            userId: socket.id,
            sendedAt: new Date().getTime(),
            chatId: chatId
        }
        socket.emit("sendMessage", newMessage);
        setMessages((messages) => [...messages, newMessage])
        setMessage("");
    }



    return (
        <div>
            <div className="row">
                <div className="col col-lg-3">

                </div>
                <div className="col col-lg-6 chat-container">
                    <div class="message-container">
                        <div className="message">
                            {messages.map(m => (
                                <p key={m.message} className={(m.userId != socket.id.toString() ? 'left' : 'right')}>{m.message}</p>
                            ))}
                        </div>
                    </div>
                    <div class="chat-input">
                        <form className="chart-form" onSubmit={messageForm}>
                            <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Chat
