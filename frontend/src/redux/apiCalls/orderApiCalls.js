import axios from "axios";
import {
	addOrderRequest,
	addOrderSuccess,
	addOrderFail,
	orderPayRequest,
	orderPaySuccess,
	orderPayFail,
	resetOrder,
} from "../reducers/orderRedux";
import { clearCart } from "../reducers/cartRedux";

export const createOrder = (data) => async (dispatch, getState) => {
	const { user } = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${user.token}`,
		},
	};

	dispatch(addOrderRequest());
	try {
		const res = await axios.post("/orders", data, config);
		dispatch(addOrderSuccess(res.data));
		dispatch(clearCart());
	} catch (err) {
		dispatch(addOrderFail());
	}
};

export const payOrder =
	(orderId, paymentResult) => async (dispatch, getState) => {
		const { user } = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`,
			},
		};

		dispatch(orderPayRequest());

		try {
			const res = await axios.put(
				`/orders/${orderId}/pay`,
				paymentResult,
				config
			);
			dispatch(orderPaySuccess(res.data));
			dispatch(resetOrder());
		} catch (err) {
			dispatch(orderPayFail());
		}
	};
