import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		currentUser: null,
		isLoading: false,
		error: false,
	},
	reducers: {
		getCurrentUserRequest: (state) => {
			state.isLoading = true;
		},
		getCurrentUserSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.isLoading = false;
		},
		getCurrentUserFail: (state) => {
			state.isLoading = false;
			state.error = true;
		},
		userRegisterRequest: (state) => {
			state.isLoading = true;
		},
		userRegisterSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.isLoading = false;
		},
		userRegisterFail: (state) => {
			state.isLoading = false;
			state.error = true;
		},
		userloginRequest: (state) => {
			state.isLoading = true;
		},
		userloginSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.isLoading = false;
		},
		userloginFail: (state) => {
			state.isLoading = false;
			state.error = true;
		},
		resetUser: (state) => {
			state.currentUser = null;
		},
		userLogout: (state) => {
			state.currentUser = null;
		},
	},
});

export const {
	getCurrentUserRequest,
	getCurrentUserSuccess,
	getCurrentUserFail,
	userRegisterRequest,
	userRegisterSuccess,
	userRegisterFail,
	userloginRequest,
	userloginSuccess,
	userloginFail,
	resetUser,
	userLogout,
} = userSlice.actions;
export default userSlice.reducer;
