import { createSlice } from "@reduxjs/toolkit";

export const adminUpdateProductSlice = createSlice({
	name: "adminProduct",
	initialState: {
		product: null,
		isLoading: false,
		success: false,
		error: null,
	},
	reducers: {
		updateProductRequest: (state) => {
			state.isLoading = true;
		},
		updateProductSuccess: (state, action) => {
			state.isLoading = false;
			state.product = action.payload;
			state.success = true;
		},
		updateProductFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		updateProductReset: (state) => {
			state.product = {};
		},
	},
});

export const {
	updateProductRequest,
	updateProductSuccess,
	updateProductFail,
	updateProductReset,
} = adminUpdateProductSlice.actions;
export default adminUpdateProductSlice.reducer;
