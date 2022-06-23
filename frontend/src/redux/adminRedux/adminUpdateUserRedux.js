import { createSlice } from "@reduxjs/toolkit";

export const adminUpdateUserSlice = createSlice({
	name: "adminUser",
	initialState: {
		user: null,
		isLoading: false,
		error: false,
		success: false,
	},
	reducers: {
		adminUpdateUserRequest: (state) => {
			state.isLoading = true;
		},
		adminUpdateUserSuccess: (state, action) => {
			state.isLoading = false;
			state.user = action.payload;
			state.success = true;
		},
		adminUpdateUserFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		adminUpdateUserReset: (state) => {
			state.user = {};
		},
	},
});

export const {
	adminUpdateUserRequest,
	adminUpdateUserSuccess,
	adminUpdateUserFail,
	adminUpdateUserReset,
} = adminUpdateUserSlice.actions;
export default adminUpdateUserSlice.reducer;
