import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
	name: "product",
	initialState: {
		products: [],
		product: null,
		isLoading: false,
		error: null,
	},
	reducers: {
		getProductsRequest: (state) => {
			state.isLoading = true;
		},
		getProductsSuccess: (state, action) => {
			state.products = action.payload;
			state.isLoading = false;
		},
		getProductsFail: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		getProductRequest: (state) => {
			state.isLoading = true;
		},
		getProductSuccess: (state, action) => {
			state.product = action.payload;
			state.isLoading = false;
		},
		getProductFail: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		addReviewRequest: (state) => {
			state.isLoading = true;
		},
		addReviewSuccess: (state, action) => {
			state.product = action.payload;
			state.isLoading = false;
		},
		addReviewFail: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const {
	getProductsRequest,
	getProductsSuccess,
	getProductsFail,
	getProductRequest,
	getProductSuccess,
	getProductFail,
	addReviewRequest,
	addReviewSuccess,
	addReviewFail,
} = productSlice.actions;
export default productSlice.reducer;
