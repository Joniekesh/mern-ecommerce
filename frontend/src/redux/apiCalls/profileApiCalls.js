import axios from "axios";
import {
	userProfileRequest,
	userProfileSuccess,
	userProfileFail,
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
