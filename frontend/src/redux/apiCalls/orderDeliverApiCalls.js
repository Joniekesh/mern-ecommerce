import { axiosInstance } from "../../utils/config";

import {
	orderDeliverRequest,
	orderDeliverSuccess,
	orderDeliverFail,
} from "../reducers/orderDeliverRedux";

export const deliverOrder = (id, order) => async (dispatch, getState) => {
	const { user } = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${user.token}`,
		},
	};

	dispatch(orderDeliverRequest());

	try {
		const res = await axiosInstance.put(`/orders/${id}/deliver`, order, config);
		dispatch(orderDeliverSuccess(res.data));
	} catch (err) {
		dispatch(orderDeliverFail());
	}
};
