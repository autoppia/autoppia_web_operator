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
        const screenElement = document.getElementsByClassName('screenshot') as HTMLCollectionOf<any>;
        if (screenElement) {

            const base64Prefix = 'data:image/png;base64,';
            screenElement[0].src = base64Prefix + screenshot;
            screenElement[1].src = base64Prefix + screenshot;
        }
    });

    dispatch(setSocket(socket));
};