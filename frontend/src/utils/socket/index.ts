import { io } from 'socket.io-client';

import { setSocket } from '../../redux/socketSlice';
import { AppDispatch } from '../../redux/store';

export const initializeSocket = (dispatch: AppDispatch, url: string) => {
    const socket = io(url);

    socket.on('connect', () => {
        console.log('Connected to the server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from the server');
    });

    socket.on('error', ({ error }) => {
        console.error('Socket error:', error);
    })

    socket.on('screenshot', ({ screenshot }) => {
        const screenElement = document.getElementById('screenshot') as HTMLImageElement;
        if (screenElement) {
            const base64Prefix = 'data:image/png;base64,';
            screenElement.src = base64Prefix + screenshot;
        }
    });

    dispatch(setSocket(socket));
};