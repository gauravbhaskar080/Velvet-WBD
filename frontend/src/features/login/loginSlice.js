import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isCustomerLoggedIn: false,
    isSellerLoggedIn: false,
    isAdminLoggedIn: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginCustomer: (state) => {
            state.isCustomerLoggedIn = true;
            state.isAdminLoggedIn = false;
            state.isSellerLoggedIn = false;
        },
        loginSeller: (state) => {
            state.isSellerLoggedIn = true;
            state.isAdminLoggedIn = false;
            state.isCustomerLoggedIn = false;
        },
        loginAdmin: (state) => {
            state.isAdminLoggedIn = true;
            state.isCustomerLoggedIn = false;
            state.isSellerLoggedIn = false;
        },
        logout: (state) => {
            state.isAdminLoggedIn = false;
            state.isCustomerLoggedIn = false;
            state.isSellerLoggedIn = false;
        }
    }
})

export const { loginCustomer, loginSeller, loginAdmin, logout } = authSlice.actions;

export default authSlice.reducer;