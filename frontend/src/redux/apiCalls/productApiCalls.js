import axios from "axios";
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
		const res = await axios.get("/products");

		dispatch(getProductsSuccess(res.data));
	} catch (err) {
		dispatch(getProductsFail());
	}
};
export const getProductById = (id) => async (dispatch) => {
	dispatch(getProductRequest());

	try {
		const res = await axios.get(`/products/${id}`);

		dispatch(getProductSuccess(res.data));
	} catch (err) {
		dispatch(getProductFail());
	}
};

export const addReview = (id, data) => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${currentUser.token}`,
		},
	};

	dispatch(addReviewRequest());

	try {
		const res = await axios.post(`/products/${id}/reviews`, data, config);
		dispatch(addReviewSuccess(res.data));
	} catch (err) {
		dispatch(addReviewFail());
	}
};
