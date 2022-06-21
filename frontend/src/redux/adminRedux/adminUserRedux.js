import { createSlice } from "@reduxjs/toolkit";

export const adminUserSlice = createSlice({
	name: "adminUser",
	initialState: {
		isLoading: false,
		users: [],
		user: null,
		error: false,
		success: false,
	},
	reducers: {
		adminGetUsersRequest: (state) => {
			state.isLoading = true;
		},
		adminGetUsersSuccess: (state, action) => {
			state.isLoading = false;
			state.users = action.payload;
		},
		adminGetUsersFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		adminGetSingleUserRequest: (state) => {
			state.isLoading = true;
		},
		adminGetSingleUserSuccess: (state, action) => {
			state.isLoading = false;
			state.user = action.payload;
		},
		adminGetSingleUserFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		adminGetSingleUserReset: (state) => {
			state.user = null;
		},
		adminUpdateUserRequest: (state) => {
			state.isLoading = true;
		},
		adminUpdateUserSuccess: (state, action) => {
			state.isLoading = false;
			state.user = action.payload;
		},
		adminUpdateUserFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		adminUpdateUserReset: (state) => {
			state.user = null;
		},
		adminCreateUserRequest: (state) => {
			state.isLoading = true;
		},
		adminCreateUserSuccess: (state, action) => {
			state.isLoading = false;
			state.users.push(action.payload);
		},
		adminCreateUserFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		adminDeleteUserRequest: (state) => {
			state.isLoading = true;
		},
		adminDeleteUserSuccess: (state, action) => {
			state.isLoading = false;
			state.users.splice(
				state.users.findIndex((user) => user._id === action.payload),
				1
			);
		},
		adminDeleteUserFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const {
	adminGetUsersRequest,
	adminGetUsersSuccess,
	adminGetUsersFail,
	adminGetSingleUserRequest,
	adminGetSingleUserSuccess,
	adminGetSingleUserFail,
	adminGetSingleUserReset,
	adminUpdateUserRequest,
	adminUpdateUserSuccess,
	adminUpdateUserFail,
	adminUpdateUserReset,
	adminUserReset,
	adminCreateUserRequest,
	adminCreateUserSuccess,
	adminCreateUserFail,
	adminDeleteUserRequest,
	adminDeleteUserSuccess,
	adminDeleteUserFail,
} = adminUserSlice.actions;
export default adminUserSlice.reducer;
