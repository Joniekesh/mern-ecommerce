import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { getUserProfile } from "../redux/apiCalls/profileApiCalls";
import Loader from "../components/Loader";
import { getMyOrders } from "../redux/apiCalls/myOrderApiCalls";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
const Container = styled.div`
	max-width: 1200px;
	background-color: white;
	overflow: hidden;
	margin: auto;
	margin-top: 7rem;
	padding: 0 2rem;
	display: flex;
	flex-direction: column;
`;

const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	color: teal;
`;

const Title = styled.h1``;

const Icon = styled.span`
	margin-right: 10px;
	font-size: 24px;
`;

const ProfileTop = styled.div`
	display: flex;
	gap: 10px;
	width: 100%;
	padding: 16px;
	cursor: pointer;
`;

const TopLeft = styled.div`
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	background-color: white;
	padding: 10px;
	height: fit-content;
	width: 50%;
	position: relative;
	height: 250px;
`;

const TopLeftTitle = styled.h2`
	margin-bottom: 10px;
	color: #08173b;
`;

const TopRight = styled.div`
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	background-color: white;
	padding: 10px;
	height: fit-content;
	width: 50%;
	position: relative;
	height: 250px;
`;

const Image = styled.img`
	width: 50px;
	height: 50px;
	object-fit: cover;
	border-radius: 5px;
`;

const EditBtn = styled.span`
	position: absolute;
	top: 16px;
	right: 16px;
	color: teal;
`;

const InfoContainer = styled.div`
	display: flex;
	align-items: center;
	margin: 16px 0;
`;

const InfoTitle = styled.h3`
	margin-right: 10px;
	color: #08173b;
`;

const InfoDesc = styled.p``;

const ProfileBottom = styled.div`
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	background-color: white;
	padding: 10px;
	height: fit-content;
	width: 100%;
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

const Profile = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const user = useSelector((state) => state.user.currentUser.user);

	useEffect(() => {
		if (!user) {
			history.push("/login");
		}
	}, [user, history]);

	const profile = useSelector((state) => state.profile);
	const { currentProfile, isLoading } = profile;

	const myOrder = useSelector((state) => state.myOrder);
	const { orders, isLoading: myOrderLoading } = myOrder;

	const lastOrder = orders[orders.length - 1];

	useEffect(() => {
		dispatch(getUserProfile());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getMyOrders());
	}, [dispatch]);

	return (
		<>
			<Container>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<TitleContainer>
							<Icon>
								<i className="fas fa-user"></i>
							</Icon>
							<Title>Dashboard</Title>
						</TitleContainer>
						<ProfileTop>
							<TopLeft>
								<TopLeftTitle>User Info</TopLeftTitle>
								<Image
									src={
										currentProfile?.avatar
											? currentProfile.avatar
											: "/assets/image6.jpg"
									}
									alt=""
								></Image>
								<EditBtn>
									<i className="fas fa-pencil"></i>
								</EditBtn>
								<InfoContainer>
									<InfoTitle>Name:</InfoTitle>
									<InfoDesc>{currentProfile?.name}</InfoDesc>
								</InfoContainer>
								<InfoContainer>
									<InfoTitle>Email:</InfoTitle>
									<InfoDesc>{currentProfile?.email}</InfoDesc>
								</InfoContainer>
								{currentProfile.phoneNumber && (
									<InfoContainer>
										<InfoTitle>Phone Number:</InfoTitle>
										<InfoDesc>{currentProfile?.phoneNumber}</InfoDesc>
									</InfoContainer>
								)}
							</TopLeft>
							{orders.length > 0 && (
								<TopRight>
									<TopLeftTitle>Shipping Info</TopLeftTitle>
									<EditBtn>
										<i className="fas fa-pencil"></i>
									</EditBtn>
									<InfoContainer>
										<InfoTitle>Address:</InfoTitle>
										<InfoDesc>{lastOrder?.shippingAddress?.address}</InfoDesc>
									</InfoContainer>
									<InfoContainer>
										<InfoTitle>Phone:</InfoTitle>
										<InfoDesc>{lastOrder?.shippingAddress.phone}</InfoDesc>
									</InfoContainer>
									<InfoContainer>
										<InfoTitle>Country:</InfoTitle>
										<InfoDesc>{lastOrder?.shippingAddress.country}</InfoDesc>
									</InfoContainer>
									<InfoContainer>
										<InfoTitle>City:</InfoTitle>
										<InfoDesc>{lastOrder?.shippingAddress.city}</InfoDesc>
									</InfoContainer>
									<InfoContainer>
										<InfoTitle>Postal Code:</InfoTitle>
										<InfoDesc>{lastOrder?.shippingAddress.postalCode}</InfoDesc>
									</InfoContainer>
								</TopRight>
							)}
						</ProfileTop>
						<ProfileBottom>
							<TopLeftTitle>My Orders</TopLeftTitle>
							{myOrderLoading ? (
								<Loader />
							) : (
								<>
									{orders.length === 0 ? (
										<h4>No order to show</h4>
									) : (
										<TableDiv>
											<Table>
												<TableHead>
													<TableRow>
														<TableHeading>ID</TableHeading>
														<TableHeading>DATE</TableHeading>
														<TableHeading>TOTAL</TableHeading>
														<TableHeading>PAID</TableHeading>
														<TableHeading>DELIVERED</TableHeading>
														<TableHeading></TableHeading>
													</TableRow>
												</TableHead>
												{orders.map((order) => (
													<TableRow>
														<TableData>{order._id}</TableData>
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
																	{order.paidAt.substring(0, 10)}
																</p>
															) : (
																<i
																	className="fas fa-times"
																	style={{ color: "red" }}
																></i>
															)}
														</TableData>
														<TableData>DELIVERED</TableData>
														<Link to={`/order/${order._id}`}>
															<TableData
																style={{
																	cursor: "pointer",
																	borderBottom: "2px dotted #08173b",
																}}
															>
																VIEW
															</TableData>
														</Link>
													</TableRow>
												))}
											</Table>
										</TableDiv>
									)}
								</>
							)}
						</ProfileBottom>
					</>
				)}
			</Container>
			<NewsLetter />
			<Footer />
		</>
	);
};

export default Profile;
