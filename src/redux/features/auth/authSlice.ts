import { createSlice } from "@reduxjs/toolkit";

type TAuthState = {
    user: null | object;
    token: null | string;
};

const initialState: TAuthState = {
    user: null,
    token: null,
};
const authSlice = createSlice({
    name: "AuthSlice",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;
            state.token = token;
            state.user = user;
        },
        logOut: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
