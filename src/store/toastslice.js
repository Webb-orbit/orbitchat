import { createSlice } from "@reduxjs/toolkit";

const toastinit = {
    opned:false,
    mass:null,
    time:null,
    icon:null,
    color:"text-black"
}

const Toastslice = createSlice({
    name:"toastpener",
    initialState:toastinit,
    reducers:{
        showt(state, action){
            state.opned = true
            state.color = action.payload.color
            state.time = action.payload.time
            state.mass = action.payload.mass
            state.icon = action.payload.icon
        },
        hidet(state){
            state.opned = false
        }
    }
})

export const {showt, hidet} = Toastslice.actions
export default Toastslice.reducer