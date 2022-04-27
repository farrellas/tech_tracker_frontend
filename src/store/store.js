import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import companyReducer from './reducers/companySlice';
import customerReducer from './reducers/customerSlice';
import systemReducer from './reducers/systemSlice';
import equipmentSlice from './reducers/equipmentSlice';
import workOrderSlice from './reducers/workOrderSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        company: companyReducer,
        customer: customerReducer,
        system: systemReducer,
        equipment: equipmentSlice,
        workOrder: workOrderSlice
    }
})

export default store;