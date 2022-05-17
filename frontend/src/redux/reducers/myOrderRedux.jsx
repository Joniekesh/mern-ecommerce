import { createSlice } from "@reduxjs/toolkit";

export const myOrderSlice = createSlice({
	name: "myOrder",
	initialState: {
		isLoading: false,
		orders: [],
		order: null,
		error: false,
	},
	reducers: {
		myOrdersRequest: (state) => {
			state.isLoading = true;
		},
		myOrdersSuccess: (state, action) => {
			state.isLoading = false;
			state.orders = action.payload;
		},
		myOrdersFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		getOrderDetailsRequest: (state) => {
			state.isLoading = true;
		},
		getOrderDetailsSuccess: (state, action) => {
			state.isLoading = false;
			state.order = action.payload;
		},
		getOrderDetailsFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		myOrderReset: (state) => {
			state.orders = [];
		},
	},
});

export const {
	myOrdersRequest,
	myOrdersSuccess,
	myOrdersFail,
	getOrderDetailsRequest,
	getOrderDetailsSuccess,
	getOrderDetailsFail,
	myOrderReset,
} = myOrderSlice.actions;
export default myOrderSlice.reducer;
