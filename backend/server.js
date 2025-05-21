import app from "./app.js";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import projectmodel from "./models/projectmodel.js";
import { generateContent } from "./services/ai_services.js";
dotenv.config();
import cors from "cors";

const http_server = http.createServer(app);
const io = new Server(http_server, { cors: { origin: "*" } });

io.use(async function (socket, next) {
    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];

        if (!token) return next(new Error("unauthorized user"));
        const decoded = jwt.verify(token, process.env.SECRET);
        if (!decoded) return next(new Error("unauthorized user"));

        const projectid = socket.handshake.query.project_id;
        socket.project_id = projectid;
        socket.project = await projectmodel.findOne({ _id: projectid });
        socket.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
});

io.on("connection", function (socket) {
    console.log("socket connected");
    socket.join(socket.project_id);
    socket.on("project-message", async function (data) {
        // check if ai is present in the message
        socket.broadcast.to(socket.project_id).emit("project-message", data);
        const aipresent = data.send.includes("@ai");
        if (aipresent) {
            console.log("ai is present");
            const prompt = data.send.replace("@ai", "");
            const result = await generateContent(prompt);
            console.log(result);
            io.to(socket.project_id).emit("project-message", { send: result, sender: { email: "AI" } });
        }

        console.log(data);
    });
    socket.on("disconnect", function () {
        console.log("user disconnected");
        socket.leave(socket.project_id);
    });
});

const port = process.env.server_PORT||3000;

http_server.listen(port, function () {
    console.log(`server is running on port ${port}`);
});