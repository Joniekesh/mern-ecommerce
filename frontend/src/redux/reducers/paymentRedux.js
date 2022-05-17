import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
	name: "payment",
	initialState: {
		paymentMethod: {},
	},
	reducers: {
		addPaymentMethod: (state, action) => {
			state.paymentMethod = action.payload;
		},
	},
});

export const { addPaymentMethod } = paymentSlice.actions;
export default paymentSlice.reducer;
