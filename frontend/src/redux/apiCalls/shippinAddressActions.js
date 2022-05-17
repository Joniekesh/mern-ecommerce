import { addShippingAddress } from "../reducers/shippingAddressRedux";

export const saveShippingAddress = (data) => (dispatch) => {
	dispatch(addShippingAddress(data));
};
