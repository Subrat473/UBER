const { Server } = require('socket.io');

let io;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: '*', // allow your frontend URL in production, e.g. 'https://uber-frontend.vercel.app'
            methods: ['GET', 'POST']
        },
        transports: ['websocket', 'polling'] // ensures fallback if websocket fails
    });

    io.on('connection', (socket) => {
        console.log('Socket connected:', socket.id);

        // Example: listen to a test event
        socket.on('test-event', (data) => {
            console.log('Received test-event:', data);
            socket.emit('test-response', { message: 'Received your event!' });
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected:', socket.id);
        });
    });
}

function getIo() {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
}

module.exports = { initializeSocket, getIo };
