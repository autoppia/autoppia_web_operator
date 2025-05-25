import { io } from 'socket.io-client';

import { addSocket, addSocketId } from '../../redux/socketSlice';
import { addAction, addResult } from '../../redux/chatSlice';
import { AppDispatch } from '../../redux/store';

const validatorUrl = process.env.REACT_APP_VALIDATOR_URL;

export const initializeSocket = (dispatch: AppDispatch, socketioPath: string, email: string) => {
    const socket = io(validatorUrl, {
        path: socketioPath,
    });

    socket.on('connect', () => {
        console.log(`Connected to the agent: ${validatorUrl + socketioPath}`);
    });

    socket.on('disconnect', (reason) => {
        console.log(`Disconnected from the agent: ${validatorUrl + socketioPath}`);
        console.log(reason);
    });

    socket.on('error', ({ error }) => {
        console.error('Socket error:', error);
    })

    socket.on('screenshot', ({ screenshot }) => {
        const base64Prefix = 'data:image/png;base64,';

        const mainScreen = document.getElementById(`${socket.id}_screenshot_main`) as HTMLImageElement;
        if (mainScreen) {
            mainScreen.src = base64Prefix + screenshot;
        }

        const sideScreen = document.getElementById(`${socket.id}_screenshot_side`) as HTMLImageElement;
        if (sideScreen) {
            sideScreen.src = base64Prefix + screenshot;
        }
    });

    socket.on('socket-id', ({ sid }) => {
        dispatch(addSocketId(sid));
    });

    socket.on('action', (action) => {
        dispatch(addAction({ socketId: socket.id, ...action }));
    });

    socket.on('result', (result) => {
        dispatch(addResult({ socketId: socket.id, ...result }));
    });

    socket.on('history', async (history) => {
        try {
            await fetch(`${validatorUrl}/history/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...history,
                    email: email,
                    socketioPath: socketioPath
                })
            })
        } catch (err) {
            console.error(err);
        }
    })

    dispatch(addSocket(socket));

    return socket;
};