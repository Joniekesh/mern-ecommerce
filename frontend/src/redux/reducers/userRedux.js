import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		currentUser: null,
		isLoading: false,
		error: false,
		token: JSON.parse(localStorage.getItem("token")),
	},
	reducers: {
		getCurrentUserRequest: (state) => {
			state.isLoading = true;
		},
		getCurrentUserSuccess: (state, action) => {
			state.isLoading = false;
			state.currentUser = action.payload;
		},
		getCurrentUserFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		userRegisterRequest: (state) => {
			state.isLoading = true;
		},
		userRegisterSuccess: (state, action) => {
			state.isLoading = false;
			state.currentUser = action.payload;
			state.token = action.payload.token;
		},
		userRegisterFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
			state.token = null;
		},
		userloginRequest: (state) => {
			state.isLoading = true;
		},
		userloginSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.isLoading = false;
			state.token = action.payload.token;
		},
		userloginFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
			state.token = null;
		},
		resetUser: (state) => {
			state.currentUser = null;
		},
		userLogout: (state) => {
			state.currentUser = null;
			state.token = null;
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
