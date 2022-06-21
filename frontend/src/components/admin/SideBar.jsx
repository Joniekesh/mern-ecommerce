import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../redux/apiCalls/userApiCalls";
import { useDispatch } from "react-redux";

const Container = styled.div`
	width: 175px;
`;

const Title = styled.h3`
	text-align: center;
	color: #08173b;
	padding: 8px;
	letter-spacing: 2px;
	background-color: #e2e5e9;
	cursor: pointer;
	border-radius: 5px;
`;

const SectionContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const Section = styled.div`
	display: flex;
	flex-direction: column;
	margin: 6px 0;
`;

const SectionTitle = styled.h5`
	font-size: 10px;
	letter-spacing: 2px;
	color: orange;
`;

const SectionList = styled.div`
	display: flex;
	align-items: center;
	margin: 5px;
	padding: 6.5px 8px;
	cursor: pointer;

	&:hover {
		background-color: #e2e5e9;
		border-radius: 5px;
	}
`;
const Icon = styled.span`
	margin-right: 8px;
	color: #08173b;
	font-size: 13px;
`;
const Text = styled.p`
	font-size: 14px;
`;

const SideBar = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleLogout = () => {
		dispatch(logout());
		history.push("/login");
	};

	return (
		<Container>
			<Link to="/admin/dashboard">
				<Title>Admin</Title>
			</Link>
			<SectionContainer>
				<Section>
					<SectionTitle>MAIN</SectionTitle>
					<Link to="/admin/dashboard">
						<SectionList>
							<Icon>
								<i className="fa-solid fa-table-cells-large"></i>
							</Icon>
							<Text>Dashboard</Text>
						</SectionList>
					</Link>
				</Section>
				<Section>
					<SectionTitle>LISTS</SectionTitle>
					<Link to="/admin/users">
						<SectionList>
							<Icon>
								<i className="fas fa-users"></i>
							</Icon>
							<Text>Users</Text>
						</SectionList>
					</Link>
					<Link to="/admin/products">
						<SectionList>
							<Icon>
								<i className="fa-solid fa-briefcase"></i>
							</Icon>
							<Text>Products</Text>
						</SectionList>
					</Link>
					<Link to="/admin/orders">
						<SectionList>
							<Icon>
								<i className="fa-solid fa-credit-card"></i>
							</Icon>
							<Text>Orders</Text>
						</SectionList>
					</Link>
					<SectionList>
						<Icon>
							<i className="fa-solid fa-truck"></i>
						</Icon>
						<Text>Delivery</Text>
					</SectionList>
				</Section>
				<Section>
					<SectionTitle>USEFUL</SectionTitle>
					<SectionList>
						<Icon>
							<i className="fa-solid fa-chart-line"></i>
						</Icon>
						<Text>Stats</Text>
					</SectionList>
					<SectionList>
						<Icon>
							<i className="fa-solid fa-bell"></i>
						</Icon>
						<Text>Notification</Text>
					</SectionList>
				</Section>
				<Section>
					<SectionTitle>SERVICE</SectionTitle>
					<SectionList>
						<Icon>
							<i className="fa-solid fa-gear"></i>
						</Icon>
						<Text>Settings</Text>
					</SectionList>
				</Section>
				<Section>
					<SectionTitle>USER</SectionTitle>
					<Link to="/profile">
						<SectionList>
							<Icon>
								<i className="fas fa-user"></i>
							</Icon>
							<Text>Profile</Text>
						</SectionList>
					</Link>
					<SectionList>
						<Icon>
							<i className="fa-solid fa-arrow-right-from-bracket"></i>
						</Icon>
						<Text onClick={handleLogout}>Logout</Text>
					</SectionList>
				</Section>
				<Section>
					<SectionTitle>THEME</SectionTitle>
					<SectionList>
						<Text>Dashboard</Text>
					</SectionList>
				</Section>
			</SectionContainer>
		</Container>
	);
};

export default SideBar;
