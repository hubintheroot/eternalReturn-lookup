import { createSlice } from "@reduxjs/toolkit";


export const characterDataSlice = createSlice({
    name: 'characterData',
    initialState:{
        data: null
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const { setData } = characterDataSlice.actions

export default characterDataSlice.reducer