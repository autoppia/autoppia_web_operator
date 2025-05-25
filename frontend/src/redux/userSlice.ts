import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    email: string;
}

const initialState: UserState = {
    email: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        }
    }
})

export const { setEmail } = userSlice.actions;
export default userSlice.reducer;

