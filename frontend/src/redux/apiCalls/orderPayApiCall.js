import { axiosInstance } from "../../utils/config";
import {
	orderPayRequest,
	orderPaySuccess,
	orderPayFail,
} from "../reducers/orderPayRedux";

export const payOrder =
	(orderId, paymentResult) => async (dispatch, getState) => {
		const { user: currentUser } = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${currentUser.token}`,
			},
		};

		dispatch(orderPayRequest());

		try {
			const res = await axiosInstance.put(
				`/orders/${orderId}/pay`,
				paymentResult,
				config
			);
			dispatch(orderPaySuccess(res.data));
		} catch (err) {
			dispatch(orderPayFail());
		}
	};
