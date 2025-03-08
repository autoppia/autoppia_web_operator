import { createSlice } from "@reduxjs/toolkit";

interface TaskState {
  prompts: string[];
  baseUrl: string;
}

const initialState: TaskState = {
  prompts: [],
  baseUrl: "",
};
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    resetPrompts: (state) => {
      state.prompts = [];
    },
    addPrompt: (state, action) => {
      state.prompts = [...state.prompts, action.payload];
    },
    setBaseUrl: (state, action) => {
      state.baseUrl = action.payload;
    },
  },
});

export const { resetPrompts, addPrompt, setBaseUrl } = taskSlice.actions;
export default taskSlice.reducer;
