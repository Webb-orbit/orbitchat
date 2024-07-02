import { createSlice } from "@reduxjs/toolkit";

const passinit = {
    passmached:false,
}

const Passslice = createSlice({
    name:"password",
    initialState:passinit,
    reducers:{
        passwordok(state){
            state.passmached = true
        },
        passwordnotok(state){
            state.passmached = false
        }
    }
})

export const {passwordok,passwordnotok} = Passslice.actions
export default Passslice.reducer