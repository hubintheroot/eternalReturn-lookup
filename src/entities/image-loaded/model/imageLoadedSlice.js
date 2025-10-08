import { createSlice } from "@reduxjs/toolkit";


export const imageLoadedSlice = createSlice({
    name: 'imageLoaded',
    initialState:{
        charListLoaded: true,
        detailLoaded: true,
    },
    reducers: {
        setCharListLoaded: (state, action) => {
            state.charListLoaded = action.payload;
        },
        setCharDetailLoaded: (state, action) => {
            state.detailLoaded = action.payload;
        }
    }
})

export const { setCharListLoaded, setCharDetailLoaded } = imageLoadedSlice.actions

export default imageLoadedSlice.reducer