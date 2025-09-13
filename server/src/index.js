"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var cors_1 = require("cors");
var room_1 = require("../room");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
var server = http_1.default.createServer(app);
var port = 8080;
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
io.on("connection", function (socket) {
    console.log("a user connected");
    (0, room_1.roomHandler)(socket);
    socket.on("disconnect", function () {
        console.log("a user disconnected");
    });
});
app.get("/", function (_, res) {
    res.send("Hello World");
});
server.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
