import axios from "axios";
import {
	userProfileRequest,
	userProfileSuccess,
	userProfileFail,
	userProfileUpdateRequest,
	userProfileUpdateSuccess,
	userProfileUpdateFail,
} from "../reducers/profileRedux";

export const getUserProfile = () => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser.token}`,
		},
	};

	dispatch(userProfileRequest());

	try {
		const res = await axios.get("/users/profile", config);
		dispatch(userProfileSuccess(res.data));
	} catch (err) {
		dispatch(userProfileFail());
	}
};

// Update my profile
export const updateMyProfile = (data) => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${currentUser.token}`,
		},
	};

	dispatch(userProfileUpdateRequest());

	try {
		const res = await axios.put("/users/profile", data, config);
		dispatch(userProfileUpdateSuccess(res.data));
	} catch (err) {
		dispatch(userProfileUpdateFail());
	}
};
