import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin: null,
    adminLoggedIn: false,
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload;
            state.adminLoggedIn = true;
        },
        clearAdmin: (state) => {
            state.admin = null;
            state.adminLoggedIn = false;
        },
    },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;

export default adminSlice.reducer;
