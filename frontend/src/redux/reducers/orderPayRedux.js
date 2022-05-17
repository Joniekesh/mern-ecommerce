// import { createSlice } from "@reduxjs/toolkit";

// export const orderPaySlice = createSlice({
// 	name: "orderPay",
// 	initialState: {
// 		isLoading: false,
// 		error: null,
// 		success: false,
// 		orderPay: null,
// 	},
// 	reducers: {
// 		orderPayRequest: (state) => {
// 			state.isLoading = true;
// 		},
// 		orderPaySuccess: (state, action) => {
// 			state.isLoading = false;
// 			state.orderPay = action.payload;
// 			state.success = true;
// 		},
// 		orderPayFail: (state, action) => {
// 			state.isLoading = false;
// 			state.error = action.payload;
// 		},
// 		orderPayReset: (state) => {
// 			state.isLoading = false;
// 			state.orderPay = {};
// 		},
// 	},
// });

// export const { orderPayRequest, orderPaySuccess, orderPayFail } =
// 	orderPaySlice.actions;
// export default orderPaySlice.reducer;
