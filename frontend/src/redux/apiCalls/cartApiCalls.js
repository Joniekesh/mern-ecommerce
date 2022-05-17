import { deleteProduct, clearCart } from "../reducers/cartRedux";
import { toast } from "react-toastify";

export const deleteProductById = (id) => (dispatch) => {
	dispatch(deleteProduct(id));
};

export const deleteCart = () => (dispatch) => {
	if (window.confirm("Are you SURE?")) {
		dispatch(clearCart());
		toast.success("Cart items cleared", { theme: "colored" });
	}
};
