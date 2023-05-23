import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type UserData = {
    userId: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    photo: string | null;
};

export type AuthState = {
    isLoggedIn: boolean;
    userData: UserData;
};

const initialUserData = {
    userId: null,
    firstName: null,
    lastName: null,
    email: null,
    photo: null,
};

const initialState: AuthState = {
    isLoggedIn: false,
    userData: initialUserData
};

export const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserData>) => {
            const { userId, firstName, lastName, email, photo } = action.payload;
            state.isLoggedIn = true;
            state.userData = { userId, firstName, lastName, email, photo };
        },
        logOut: (state) => {
            state.isLoggedIn = false;
            state.userData = initialUserData;
        },
    },
});

export const { setUserData, logOut } = slice.actions;

export default slice.reducer;
