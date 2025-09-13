"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomHandler = void 0;
var roomHandler = function (socket) {
    console.log("Room handler initialized for socket:", socket.id);
    var createRoom = function (data) {
        console.log("a user created the room", data);
    };
    var joinRoom = function (data) {
        console.log("a user joined the room", data);
    };
    socket.on("create_room", createRoom);
    socket.on("join_room", joinRoom);
    console.log("Event listeners registered for create_room and join_room");
};
exports.roomHandler = roomHandler;
