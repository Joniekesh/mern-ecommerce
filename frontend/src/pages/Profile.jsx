import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
	getCurrentUser,
	updateLoggedInMyProfile,
} from "../redux/apiCalls/userApiCalls";
import { userProfileUpdateReset } from "../redux/reducers/updateMyProfileRedux";
import Loader from "../components/Loader";
import { getMyOrders } from "../redux/apiCalls/myOrderApiCalls";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";

const Wrapper = styled.div`
	overflow: hidden;
`;

const Container = styled.div`
	max-width: 1200px;
	background-color: white;
	overflow: hidden;
	margin: auto;
	margin-top: 7rem;
	padding: 0 2rem;
	display: flex;
	flex-direction: column;
	${mobile({
		padding: "0px",
	})}
`;

const TitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: teal;
	${mobile({
		fontSize: "15px",
	})}
`;

const TitleDiv = styled.div`
	display: flex;
	align-items: center;
	margin-left: 16px;
`;

const Title = styled.h1``;

const Icon = styled.span`
	margin-right: 10px;
	font-size: 24px;
`;

const AdminDashboard = styled.button`
	background-color: teal;
	color: white;
	padding: 8px;
	cursor: pointer;
	border: none;
	border-radius: 5px;
	font-size: 16px;
	font-weight: 500;
`;

const ProfileTop = styled.div`
	display: flex;
	gap: 10px;
	width: 100%;
	padding: 16px;
	cursor: pointer;
	${mobile({
		flexDirection: "column",
	})}
`;

const TopLeftContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	${mobile({
		width: "100%",
	})}
`;

const BtnGroup = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 10px 0px 20px 0;
	${mobile({
		marginRight: "20px",
	})}
`;

const CancelBtn = styled.button`
	width: 70px;
	padding: 8px;
	border: none;
	background-color: crimson;
	color: white;
	cursor: pointer;
	font-size: 16px;
	border-radius: 5px;
	transition: all 0.3s ease;
	&:hover {
		transform: scale(1.07);
	}
`;

const UpdateBtn = styled.button`
	width: 70px;
	padding: 8px;
	border: none;
	background-color: teal;
	color: white;
	cursor: pointer;
	font-size: 16px;
	border-radius: 5px;
	transition: all 0.3s ease;
	&:hover {
		transform: scale(1.07);
	}
`;

const TopLeft = styled.div`
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	background-color: white;
	padding: 10px;
	position: relative;
	height: fit-content;
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
	width: 50%;
	position: relative;
	height: fit-content;
	${mobile({
		width: "100%",
	})}
`;

const EditBtn = styled.span`
	position: absolute;
	top: 16px;
	right: 16px;
	color: teal;
`;

const InfoInput = styled.input`
	border: none;
	border-bottom: 1px solid #08173b;
	width: 100%;
	font-size: 16px;
	padding: 5px;
	&:focus {
		outline: none;
		border-bottom: 2px solid #08173b;
	}
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

const InfoSelect = styled.select`
	cursor: pointer;
	padding: 3px;
`;

const InfoOption = styled.option``;

const ProfileBottom = styled.div`
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	background-color: white;
	padding: 10px;
	height: fit-content;
	width: 100%;
	overflow-x: auto;
`;

const TableDiv = styled.table`
	width: 100%;
`;

const Table = styled.table`
	border-collapse: collapse;
	border-spacing: 0;
	width: 100%;
	border: 1px solid #ddd;
`;

const TableHead = styled.thead``;
const TableBody = styled.tbody``;

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
`;

const Profile = () => {
	const user = useSelector((state) => state.user.currentUser);

	const updateMyProfile = useSelector((state) => state.updateMyProfile);
	const { success } = updateMyProfile;

	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [phoneNumber, setPhoneNumber] = useState();
	const [gender, setGender] = useState();
	const [password, setPassword] = useState("");

	const [isUpdate, setIsUpdate] = useState(false);

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (!user) {
			history.push("/login");
		}
	}, [user, history]);

	useEffect(() => {
		if (success) {
			dispatch(userProfileUpdateReset());
			history.push("/profile");
		} else {
			if (!user?.name) {
				dispatch(getCurrentUser());
			} else {
				setName(user.name);
				setEmail(user.email);
				setPhoneNumber(user.phoneNumber);
				setGender(user.gender);
			}
		}
	}, [success, history, user, dispatch]);

	const myOrder = useSelector((state) => state.myOrder);
	const { orders, isLoading: myOrderLoading } = myOrder;

	const lastOrder = orders[orders.length - 1];

	useEffect(() => {
		dispatch(getCurrentUser());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getMyOrders());
	}, [dispatch]);

	const updatedProfile = {
		_id: user?._id,
		name,
		email,
		phoneNumber,
		gender,
		password,
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		dispatch(updateLoggedInMyProfile(updatedProfile));
		setIsUpdate(false);
		window.location.reload();
	};

	return (
		<Wrapper>
			<Container>
				<>
					<TitleContainer>
						<TitleDiv>
							<Icon>
								<i className="fas fa-user"></i>
							</Icon>
							<Title>Profile</Title>
						</TitleDiv>
						{user && user.isAdmin && (
							<AdminDashboard onClick={() => history.push("/admin/dashboard")}>
								Admin Dashboard
							</AdminDashboard>
						)}
					</TitleContainer>
					<ProfileTop>
						<TopLeftContainer>
							<TopLeft>
								<TopLeftTitle>User Info</TopLeftTitle>

								{!isUpdate && (
									<EditBtn>
										<i
											className="fas fa-pencil"
											onClick={() => setIsUpdate(true)}
										></i>
									</EditBtn>
								)}
								{isUpdate ? (
									<InfoContainer>
										<InfoTitle>Name:</InfoTitle>
										<InfoInput
											type="text"
											placeholder="Name"
											defaultValue={name}
											onChange={(e) => setName(e.target.value)}
										></InfoInput>
									</InfoContainer>
								) : (
									<InfoContainer>
										<InfoTitle>Name:</InfoTitle>
										<InfoDesc>{user?.name}</InfoDesc>
									</InfoContainer>
								)}

								{isUpdate ? (
									<InfoContainer>
										<InfoTitle>Email:</InfoTitle>
										<InfoInput
											type="email"
											placeholder="Email"
											defaultValue={email}
											onChange={(e) => setEmail(e.target.value)}
										></InfoInput>
									</InfoContainer>
								) : (
									<InfoContainer>
										<InfoTitle>Email:</InfoTitle>
										<InfoDesc>{user?.email}</InfoDesc>
									</InfoContainer>
								)}
								{isUpdate ? (
									<InfoContainer>
										<InfoTitle>Phone Number:</InfoTitle>
										<InfoInput
											type="text"
											placeholder="Phone Number"
											value={phoneNumber}
											onChange={(e) => setPhoneNumber(e.target.value)}
										></InfoInput>
									</InfoContainer>
								) : (
									user?.phoneNumber && (
										<InfoContainer>
											<InfoTitle>Phone Number:</InfoTitle>
											<InfoDesc>{user?.phoneNumber}</InfoDesc>
										</InfoContainer>
									)
								)}
								{isUpdate ? (
									<InfoContainer>
										<InfoTitle>Gender:</InfoTitle>
										<InfoSelect
											value={gender}
											onChange={(e) => setGender(e.target.value)}
										>
											<InfoOption value="male">MALE</InfoOption>
											<InfoOption value="female">FEMALE</InfoOption>
										</InfoSelect>
									</InfoContainer>
								) : (
									user?.gender && (
										<InfoContainer>
											<InfoTitle>Gender:</InfoTitle>
											<InfoDesc>{user?.gender}</InfoDesc>
										</InfoContainer>
									)
								)}
								{isUpdate && (
									<InfoContainer>
										<InfoTitle>Password:</InfoTitle>
										<InfoInput
											type="password"
											placeholder="Password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										></InfoInput>
									</InfoContainer>
								)}
							</TopLeft>
							{isUpdate && (
								<BtnGroup>
									<CancelBtn onClick={() => setIsUpdate(false)}>
										Cancel
									</CancelBtn>
									<UpdateBtn type="submit" onClick={handleUpdate}>
										Update
									</UpdateBtn>
								</BtnGroup>
							)}
						</TopLeftContainer>
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
									<InfoDesc>{lastOrder?.shippingAddress?.phone}</InfoDesc>
								</InfoContainer>
								<InfoContainer>
									<InfoTitle>Country:</InfoTitle>
									<InfoDesc>{lastOrder?.shippingAddress?.country}</InfoDesc>
								</InfoContainer>
								<InfoContainer>
									<InfoTitle>City:</InfoTitle>
									<InfoDesc>{lastOrder?.shippingAddress?.city}</InfoDesc>
								</InfoContainer>
								<InfoContainer>
									<InfoTitle>Postal Code:</InfoTitle>
									<InfoDesc>{lastOrder?.shippingAddress?.postalCode}</InfoDesc>
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
											<TableBody>
												{orders.map((order) => (
													<TableRow key={order._id}>
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
														<TableData>
															<Link to={`/order/${order._id}`}>
																<Button>View</Button>
															</Link>
														</TableData>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</TableDiv>
								)}
							</>
						)}
					</ProfileBottom>
				</>
			</Container>
			<NewsLetter />
			<Footer />
		</Wrapper>
	);
};

export default Profile;
