import { axiosInstance } from "../../utils/config";
import {
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesFail,
  addCategoryRequest,
  addCategorySuccess,
  addCategoryFail,
  removeCategory,
} from "../reducers/categoryRedux";
import { toast } from "react-toastify";

export const createCategory = (data) => async (dispatch, getState) => {
  const { user } = getState();

  const token = user?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  dispatch(addCategoryRequest());

  try {
    const res = await axiosInstance.post("/categories", data, config);
    if (res.status === 201) {
      toast.success("Category created!", { theme: "colored" });
    }
    dispatch(addCategorySuccess(res.data));
  } catch (err) {
    dispatch(addCategoryFail());
    toast.error(err.response.data);
  }
};

export const getCategories = () => async (dispatch) => {
  dispatch(getCategoriesRequest());

  try {
    const res = await axiosInstance.get("/categories");
    dispatch(getCategoriesSuccess(res.data));
  } catch (err) {
    dispatch(getCategoriesFail());
  }
};

export const deleteCategory = (id) => async (dispatch, getState) => {
  const { user } = getState();

  const token = user?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axiosInstance.delete(`/categories/${id}`, config);
    if (res.status === 200) {
      toast.success(res.data, { theme: "colored" });
    }
    dispatch(removeCategory(id));
  } catch (err) {
    toast.error(err.response.data);
  }
};
