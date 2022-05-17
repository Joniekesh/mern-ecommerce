import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
	name: "category",
	initialState: {
		category: null,
		isLoading: false,
		error: false,
	},
	reducers: {
		getCategoriesRequest: (state) => {
			state.isLoading = true;
		},
		getCategoriesSuccess: (state, action) => {
			state.category = action.payload;
			state.isLoading = false;
		},
		getCategoriesFail: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const { getCategoriesRequest, getCategoriesSuccess, getCategoriesFail } =
	categorySlice.actions;
export default categorySlice.reducer;
