import { axiosInstance } from "../../utils/config";
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

import {
  userProfileUpdateRequest,
  userProfileUpdateSuccess,
  userProfileUpdateFail,
} from "../reducers/updateMyProfileRedux";

export const getCurrentUser = () => async (dispatch, getState) => {
  dispatch(getCurrentUserRequest());

  const { user } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  try {
    const res = await axiosInstance.get("/users/profile", config);

    dispatch(getCurrentUserSuccess(res.data));
  } catch (err) {
    dispatch(getCurrentUserFail());
  }
};
export const updateLoggedInMyProfile =
  (userData) => async (dispatch, getState) => {
    const { user } = getState();

    dispatch(userProfileUpdateRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const res = await axiosInstance.put("/users/profile", userData, config);

      dispatch(userProfileUpdateSuccess(res.data));
    } catch (err) {
      dispatch(userProfileUpdateFail());
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
    const res = await axiosInstance.post("/users", user, config);
    dispatch(userRegisterSuccess(res.data));
    dispatch(getCurrentUser());

    localStorage.setItem("token", JSON.stringify(res.data.token));
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
    const res = await axiosInstance.post("/users/login", user, config);
    dispatch(userloginSuccess(res.data));
    dispatch(getCurrentUser());
    toast.success("User login Success", { theme: "colored" });
    localStorage.setItem("token", JSON.stringify(res.data.token));
  } catch (err) {
    dispatch(userloginFail());
    toast.error(err.response?.data, { theme: "colored" });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(userLogout());
};
