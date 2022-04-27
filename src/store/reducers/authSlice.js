import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem('technician_user')) || {},
    user_authenticated: JSON.parse(localStorage.getItem('user_authenticated')) || false
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.user_authenticated = true;
            localStorage.setItem('technician_user', JSON.stringify(action.payload));
            localStorage.setItem('user_authenticated', JSON.stringify(state.user_authenticated));
        },
        logout: (state) => {
            state.user = {};
            state.user_authenticated = false;
            localStorage.removeItem('technician_user');
            localStorage.setItem('user_authenticated', state.user_authenticated);
        }
    }
})


const { reducer } = authSlice;

export const { login, logout } = authSlice.actions;

export default reducer;