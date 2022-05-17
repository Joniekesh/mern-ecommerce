import axios from "axios";

import {
	orderDeliverRequest,
	orderDeliverSuccess,
	orderDeliverFail,
} from "../reducers/orderDeliverRedux";

export const deliverOrder = (order) => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${currentUser.token}`,
		},
	};

	dispatch(orderDeliverRequest());

	try {
		const res = await axios.put(`/orders/${order}`, config);
		dispatch(orderDeliverSuccess(res.data));
	} catch (err) {
		dispatch(orderDeliverFail());
	}
};