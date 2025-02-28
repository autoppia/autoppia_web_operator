import { createSlice } from "@reduxjs/toolkit";

interface PromptState {
  prompt: string[];
  baseUrl: string;
}

const initialState: PromptState = {
  prompt: [],
  baseUrl: "",
};
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setPrompt: (state, action) => {
      state.prompt = action.payload;
    },
    setBaseUrl: (state, action) => {
      state.baseUrl = action.payload;
    },
    updatePrompt: (state, action) => {
      state.prompt = [...state.prompt, action.payload];
    },
  },
});

export const { setPrompt, setBaseUrl, updatePrompt } = taskSlice.actions;
export default taskSlice.reducer;
