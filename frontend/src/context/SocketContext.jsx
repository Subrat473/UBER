import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

// Use the environment variable for backend URL
// Vite uses import.meta.env for env variables starting with VITE_
const BACKEND_URL = import.meta.env.VITE_API_URL; // Ensure this is set in your .env

// Initialize socket connection
const socket = io(BACKEND_URL, {
    transports: ['websocket', 'polling'], // ensures fallback to polling if websocket fails
});

const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Connection event
        socket.on('connect', () => {
            console.log('Connected to server:', socket.id);
        });

        // Disconnection event
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // Clean up on unmount
        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
