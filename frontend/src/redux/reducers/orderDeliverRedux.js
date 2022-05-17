import { createSlice } from "@reduxjs/toolkit";

export const orderDeliverSlice = createSlice({
	name: "orderDeliver",
	initialState: {
		orderDeliver: {},
		isLoading: false,
		error: false,
		success: false,
	},
	reducers: {
		orderDeliverRequest: (state) => {
			state.isLoading = true;
		},
		orderDeliverSuccess: (state, action) => {
			state.isLoading = false;
			state.orderDeliver = action.payload;
			state.success = true;
		},
		orderDeliverFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const { orderDeliverRequest, orderDeliverSuccess, orderDeliverFail } =
	orderDeliverSlice.actions;
export default orderDeliverSlice.reducer;
