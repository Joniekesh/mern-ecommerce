import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
	name: "order",
	initialState: {
		orders: [],
		isLoading: false,
		error: false,
		success: false,
	},
	reducers: {
		addOrderRequest: (state) => {
			state.isLoading = true;
		},
		addOrderSuccess: (state, action) => {
			state.isLoading = false;
		},
		addOrderFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},

		orderPayRequest: (state) => {
			state.isLoading = true;
		},
		orderPaySuccess: (state) => {
			state.isLoading = false;
			state.success = true;
		},
		orderPayFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},

		resetOrder: (state) => {
			state.orders = [];
			state.success = false;
		},
	},
});

export const {
	addOrderRequest,
	addOrderSuccess,
	addOrderFail,
	resetOrder,
	orderPayRequest,
	orderPaySuccess,
	orderPayFail,
} = orderSlice.actions;
export default orderSlice.reducer;
