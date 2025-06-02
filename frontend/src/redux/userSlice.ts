import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    email: string;
    instructions: string;
}

const initialState: UserState = {
    email: "",
    instructions: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.instructions = action.payload.instructions;
        }
    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

