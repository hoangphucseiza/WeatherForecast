
import { createSlice } from "@reduxjs/toolkit";


const apiSlice = createSlice({
    name: ' api',
    initialState:{
        data: [],
        city: 'ho chi minh',
        forecast: 4
    },
    reducers: {
        getData: (state, action) => {
            state.data = action.payload;
        },
        changeCity: (state, action) => {
            state.city = action.payload;
        },
        changeForecast: (state, action) => {
            state.forecast = action.payload;
        }
    }
})

export const {getData, changeCity, changeForecast} = apiSlice.actions;

export default apiSlice.reducer;