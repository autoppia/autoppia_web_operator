export const SOCKET_CONNECT = "SOCKET_CONNECT";
export const SOCKET_DISCONNECT = "SOCKET_DISCONNECT";
export const SOCKET_MESSAGE = "SOCKET_MESSAGE";

export interface SocketState {
  socket: WebSocket | null;
}

interface SocketConnectAction {
  type: typeof SOCKET_CONNECT;
  payload: WebSocket;
}

interface SocketDisconnectAction {
  type: typeof SOCKET_DISCONNECT;
}

interface SocketMessageAction {
  type: typeof SOCKET_MESSAGE;
  payload: string;
}

export type SocketActionTypes =
  | SocketConnectAction
  | SocketDisconnectAction
  | SocketMessageAction;
