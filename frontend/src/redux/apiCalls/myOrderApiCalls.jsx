import axios from "axios";
import {
	myOrdersRequest,
	myOrdersSuccess,
	myOrdersFail,
	getOrderDetailsRequest,
	getOrderDetailsSuccess,
	getOrderDetailsFail,
} from "../reducers/myOrderRedux";

export const getMyOrders = () => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser.token}`,
		},
	};

	dispatch(myOrdersRequest());

	try {
		const res = await axios.get("/orders/my", config);
		dispatch(myOrdersSuccess(res.data));
	} catch (err) {
		dispatch(myOrdersFail());
	}
};

export const getOrderById = (id) => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser.token}`,
		},
	};

	dispatch(getOrderDetailsRequest());

	try {
		const res = await axios.get(`/orders/${id}`, config);
		dispatch(getOrderDetailsSuccess(res.data));
	} catch (err) {
		dispatch(getOrderDetailsFail());
	}
};
