import { createSlice } from "@reduxjs/toolkit";

const Preslice = createSlice({
    name:"previus",
    initialState:{
        prepage:"/"
    },
    reducers:{
        updateurl(state, action){
            state.prepage = action.payload
        }
    }
})

export const {updateurl} = Preslice.actions

export default Preslice.reducer