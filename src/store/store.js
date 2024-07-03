import { configureStore } from "@reduxjs/toolkit";
import authslice from "./authslice";
import passslice from "./passslice";
import toastslice from "./toastslice";

const store = configureStore({
    reducer:{
        authslice,
        passslice,
        toastslice
    },
})

export default store