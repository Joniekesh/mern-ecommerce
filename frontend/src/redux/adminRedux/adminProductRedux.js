import { createSlice } from "@reduxjs/toolkit";

export const adminProductSlice = createSlice({
	name: "adminProduct",
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
			state.isLoading = false;
			state.products = action.payload;
		},
		getProductsFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		createProductRequest: (state) => {
			state.isLoading = true;
		},
		createProductSuccess: (state, action) => {
			state.isLoading = false;
			state.products.push(action.payload);
		},
		createProductFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		deleteProductRequest: (state) => {
			state.isLoading = true;
		},
		deleteProductSuccess: (state, action) => {
			state.isLoading = false;
			state.products.splice(
				state.products.findIndex((product) => product._id === action.payload),
				1
			);
		},
		deleteProductFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const {
	getProductsRequest,
	getProductsSuccess,
	getProductsFail,
	createProductRequest,
	createProductSuccess,
	createProductFail,
	deleteProductRequest,
	deleteProductSuccess,
	deleteProductFail,
} = adminProductSlice.actions;
export default adminProductSlice.reducer;
