import { addPaymentMethod } from "../reducers/paymentRedux";

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch(addPaymentMethod(data));
};
