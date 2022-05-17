import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
	name: "profile",
	initialState: {
		currentProfile: null,
		isLoading: false,
		error: false,
		success: false,
	},
	reducers: {
		userProfileRequest: (state) => {
			state.isLoading = true;
		},
		userProfileSuccess: (state, action) => {
			state.isLoading = false;
			state.currentProfile = action.payload;
		},
		userProfileFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		userprofileReset: (state) => {
			state.currentProfile = null;
		},
	},
});

export const {
	userProfileRequest,
	userProfileSuccess,
	userProfileFail,
	userprofileReset,
} = profileSlice.actions;
export default profileSlice.reducer;
