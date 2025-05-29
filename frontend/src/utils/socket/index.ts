import { io } from 'socket.io-client';

import { addSocket, addSocketId, setScreenshot } from '../../redux/socketSlice';
import { addAction, addResult } from '../../redux/chatSlice';
import { AppDispatch } from '../../redux/store';
import { HistoryItem } from '../types';

const apiUrl = process.env.REACT_APP_API_URL;
const validatorUrl = process.env.REACT_APP_VALIDATOR_URL;

export const initializeSocket = (dispatch: AppDispatch, socketioPath: string, email: string) => {
    const socket = io(validatorUrl, {
        path: socketioPath,
        timeout: 60000,
        reconnection: false
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
        dispatch(setScreenshot({
            socketId: socket.id,
            screenshot: base64Prefix + screenshot
        }))
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
        await saveHistory({
            ...history,
            email: email,
            socketioPath: socketioPath
        })
    })

    dispatch(addSocket(socket));

    return socket;
};

const saveHistory = async (history: HistoryItem) => {
    try {
        await fetch(`${apiUrl}/history/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(history)
        })
    } catch (err) {
        console.error(err);
    }
}