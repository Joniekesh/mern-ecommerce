import { createSlice } from "@reduxjs/toolkit";

const shippinAddressSlice = createSlice({
	name: "shipping",
	initialState: {
		shippingAddress: {},
	},
	reducers: {
		addShippingAddress: (state, action) => {
			state.shippingAddress = action.payload;
		},
		resetShippingAddress: (state) => {
			state.shippingAddress = null;
		},
	},
});

export const { addShippingAddress, resetShippingAddress } =
	shippinAddressSlice.actions;
export default shippinAddressSlice.reducer;
