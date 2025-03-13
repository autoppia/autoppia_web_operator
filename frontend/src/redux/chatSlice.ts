import { createSlice } from "@reduxjs/toolkit";
import { I_Chat } from "../utils/types";

interface ChatState {
  chats: I_Chat[];
}

const initialState: ChatState = {
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetChat: (state) => {
      state.chats = [];
    },
    addTask: (state, action) => {
      state.chats = [...state.chats, {
        role: "user",
        content: action.payload,
      }];
    },
    addAction: (state, action) => {
      const length = state.chats.length;
      if (state.chats[length - 1].role === "user") {
        state.chats = [
          ...state.chats,
          {
            role: "assistant",
            thinking: action.payload,
            actions: [{ name: action.payload, icon: null }],
          },
        ];
      } else {
        state.chats[length - 1] = {
          ...state.chats[length - 1],
          thinking: action.payload,
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
            content: action.payload,
          },
        ];
      } else {
        state.chats[length - 1] = {
          ...state.chats[length - 1],
          thinking: "Task completed. Waiting for new task.",
          content: action.payload,
        }
      }
    }
  },
});

export const { resetChat, addTask, addAction, addResult } = chatSlice.actions;
export default chatSlice.reducer;
