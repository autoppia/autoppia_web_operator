import {
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
  SOCKET_MESSAGE,
  SocketState,
  SocketActionTypes,
} from "./types";

const initialState: SocketState = {
  socket: null,
};

export const socketReducer = (
  state = initialState,
  action: SocketActionTypes
): SocketState => {
  switch (action.type) {
    case SOCKET_CONNECT:
      return { socket: action.payload };
    default:
      return state;
  }
};
