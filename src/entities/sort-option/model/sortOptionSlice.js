import { createSlice } from "@reduxjs/toolkit";


export const sortOptionSlice = createSlice({
    name: 'sortOption',
    initialState:{
        isRotation: false,
        state: 'release'
    },
    reducers: {
        setIsRotation: (state, action) => {
            state.isRotation = action.payload;
        },
        setState: (state, action) => {
            state.state = action.payload;
        }
    }
})

export const { setIsRotation, setState } = sortOptionSlice.actions

export default sortOptionSlice.reducer