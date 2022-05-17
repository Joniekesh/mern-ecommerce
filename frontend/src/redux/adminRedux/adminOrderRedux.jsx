import { createSlice } from "@reduxjs/toolkit";

export const adminOrderSlice = createSlice({
	name: "adminOrder",
	initialState: {
		orders: [],
		order: null,
		isLoading: false,
		success: false,
	},
	reducers: {
		adminGeOrdersRequest: (state) => {
			state.isLoading = true;
		},
		adminGetOrdersSuccess: (state, action) => {
			state.isLoading = false;
			state.orders = action.payload;
		},
		adminGetOrdersFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const {
	adminGeOrdersRequest,
	adminGetOrdersSuccess,
	adminGetOrdersFail,
} = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
