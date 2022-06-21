import { createSlice } from "@reduxjs/toolkit";

export const adminUserStatsSlice = createSlice({
	name: "adminUserStats",
	initialState: {
		userStats: [],
		isLoading: false,
		error: false,
	},
	reducers: {
		userStatsRequest: (state) => {
			state.isLoading = true;
		},
		userStatsSuccess: (state, action) => {
			state.isLoading = false;
			state.userStats = action.payload;
		},
		userStatsFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const { userStatsRequest, userStatsSuccess, userStatsFail } =
	adminUserStatsSlice.actions;
export default adminUserStatsSlice.reducer;
