import axios from "axios";
import {
	adminGeOrdersRequest,
	adminGetOrdersSuccess,
	adminGetOrdersFail,
} from "./adminOrderRedux";

// Get all orders(Admin only)
export const adminGetAllOrders = () => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser.token}`,
		},
	};

	dispatch(adminGeOrdersRequest());

	try {
		const res = await axios.get("/orders", config);
		dispatch(adminGetOrdersSuccess(res.data));
	} catch (err) {
		dispatch(adminGetOrdersFail());
	}
};
