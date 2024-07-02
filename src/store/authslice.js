import { createSlice } from "@reduxjs/toolkit";

const authinit = {
    status:false,
    userid:null
}

const Authslice = createSlice({
    name:"auther",
    initialState:authinit,
    reducers:{
        storelogin(state, action){
            state.status = true,
            state.userid = action.payload
        },
        storelogout(state){
            state.status = false
            state.userid = null
        }
    }
})

export const {storelogin,storelogout} = Authslice.actions
export default Authslice.reducer