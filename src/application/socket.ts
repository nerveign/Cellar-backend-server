import { Server, Socket } from 'socket.io';
import http from 'http';
import express, { Application } from 'express';

const app: Application = express();
const server = http.createServer(app);

interface UserSocketMap {
    [userId: string]: string;
}

const userSocketMap: UserSocketMap = {}; // { userId: socketId }

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
    },
});

// get user socketid
export function getReceiverSocketId(userId: string): string | undefined {
    return userSocketMap[userId];
}

io.on('connection', (socket: Socket) => {
    console.log('A user connected:', socket.id);

    const userId = socket.handshake.query.userId as string | undefined;
    if (userId) userSocketMap[userId] = socket.id;

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        if (userId) delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

export { io, app, server };
