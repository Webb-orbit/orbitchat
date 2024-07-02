import { createSlice } from "@reduxjs/toolkit";

const menuinit = {
    opned:false
}

const Menuslice = createSlice({
    name:"menuopener",
    initialState:menuinit,
    reducers:{
        menutoggle(state){
            state.opned = !state.opned
        }
    }
})

export const {menutoggle} = Menuslice.actions
export default Menuslice.reducer