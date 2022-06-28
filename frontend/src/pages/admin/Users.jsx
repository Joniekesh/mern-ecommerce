import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import SideBar from "../../components/admin/SideBar";
import { useEffect } from "react";
import {
	adminGetAllUsers,
	adminDeleteUser,
} from "../../redux/adminRedux/adminApiCalls";
import Loader from "../../components/Loader";

const Container = styled.div`
	max-width: 1200px;
	overflow: hidden;
	margin: auto;
	margin-top: 7rem;
	padding: 0 2rem;
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

const Error = styled.p`
	color: red;
`;

const RightContainer = styled.div`
	flex: 10;
	flex: 1.5;
	width: 80%;
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	background-color: white;
	padding: 10px;
	margin-left: 170px;
	overflow-x: auto;
`;

const Top = styled.div`
	margin-bottom: 10px;
	position: relative;
`;
const AddUser = styled.button`
	padding: 6px;
	font-weight: 500;
	cursor: pointer;
	color: teal;
	position: absolute;
	top: 0px;
	right: 5px;
`;

const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	color: teal;
	font-weight: 500;
`;
const Icon = styled.span`
	margin-right: 10px;
	color: #0080807a;
	font-size: 24px;
`;

const Title = styled.h2``;

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

const UserContainer = styled.div`
	display: flex;
	align-items: center;
`;
const UserImage = styled.img`
	width: 30px;
	height: 30;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 8px;
`;
const UserName = styled.p``;

const TableHeading = styled.th`
	text-align: left;
	padding: 8px;
`;

const TableData = styled.td`
	text-align: left;
	padding: 8px;
`;

const ActionDiv = styled.div`
	display: flex;
	align-items: center;
`;

const View = styled.p`
	cursor: pointer;
	margin-right: 8px;
	color: green;
	background-color: #00800078;
	padding: 5px;
	border-radius: 4px;
`;

const Delete = styled.p`
	cursor: pointer;
	color: crimson;
	background-color: #dc143c7b;
	padding: 5px;
	border-radius: 4px;
`;

const Users = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user.currentUser);

	const adminUser = useSelector((state) => state.adminUser);
	const { users, isLoading, error } = adminUser;

	useEffect(() => {
		dispatch(adminGetAllUsers());
	}, [dispatch]);

	if (!user.isAdmin) {
		toast.error("You are not authorized to access this route", {
			theme: "colored",
		});
		history.push("/");
	}

	return (
		<Container>
			<LeftContainer>
				<SideBar />
			</LeftContainer>
			<RightContainer>
				{error && <Error>{error}</Error>}
				<Top>
					<TitleContainer>
						<Icon>
							<i className="fas fa-users"></i>
						</Icon>
						<Title>USERS</Title>
					</TitleContainer>
					<Link to="/admin/createUser">
						<AddUser>+ CREATE</AddUser>
					</Link>
				</Top>
				{isLoading ? (
					<Loader />
				) : (
					<>
						{users.length === 0 ? (
							<h4>No user to show</h4>
						) : (
							<TableDiv>
								<Table>
									<TableHead>
										<TableRow>
											<TableHeading>ID</TableHeading>
											<TableHeading>USERS</TableHeading>
											<TableHeading>CREATION DATE</TableHeading>
											<TableHeading>EMAIL</TableHeading>
											<TableHeading>ADMIN</TableHeading>
											<TableHeading>ACTION</TableHeading>
										</TableRow>
									</TableHead>
									<TableBody>
										{users.map((user) => (
											<TableRow key={user._id}>
												<TableData>{user._id}</TableData>
												<TableData>
													<UserContainer>
														<UserImage src={user?.avatar} />
														<UserName>{user.name}</UserName>
													</UserContainer>
												</TableData>
												<TableData>
													{new Date(user.createdAt).toDateString()}
												</TableData>

												<TableData>{user.email}</TableData>
												<TableData>
													<b>
														{user.isAdmin && (
															<i
																className="fas fa-check"
																style={{ color: "green", fontSize: "20px" }}
															></i>
														)}
													</b>
												</TableData>
												<TableData>
													<ActionDiv>
														<Link to={`/admin/users/${user._id}`}>
															<View>View</View>
														</Link>
														<Delete
															onClick={() =>
																dispatch(adminDeleteUser(user._id))
															}
														>
															Delete
														</Delete>
													</ActionDiv>
												</TableData>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableDiv>
						)}
					</>
				)}
			</RightContainer>
		</Container>
	);
};

export default Users;
