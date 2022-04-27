import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    current_system: JSON.parse(localStorage.getItem('current_system')) || {}
};

export const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        setSystem: (state, action) => {
            state.current_system = action.payload;
            localStorage.setItem('current_system', JSON.stringify(action.payload));
        },
        clearSystem: (state) => {
            state.current_system = {};
            localStorage.removeItem('current_system');
        }
    }
})


const { reducer } = systemSlice;

export const { setSystem, clearSystem } = systemSlice.actions;

export default reducer;