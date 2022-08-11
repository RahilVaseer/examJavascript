const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

describe("should check socketIo", () => {
    let io, serverSocket, clientSocket;

    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = 5001;
            clientSocket = new Client(`http://localhost:${port}`);
            io.on("connection", (socket) => {
                serverSocket = socket;
                clientSocket.emit("getChatHistory", "ExamChat")

            });
            clientSocket.on("connect", done);
        });
    });

    afterAll(() => {
        io.close();
        clientSocket.close();
    });

    test("should getChatHistory", (done) => {
        clientSocket.on("chatHistory", (chatHistory) => {
            expects(chatHistory.length).toBe(1)
        });
    })

    test("should send new message", (done) => {
        serverSocket.on("sendMessage", (arg) => {
            expect(arg).toHaveProperty("message")
            done();
        });

        const newMessage = {
            sendedBy: "UserName",
            message: message,
            userId: socket.id,
            sendedAt: new Date().getTime(),
            chatId: chatId
        }
        clientSocket.emit("sendMessage", newMessage);
    });


});