import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    customer: JSON.parse(localStorage.getItem('current_customer')) || {}
};

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setCustomer: (state, action) => {
            state.customer = action.payload;
            localStorage.setItem('current_customer', JSON.stringify(action.payload));
        },
        clearCustomer: (state) => {
            state.customer = {};
            localStorage.removeItem('current_customer');
        }
    }
})


const { reducer } = customerSlice;

export const { setCustomer, clearCustomer } = customerSlice.actions;

export default reducer;