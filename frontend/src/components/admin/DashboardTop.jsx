import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
	text-align: center;
	display: flex;
	justify-content: space-between;
	gap: 8px;
`;

const DashboardTopContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 10px;
	width: 100%;
`;

const Users = styled.div`
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	background-color: white;
	padding: 10px;
	height: 150px;
	width: 400px;
	flex: 1;
	display: flex;
	flex-direction: column;
	border-radius: 8px;
`;

const InfoContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const InfoTitle = styled.p`
	color: gray;
	font-weight: 500;
`;

const InfoRight = styled.div`
	display: flex;
	align-items: center;
	color: green;
	font-weight: 500;
`;

const Icon = styled.span`
	margin-right: 5px;
`;

const Percentage = styled.span``;

const Count = styled.h1`
	align-self: flex-start;
	margin: 20px 0;
	font-weight: 400;
`;

const Bottom = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const ListLink = styled.span`
	border-bottom: 2px solid orange;
`;
const UserListIcon = styled.span`
	color: teal;
	background-color: #0080807a;
	padding: 7px;
	border-radius: 3px;
`;
const OrderListIcon = styled.span`
	color: orange;
	background-color: #ffa60076;
	padding: 7px;
	border-radius: 3px;
`;
const EarningListIcon = styled.span`
	color: green;
	background-color: #00800081;
	padding: 7px;
	border-radius: 3px;
`;

const Orders = styled.div`
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	background-color: white;
	padding: 10px;
	height: 150px;
	width: 400px;
	flex: 1;
	border-radius: 8px;
`;

const Earnings = styled.div`
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	background-color: white;
	padding: 10px;
	height: 150px;
	width: 400px;
	flex: 1;
	border-radius: 8px;
`;

const DashboardTop = () => {
	const adminUser = useSelector((state) => state.adminUser);
	const { users } = adminUser;

	const adminOrder = useSelector((state) => state.adminOrder);
	const { orders } = adminOrder;

	const paidOrders = orders.filter((order) => order.isPaid);
	const totalEarnings = paidOrders.reduce(function (acc, obj) {
		return acc + obj.totalPrice;
	}, 0);

	return (
		<Container>
			<DashboardTopContainer>
				<Users>
					<InfoContainer>
						<InfoTitle style={{ color: "teal" }}>USERS</InfoTitle>
						<InfoRight>
							<Icon>
								<i className="fa-solid fa-angle-up"></i>
							</Icon>
							<Percentage>+5 %</Percentage>
						</InfoRight>
					</InfoContainer>
					<Count>{users.length}</Count>
					<Bottom>
						<Link to="/admin/users">
							<ListLink>See all users</ListLink>
						</Link>
						<UserListIcon>
							<i className="fa-solid fa-users"></i>
						</UserListIcon>
					</Bottom>
				</Users>
				<Orders>
					<InfoContainer>
						<InfoTitle style={{ color: "orange" }}>ORDERS</InfoTitle>
						<InfoRight>
							<Icon>
								<i className="fa-solid fa-angle-up"></i>
							</Icon>
							<Percentage>+5 %</Percentage>
						</InfoRight>
					</InfoContainer>
					<Count>{orders.length}</Count>
					<Bottom>
						<Link to="/admin/orders">
							<ListLink>See all orders</ListLink>
						</Link>
						<OrderListIcon>
							<i className="fa-solid fa-cart-arrow-down"></i>
						</OrderListIcon>
					</Bottom>
				</Orders>

				<Earnings>
					<InfoContainer>
						<InfoTitle style={{ color: "green" }}>EARNINGS</InfoTitle>
						<InfoRight>
							<Icon>
								<i className="fa-solid fa-angle-up"></i>
							</Icon>
							<Percentage>+5 %</Percentage>
						</InfoRight>
					</InfoContainer>
					<Count>$ {totalEarnings}</Count>
					<Bottom>
						<Link to="/admin/earnings">
							<ListLink>View net earnings</ListLink>
						</Link>
						<EarningListIcon>
							<i class="fa-solid fa-dollar-sign"></i>
						</EarningListIcon>
					</Bottom>
				</Earnings>
			</DashboardTopContainer>
		</Container>
	);
};

export default DashboardTop;
