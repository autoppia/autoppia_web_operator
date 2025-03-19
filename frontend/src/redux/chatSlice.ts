import { createSlice } from "@reduxjs/toolkit";
import { I_Chat } from "../utils/types";

interface ChatState {
  chats: I_Chat[];
  running: boolean;
}

const initialState: ChatState = {
  chats: [],
  running: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetChat: (state) => {
      state.chats = [];
      state.running = false;
    },
    addTask: (state, action) => {
      state.chats = [...state.chats, {
        role: "user",
        content: action.payload,
      }];
      state.running = true;
    },
    addAction: (state, action) => {
      const length = state.chats.length;
      if (state.chats[length - 1].role === "user") {
        state.chats = [
          ...state.chats,
          {
            role: "assistant",
            thinking: action.payload,
            state: "thinking",
            actions: [{ name: action.payload, icon: null }],
          },
        ];
      } else {
        state.chats[length - 1] = {
          ...state.chats[length - 1],
          thinking: action.payload,
          state: "thinking",
          actions: [
            ...state.chats[length - 1].actions!,
            { name: action.payload, icon: null },
          ]
        };
      }
    },
    addResult: (state, action) => {
      const length = state.chats.length;
      if (state.chats[length - 1].role === "user") {
        state.chats = [
          ...state.chats,
          {
            role: "assistant",
            content: action.payload.content,
            state: action.payload.success ? "success" : "error",
          },
        ];
      } else {
        state.chats[length - 1] = {
          ...state.chats[length - 1],
          content: action.payload.content,
          state: action.payload.success ? "success" : "error",
        }
      }
      state.running = false;
    }
  },
});

export const { resetChat, addTask, addAction, addResult } = chatSlice.actions;
export default chatSlice.reducer;
