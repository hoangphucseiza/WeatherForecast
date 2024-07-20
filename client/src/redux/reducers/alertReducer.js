
// React Toolkit
import { createSlice } from "@reduxjs/toolkit";


const alertSlice = createSlice({
    name: 'alert',
    initialState:{
        alert: false,
        message: '',
    },
    reducers: {
        onAlert: (state, action) => {
            state.alert = true;
            state.message = action.payload;
        },
        offAlert: (state) => {
            state.alert = false;
            state.message = '';
        }
    }
})

// export default alertReducer;

export const {onAlert, offAlert} = alertSlice.actions;

export default alertSlice.reducer;