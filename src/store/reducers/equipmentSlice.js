import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    equipment: JSON.parse(localStorage.getItem('current_equipment')) || {}
};

export const equipmentSlice = createSlice({
    name: 'equipment',
    initialState,
    reducers: {
        setEquipment: (state, action) => {
            state.equipment = action.payload;
            localStorage.setItem('current_equipment', JSON.stringify(action.payload));
        },
        clearEquipment: (state) => {
            state.equipment = {};
            localStorage.removeItem('current_equipment');
        }
    }
})

const { reducer } = equipmentSlice;

export const { setEquipment, clearEquipment } = equipmentSlice.actions;

export default reducer;