import axios from "axios";
import {
	getCategoriesRequest,
	getCategoriesSuccess,
	getCategoriesFail,
} from "../reducers/categoryRedux";

export const getCategories = () => async (dispatch) => {
	dispatch(getCategoriesRequest());

	try {
		const res = await axios.get("/categories");
		dispatch(getCategoriesSuccess(res.data));
	} catch (err) {
		dispatch(getCategoriesFail());
	}
};
