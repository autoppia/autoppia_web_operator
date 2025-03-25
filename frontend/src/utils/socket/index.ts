import { io } from 'socket.io-client';

import { addSocket, addSocketId, removeSocketId } from '../../redux/socketSlice';
import { addAction, addResult } from '../../redux/chatSlice';
import { AppDispatch } from '../../redux/store';

export const initializeSocket = (dispatch: AppDispatch, agentEndpoint: string) => {
    const socket = io(agentEndpoint);

    socket.on('connect', () => {
        console.log(`Connected to the server: ${socket.id}`);
        dispatch(addSocketId(socket.id));
        dispatch(addAction({ socketId: socket.id, action: 'Initialize browser.' }));
    });

    socket.on('disconnect', () => {
        console.log(`Disconnected from the server: ${socket.id}`);
        dispatch(removeSocketId(socket.id));
    });

    socket.on('error', ({ error }) => {
        console.error('Socket error:', error);
    })

    socket.on('screenshot', ({ screenshot }) => {
        const screenElement = document.getElementById(`${socket.id}_screenshot_main`) as HTMLImageElement;
        if (screenElement) {
            const base64Prefix = 'data:image/png;base64,';
            screenElement.src = base64Prefix + screenshot;
        }
    });

    socket.on('action', ({ action }) => {
        dispatch(addAction({ socketId: socket.id, action }));
    });

    socket.on('result', (result) => {
        dispatch(addResult({ socketId: socket.id, ...result }));
    });

    dispatch(addSocket(socket));

    return socket;
};