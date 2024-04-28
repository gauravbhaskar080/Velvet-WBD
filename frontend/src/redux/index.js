import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/login/loginSlice";

export const store = configureStore({
    reducer: authReducer,
})