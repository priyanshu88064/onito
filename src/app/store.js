import { configureStore } from "@reduxjs/toolkit";
import personalReducer from "../slices/FormSlice";

export const store = configureStore({
    reducer:personalReducer
})