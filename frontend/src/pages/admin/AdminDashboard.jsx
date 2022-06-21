import styled from "styled-components";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SideBar from "../../components/admin/SideBar";
import DashboardTop from "../../components/admin/DashboardTop";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Chart from "../../components/admin/Chart";

import Loader from "../../components/Loader";
import { adminGetAllOrders } from "../../redux/adminRedux/adminApiCalls";

const AdminDashboard = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const user = useSelector((state) => state.user.currentUser.user);

	if (!user.isAdmin) {
		toast.error("You are not authorized to access this route", {
			theme: "colored",
		});
		history.push("/");
	}

	const adminOrder = useSelector((state) => state.adminOrder);
	const { orders, isLoading, error } = adminOrder;

	useEffect(() => {
		dispatch(adminGetAllOrders());
	}, [dispatch]);

	const Container = styled.div`
		max-width: 1200px;
		overflow: hidden;
		margin: auto;
		margin-top: 7rem;
		display: flex;
		padding: 0 1rem 0 0;
	`;

	const LeftContainer = styled.div`
		flex: 1.5;
		-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
		box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
		background-color: white;
		padding: 10px;
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		z-index: 10;
		overflow: hidden;
	`;

	const RightContainer = styled.div`
		flex: 10;
		overflow: hidden;
		margin-left: 205px;
	`;

	const DashboarCenter = styled.div`
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: 16px 0;
	`;

	const Left = styled.div`
		flex: 1.5;
		display: flex;
		flex-direction: column;
		-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
		box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
		background-color: white;
		padding: 20px;
		border-radius: 8px;
	`;

	const Desc = styled.div`
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
	`;

	const DescTitle = styled.h4`
		font-weight: 500;
		color: gray;
	`;

	const DescIcon = styled.span``;

	const BottomDiv = styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	`;

	const ProgressBar = styled.div`
		width: 100px;
		height: 100px;
		margin: 10px 0;
	`;

	const BottomTitle = styled.p`
		font-size: 18px;
		font-weight: 500;
		color: gray;
	`;

	const Amount = styled.h1`
		margin: 20px 0;
	`;

	const SalesDesc = styled.span`
		text-align: center;
		color: gray;
		font-size: 14px;
	`;

	const TargetContainer = styled.div`
		display: flex;
		margin: 20px 0;
	`;

	const Target = styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: 30px;
		text-align: center;
	`;

	const TargetTitle = styled.p`
		font-weight: 500;
		color: gray;
		margin-bottom: 16px;
	`;

	const TargetDescDiv = styled.div`
		display: flex;
		align-items: center;
		font-weight: 500;
	`;

	const TargetIcon = styled.span`
		margin-right: 5px;
	`;
	const TargetAmount = styled.p``;

	const Right = styled.div`
		flex: 3;
		-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
		box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
		background-color: white;
		padding: 20px;
		border-radius: 8px;
	`;

	const DashboardBottom = styled.div`
		overflow-x: auto;
		-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
		box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
		background-color: white;
		padding: 10px;
		height: fit-content;
		width: 100%;
	`;

	const OrderTitle = styled.h2`
		color: gray;
		font-weight: 500;
	`;

	const TableDiv = styled.table`
		overflow-x: auto;
		width: 100%;
	`;

	const Table = styled.table`
		border-collapse: collapse;
		border-spacing: 0;
		width: 100%;
		border: 1px solid #ddd;
	`;

	const TableHead = styled.thead``;

	const TableRow = styled.tr`
		&:nth-child(even) {
			background-color: #f2f2f2;
		}
		&:hover {
			background-color: orange;
		}
	`;
	const TableHeading = styled.th`
		text-align: left;
		padding: 8px;
	`;

	const TableData = styled.td`
		text-align: left;
		padding: 8px;
	`;

	const Button = styled.button`
		padding: 5px 8px;
		cursor: pointer;
		border: none;
		background-color: #08173b;
		color: white;
		border-radius: 3px;
		letter-spacing: 1px;
		display: flex;
		align-items: center;
		justify-content: center;
	`;

	return (
		<>
			<Container>
				<LeftContainer>
					<SideBar />
				</LeftContainer>
				<RightContainer>
					<DashboardTop />
					<DashboarCenter>
						<Left>
							<Desc>
								<DescTitle>Total Revenue</DescTitle>
								<DescIcon>
									<i className="fa-solid fa-ellipsis-vertical"></i>
								</DescIcon>
							</Desc>
							<BottomDiv>
								<ProgressBar>
									<CircularProgressbar
										value={70}
										text={"70%"}
										strokeWidth={5}
									/>
								</ProgressBar>
								<BottomTitle>Total sales made today</BottomTitle>
								<Amount>$10.6k</Amount>
								<SalesDesc>
									Previous transaction processing.Last payment may not be
									included
								</SalesDesc>
								<TargetContainer>
									<Target>
										<TargetTitle>Target</TargetTitle>
										<TargetDescDiv style={{ color: "red" }}>
											<TargetIcon>
												<i className="fa-solid fa-angle-down"></i>
											</TargetIcon>
											<TargetAmount>$9.4k</TargetAmount>
										</TargetDescDiv>
									</Target>
									<Target>
										<TargetTitle>Last Week</TargetTitle>
										<TargetDescDiv style={{ color: "green" }}>
											<TargetIcon>
												<i className="fa-solid fa-angle-up"></i>
											</TargetIcon>
											<TargetAmount>$10.8k</TargetAmount>
										</TargetDescDiv>
									</Target>
									<Target>
										<TargetTitle>Last Month</TargetTitle>
										<TargetDescDiv style={{ color: "green" }}>
											<TargetIcon>
												<i className="fa-solid fa-angle-up"></i>
											</TargetIcon>
											<TargetAmount>$10.8k</TargetAmount>
										</TargetDescDiv>
									</Target>
								</TargetContainer>
							</BottomDiv>
						</Left>
						<Right>
							<Chart />
						</Right>
					</DashboarCenter>
					<DashboardBottom>
						<OrderTitle>Latest Orders</OrderTitle>
						{error && <span>{error}</span>}
						{isLoading ? (
							<Loader />
						) : (
							<>
								{orders.length === 0 ? (
									<h4>No orders to show</h4>
								) : (
									<TableDiv>
										<Table>
											<TableHead>
												<TableRow>
													<TableHeading>ORDER ID</TableHeading>
													<TableHeading>NAME</TableHeading>
													<TableHeading>EMAIL</TableHeading>
													<TableHeading>DATE</TableHeading>
													<TableHeading>TOTAL</TableHeading>
													<TableHeading>PAID</TableHeading>
													<TableHeading>DELIVERED</TableHeading>
													<TableHeading></TableHeading>
												</TableRow>
											</TableHead>
											{orders.map((order) => (
												<TableRow key={order._id}>
													<TableData>{order._id}</TableData>
													<TableData>{order.user?.name}</TableData>
													<TableData>{order.user?.email}</TableData>
													<TableData>
														{new Date(order.createdAt).toDateString()}
													</TableData>
													<TableData>$ {order.totalPrice}</TableData>
													<TableData>
														{order.isPaid ? (
															<p
																style={{
																	backgroundColor: "green",
																	color: "white",
																	padding: "5px",
																	borderRadius: "3px",
																}}
															>
																{new Date(order.paidAt).toLocaleDateString()}
															</p>
														) : (
															<p
																style={{
																	backgroundColor: "crimson",
																	color: "white",
																	padding: "5px",
																	borderRadius: "3px",
																}}
															>
																Not Paid
															</p>
														)}
													</TableData>
													<TableData>
														{order.isDelivered ? (
															<p
																style={{
																	backgroundColor: "green",
																	color: "white",
																	padding: "5px",
																	borderRadius: "3px",
																}}
															>
																{new Date(
																	order.deliveredAt
																).toLocaleDateString()}
															</p>
														) : (
															<p
																style={{
																	backgroundColor: "crimson",
																	color: "white",
																	padding: "5px",
																	borderRadius: "3px",
																}}
															>
																Not Delivered
															</p>
														)}
													</TableData>
													<Link to={`/order/${order._id}`}>
														<TableData>
															<Button>View</Button>
														</TableData>
													</Link>
												</TableRow>
											))}
										</Table>
									</TableDiv>
								)}
							</>
						)}
					</DashboardBottom>
				</RightContainer>
			</Container>
		</>
	);
};

export default AdminDashboard;
