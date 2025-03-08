import { createSlice } from '@reduxjs/toolkit';

interface SocketState {
    endpoint: string;
    socket: any;
    connected: boolean;
}

const initialState: SocketState = {
    endpoint: '',
    socket: null,
    connected: false,
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setEndpoint: (state, action) => {
            state.endpoint = action.payload;
        },
        setSocket: (state, action) => {
            state.socket = action.payload;
            state.connected = action.payload !== null;
        },
        disconnect: (state) => {
            if (state.socket) {
                state.socket.close();
            }
            state.socket = null;
            state.connected = false;
        },
    },
});

export const { setSocket, disconnect } = socketSlice.actions;
export default socketSlice.reducer;