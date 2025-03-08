import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./socketSlice";
import taskReducer from "./taskSlice";

const store = configureStore({
  reducer: {
    socket: socketReducer,
    task: taskReducer,
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
