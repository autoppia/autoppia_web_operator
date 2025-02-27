import { createSlice } from '@reduxjs/toolkit';

interface SocketState {
    socket: any;
    connected: boolean;
}

const initialState: SocketState = {
    socket: null,
    connected: false,
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
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