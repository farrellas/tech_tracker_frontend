import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    company: JSON.parse(localStorage.getItem('company')) || {}
};

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompany: (state, action) => {
            state.company = action.payload;
            localStorage.setItem('company', JSON.stringify(action.payload));
        },
        removeCompany: (state) => {
            state.company = {};
            localStorage.removeItem('company');
        }
    }
})

const { reducer } = companySlice;

export const { setCompany, removeCompany } = companySlice.actions;

export default reducer;