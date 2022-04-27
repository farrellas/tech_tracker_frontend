import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    work_order: JSON.parse(localStorage.getItem('work_order')) || {}
};

export const workOrderSlice = createSlice({
    name: 'work_order',
    initialState,
    reducers: {
        setWorkOrder: (state, action) => {
            state.work_order = action.payload;
            localStorage.setItem('work_order', JSON.stringify(action.payload));
        },
        clearWorkOrder: (state) => {
            state.work_order = {};
            localStorage.removeItem('work_order');
        }
    }
})

const { reducer } = workOrderSlice;

export const { setWorkOrder, clearWorkOrder } = workOrderSlice.actions;

export default reducer;