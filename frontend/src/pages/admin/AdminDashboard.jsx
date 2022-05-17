import styled from "styled-components";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { adminGetAllOrders } from "../../redux/adminRedux/adminApiCalls";

const AdminDashboard = () => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user.currentUser.user);

	if (!user.isAdmin) {
		toast.error("You are not authorized to access this route", {
			theme: "colored",
		});
	}

	const adminOrder = useSelector((state) => state.adminOrder);
	const { orders, isLoading } = adminOrder;
	console.log(orders);

	useEffect(() => {
		dispatch(adminGetAllOrders());
	}, [dispatch]);

	const Container = styled.div`
		max-width: 1200px;
		overflow: hidden;
		margin: auto;
		margin-top: 7rem;
		padding: 0 2rem;
	`;

	return (
		<Container>
			{orders.map((order) => (
				<li key={order._id}>
					<Link to={`/order/${order._id}`}>{order._id}</Link>
				</li>
			))}
		</Container>
	);
};

export default AdminDashboard;
