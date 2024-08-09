import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
    userId: string;
    role: string;
    iat: number;
    exp: number;
};

type TAuthState = {
    user: null | TUser;
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

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
