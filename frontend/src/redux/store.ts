import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./socketSlice";
import chatReducer from "./chatSlice";

const store = configureStore({
  reducer: {
    socket: socketReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
