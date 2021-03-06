import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: localStorage.getItem('isLoggedIn') === null ? false : (localStorage.getItem('isLoggedIn') === 'true'),
        userData: localStorage.getItem('userData') === null ? {
            userId: null,
            firstName: null,
            lastName: null,
            email: null,
            photo: null
        } : JSON.parse(localStorage.getItem('userData'))
    },
    reducers: {
        setUserData: (state, action) => {
            console.log(action);
            const { userId, firstName, lastName, email, photo } = action.payload;
            state.isLoggedIn = true;
            state.userData = { userId, firstName, lastName, email, photo };
            localStorage.setItem('isLoggedIn', state.isLoggedIn.toString());
            localStorage.setItem('userData', JSON.stringify(state.userData));
        },
        logOut: state => {
            state.isLoggedIn = false;
            state.userData = {
                userId: null,
                firstName: null,
                lastName: null,
                email: null,
                photo: null
            }
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userData');
        }
    }
});

export const { setUserData, logOut } = slice.actions;

export default slice.reducer;