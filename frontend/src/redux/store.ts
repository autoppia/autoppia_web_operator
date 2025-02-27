import { configureStore } from '@reduxjs/toolkit';  
import socketReducer from './socketSlice';  

const store = configureStore({  
  reducer: {  
    socket: socketReducer,  
  },  
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});  

export type RootState = ReturnType<typeof store.getState>;  
export type AppDispatch = typeof store.dispatch;  

export default store;