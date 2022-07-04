import { axiosInstance } from "../../utils/config";
import {
	getProductsRequest,
	getProductsSuccess,
	getProductsFail,
	getProductRequest,
	getProductSuccess,
	getProductFail,
	addReviewRequest,
	addReviewSuccess,
	addReviewFail,
} from "../reducers/productRedux";

export const getProducts = () => async (dispatch) => {
	dispatch(getProductsRequest());

	try {
		const res = await axiosInstance.get("/products");

		dispatch(getProductsSuccess(res.data));
	} catch (err) {
		dispatch(getProductsFail());
	}
};
export const getProductById = (id) => async (dispatch) => {
	dispatch(getProductRequest());

	try {
		const res = await axiosInstance.get(`/products/${id}`);

		dispatch(getProductSuccess(res.data));
	} catch (err) {
		dispatch(getProductFail());
	}
};

export const addReview = (id, data) => async (dispatch, getState) => {
	const { user } = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${user.token}`,
		},
	};

	dispatch(addReviewRequest());

	try {
		const res = await axiosInstance.post(
			`/products/${id}/reviews`,
			data,
			config
		);
		dispatch(addReviewSuccess(res.data));
	} catch (err) {
		dispatch(addReviewFail());
	}
};
