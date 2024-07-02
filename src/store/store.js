import { configureStore } from "@reduxjs/toolkit";
import authslice from "./authslice";
import menuslice from "./menuslice";
import passslice from "./passslice";

const store = configureStore({
    reducer:{
        authslice,
        menuslice,
        passslice
    },
})

export default store