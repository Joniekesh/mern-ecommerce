import { createSlice } from "@reduxjs/toolkit";

const updateMyProfileSlice = createSlice({
	name: "updateMyProfile",
	initialState: {
		currentUser: null,
		isLoading: false,
		success: false,
		error: false,
	},
	reducers: {
		userProfileUpdateRequest: (state) => {
			state.isLoading = true;
		},
		userProfileUpdateSuccess: (state, action) => {
			state.isLoading = false;
			state.currentUser = action.payload;
			state.success = true;
		},
		userProfileUpdateFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		userProfileUpdateReset: (state) => {
			state.currentUser = {};
		},
	},
});

export const {
	userProfileUpdateRequest,
	userProfileUpdateSuccess,
	userProfileUpdateFail,
	userProfileUpdateReset,
} = updateMyProfileSlice.actions;
export default updateMyProfileSlice.reducer;
