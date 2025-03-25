import { createSlice } from '@reduxjs/toolkit';

interface SocketState {
    sockets: any[];
    socketIds: string[];
}

const initialState: SocketState = {
    sockets: [],
    socketIds: [],
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        resetSocket: (state) => {
            state.sockets.forEach((socket) => {
                socket.close();
            });
            state.sockets = [];
            state.socketIds = [];
        },
        addSocket: (state, action) => {
            state.sockets = [...state.sockets, action.payload];
        },
        addSocketId: (state, action) => {
            state.socketIds = [...state.socketIds, action.payload];
        },
        removeSocketId: (state, action) => {
            state.socketIds = state.socketIds.filter((id) => id !== action.payload);
        }
    },
});

export const { resetSocket, addSocket, addSocketId, removeSocketId } = socketSlice.actions;
export default socketSlice.reducer;