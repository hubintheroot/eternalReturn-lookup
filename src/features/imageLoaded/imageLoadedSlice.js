import { createSlice } from "@reduxjs/toolkit";


export const imageLoadedSlice = createSlice({
    name: 'imageLoaded',
    initialState:{
        charListLoaded: true,
    },
    reducers: {
        setCharListLoaded: (state, action) => {
            state.charListLoaded = action.payload;
        },
    }
})

export const { setCharListLoaded } = imageLoadedSlice.actions

export default imageLoadedSlice.reducer