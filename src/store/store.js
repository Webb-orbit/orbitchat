import { configureStore } from "@reduxjs/toolkit";
import authslice from "./authslice";
import passslice from "./passslice";
import toastslice from "./toastslice";
import prepageslice from "./prepageslice";

const store = configureStore({
    reducer:{
        authslice,
        passslice,
        toastslice,
        prepageslice
    },
})

export default store