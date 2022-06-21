import axios from "axios";
import {
	adminGeOrdersRequest,
	adminGetOrdersSuccess,
	adminGetOrdersFail,
} from "./adminOrderRedux";
import {
	adminGetUsersRequest,
	adminGetUsersSuccess,
	adminGetUsersFail,
	adminGetSingleUserRequest,
	adminGetSingleUserSuccess,
	adminGetSingleUserFail,
	adminUpdateUserRequest,
	adminUpdateUserSuccess,
	adminUpdateUserFail,
	adminCreateUserRequest,
	adminCreateUserSuccess,
	adminCreateUserFail,
	adminDeleteUserRequest,
	adminDeleteUserSuccess,
	adminDeleteUserFail,
} from "./adminUserRedux";
import {
	getProductsRequest,
	getProductsSuccess,
	getProductsFail,
	createProductRequest,
	createProductSuccess,
	createProductFail,
	updateProductRequest,
	updateProductSuccess,
	updateProductFail,
	deleteProductRequest,
	deleteProductSuccess,
	deleteProductFail,
} from "./adminProductRedux";
import { userStatsFail, userStatsRequest, userStatsSuccess } from "./adminUserStatsRedux";

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

// Get all users (Admin only)
export const adminGetAllUsers = () => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser.token}`,
		},
	};

	dispatch(adminGetUsersRequest());

	try {
		const res = await axios.get("/users", config);
		dispatch(adminGetUsersSuccess(res.data));
	} catch (error) {
		dispatch(adminGetUsersFail());
	}
};
// Get user by ID (Admin only)
export const adminGetUserById = (id) => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser.token}`,
		},
	};

	dispatch(adminGetSingleUserRequest());

	try {
		const res = await axios.get(`/users/${id}`, config);
		dispatch(adminGetSingleUserSuccess(res.data));
	} catch (error) {
		dispatch(adminGetSingleUserFail());
	}
};

// Update user(Admin only)
export const adminUpdateUser = (id, data) => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser.token}`,
		},
	};

	dispatch(adminUpdateUserRequest());

	try {
		const res = await axios.put(`/users/${id}`, data, config);
		dispatch(adminUpdateUserSuccess(res.data));
	} catch (err) {
		dispatch(adminUpdateUserFail());
	}
};

// Create user(Admin only)
export const adminCreateUser = (data) => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser.token}`,
		},
	};

	dispatch(adminCreateUserRequest());

	try {
		const res = await axios.post("/users/admin/create", data, config);
		dispatch(adminCreateUserSuccess(res.data));
	} catch (err) {
		dispatch(adminCreateUserFail());
	}
};

// Delete user(admin only)
export const adminDeleteUser = (id) => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser.token}`,
		},
	};

	dispatch(adminDeleteUserRequest());

	try {
		if (window.confirm("Are You SURE?")) {
			await axios.delete(`/users/${id}`, config);
			dispatch(adminDeleteUserSuccess(id));
		}
	} catch (err) {
		dispatch(adminDeleteUserFail());
	}
};

export const adminGetProducts = () => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser.token}`,
		},
	};

	dispatch(getProductsRequest());

	try {
		const res = await axios.get("/products", config);
		dispatch(getProductsSuccess(res.data));
	} catch (err) {
		dispatch(getProductsFail());
	}
};

// Create product (Admin only)
export const adminCreateProduct = (data) => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${currentUser.token}`,
		},
	};

	dispatch(createProductRequest());

	try {
		const res = await axios.post("/products", data, config);
		dispatch(createProductSuccess(res.data));
	} catch (err) {
		dispatch(createProductFail());
	}
};

// Update product(Admin only)
export const updateProduct = (id, product) => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${currentUser.token}`,
		},
	};

	dispatch(updateProductRequest());
	try {
		const res = await axios.put(`/products/${id}`, product, config);
		dispatch(updateProductSuccess({ id, product: res.data }));
	} catch (err) {
		dispatch(updateProductFail());
	}
};

// Delete product(Admin only)
export const deleteProduct = (id) => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser.token}`,
		},
	};

	dispatch(deleteProductRequest());

	try {
		if (window.confirm("Are You Sure?")) {
			await axios.delete(`/products/${id}`, config);

			dispatch(deleteProductSuccess());
		}
	} catch (err) {
		dispatch(deleteProductFail());
	}
};

// Get user stats(Admin only)
export const adminGetUserStats = () => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser.token}`,
		},
	};

dispatch(userStatsRequest())

	try {
		const res = await axios.get("/users/stats", config);
		dispatch(userStatsSuccess(res.data))
	} catch (err) {
		dispatch(userStatsFail)
	}
};
