import axios from "axios";
import { toast } from "react-toastify";
import {
	getCurrentUserRequest,
	getCurrentUserSuccess,
	getCurrentUserFail,
	userRegisterRequest,
	userRegisterSuccess,
	userRegisterFail,
	userloginRequest,
	userloginSuccess,
	userloginFail,
	userLogout,
} from "../reducers/userRedux";

export const getCurrentUser = () => async (dispatch, getState) => {
	dispatch(getCurrentUserRequest());

	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			Autorization: `Bearer ${currentUser.token}`,
		},
	};

	try {
		const res = await axios.get("/users/profile", config);

		dispatch(getCurrentUserSuccess(res.data));
	} catch (err) {
		dispatch(getCurrentUserFail());
	}
};

export const registerUser = (user) => async (dispatch) => {
	dispatch(userRegisterRequest());

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const res = await axios.post("/users", user, config);
		dispatch(userRegisterSuccess(res.data));
		dispatch(getCurrentUser());
	} catch (err) {
		dispatch(userRegisterFail());
	}
};

export const loginUser = (user) => async (dispatch) => {
	dispatch(userloginRequest());

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const res = await axios.post("/users/login", user, config);
		dispatch(userloginSuccess(res.data));
		dispatch(getCurrentUser());
		toast.success("User login Success", { theme: "colored" });
	} catch (err) {
		dispatch(userloginFail());
		toast.error(err.response.data, { theme: "colored" });
	}
};

export const logout = () => userLogout();
