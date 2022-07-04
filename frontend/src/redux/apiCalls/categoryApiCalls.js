import { axiosInstance } from "../../utils/config";
import {
	getCategoriesRequest,
	getCategoriesSuccess,
	getCategoriesFail,
} from "../reducers/categoryRedux";

export const getCategories = () => async (dispatch) => {
	dispatch(getCategoriesRequest());

	try {
		const res = await axiosInstance.get("/categories");
		dispatch(getCategoriesSuccess(res.data));
	} catch (err) {
		dispatch(getCategoriesFail());
	}
};
