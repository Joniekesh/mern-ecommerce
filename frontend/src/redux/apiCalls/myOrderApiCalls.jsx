import { axiosInstance } from "../../utils/config";
import {
	myOrdersRequest,
	myOrdersSuccess,
	myOrdersFail,
	getOrderDetailsRequest,
	getOrderDetailsSuccess,
	getOrderDetailsFail,
} from "../reducers/myOrderRedux";

export const getMyOrders = () => async (dispatch, getState) => {
	const { user } = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${user.token}`,
		},
	};

	dispatch(myOrdersRequest());

	try {
		const res = await axiosInstance.get("/orders/my", config);
		dispatch(myOrdersSuccess(res.data));
	} catch (err) {
		dispatch(myOrdersFail());
	}
};

export const getOrderById = (id) => async (dispatch, getState) => {
	const { user } = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${user.token}`,
		},
	};

	dispatch(getOrderDetailsRequest());

	try {
		const res = await axiosInstance.get(`/orders/${id}`, config);
		dispatch(getOrderDetailsSuccess(res.data));
	} catch (err) {
		dispatch(getOrderDetailsFail());
	}
};
