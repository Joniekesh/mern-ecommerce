import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/apiCalls/userApiCalls";
import { clearCart } from "../redux/reducers/cartRedux";
import { myOrderReset } from "../redux/reducers/myOrderRedux";
import { resetOrder } from "../redux/reducers/orderRedux";
import { resetUser } from "../redux/reducers/userRedux";
import { resetShippingAddress } from "../redux/reducers/shippingAddressRedux";

const Container = styled.div`
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	background-color: white;
	padding: 10px;
	position: fixed;
	top: 0;
	left: 0;
	width: 60%;
	height: 100vh;
	z-index: 999999;
	color: #333;
`;

const SideMenuWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
`;

const TopDiv = styled.div``;

const Logo = styled.h4`
	color: #08173b;
`;

const CancelBtn = styled.div`
	position: absolute;
	top: 10px;
	right: 10px;
	font-size: 20px;
	font-weight: 500;
	color: crimson;
	cursor: pointer;
`;

const MenuTop = styled.div`
	display: flex;
	align-items: center;
	margin-top: 16px;
	padding: 10px;
	border-bottom: 1px solid #ddd;
	background-color: #bbbbca;
	border-radius: 5px;
`;

const AuthDiv = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px;
	font-weight: 500;
`;

const Register = styled.div`
	cursor: pointer;
`;

const Login = styled.div`
	cursor: pointer;
`;

const UserInitials = styled.span`
	width: 34px;
	height: 34px;
	border-radius: 50%;
	color: #08173b;
	font-weight: 500;
	background-color: white;
	margin-right: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	cursor: pointer;
`;

const UserName = styled.h3`
	font-weight: 500;
	color: teal;
`;

const View = styled.span`
	font-size: 14px;
`;

const MenuBottom = styled.div`
	padding: 10px;
`;

const List = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const ListItemCart = styled.div`
	position: relative;
	display: flex;
	padding: 10px;
	cursor: pointer;
	border-bottom: 1px solid #ddd;
`;

const IconCart = styled.span`
	margin-right: 16px;
	color: teal;
`;

const CartCount = styled.span`
	position: absolute;
	top: 0px;
	left: 24px;
	font-size: 12px;
	font-weight: 500;
	background-color: orange;
	color: white;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

const ListItem = styled.div`
	display: flex;
	padding: 10px;
	cursor: pointer;
	border-bottom: 1px solid #ddd;
`;

const Icon = styled.div`
	font-size: 18px;
	margin-right: 16px;
	color: teal;
`;

const Text = styled.div``;

const SideMenu = ({ open, setOpen, setOverlay }) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);
	const { currentUser } = user;

	const cart = useSelector((state) => state.cart);
	const { quantity } = cart;

	const userInitials =
		currentUser?.name?.split(" ")[0].charAt(0) +
		currentUser?.name?.split(" ")[1].charAt(0);

	const handleClose = () => {
		setOpen(false);
		setOverlay(false);
	};

	const handleHome = () => {
		setOpen(false);
		setOverlay(false);
		history.push("/");
	};
	const handleRegister = () => {
		setOpen(false);
		setOverlay(false);
		history.push("/register");
	};

	const handleLogin = () => {
		setOpen(false);
		setOverlay(false);
		history.push("/login");
	};
	const handleMyCart = () => {
		setOpen(false);
		setOverlay(false);
		history.push("/cart");
	};

	const handleProfile = () => {
		setOpen(false);
		setOverlay(false);
		history.push("/profile");
	};

	const handleLogout = () => {
		dispatch(resetOrder());
		dispatch(clearCart());
		dispatch(resetUser());
		dispatch(myOrderReset());
		dispatch(resetShippingAddress());
		dispatch(logout());
		setOpen(false);
		setOverlay(false);
		localStorage.removeItem("token");

		history.push("/login");
	};

	return (
		open && (
			<Container>
				<SideMenuWrapper>
					<TopDiv>
						<ListItem onClick={handleHome}>
							<Icon>
								<i className="fa-solid fa-house"></i>
							</Icon>
							<Logo>SHOPARENA</Logo>
						</ListItem>
						<CancelBtn onClick={handleClose}>X</CancelBtn>
					</TopDiv>
					{currentUser ? (
						<MenuTop onClick={handleProfile}>
							<UserInitials>{userInitials}</UserInitials>
							<UserInfo>
								<UserName>{currentUser.name}</UserName>
								<View>View Profile</View>
							</UserInfo>
						</MenuTop>
					) : (
						<AuthDiv>
							<Register onClick={handleRegister}>REGISTER</Register>
							<Login onClick={handleLogin}>LOGIN</Login>
						</AuthDiv>
					)}
					<MenuBottom>
						<List>
							<ListItemCart onClick={handleMyCart}>
								<IconCart>
									<i className="fa-solid fa-cart-shopping"></i>
								</IconCart>
								<Text>My Cart</Text>
								{quantity > 0 && <CartCount>{quantity}</CartCount>}
							</ListItemCart>
							<ListItem onClick={handleProfile}>
								<Icon>
									<i className="fa-solid fa-cart-arrow-down"></i>
								</Icon>
								<Text>My Orders</Text>
							</ListItem>
							<ListItem onClick={handleProfile}>
								<Icon>
									<i className="fa-solid fa-user"></i>
								</Icon>
								<Text>Profile</Text>
							</ListItem>
							<ListItem onClick={handleProfile}>
								<Icon>
									<i className="fa-solid fa-gear"></i>
								</Icon>
								<Text>Settings</Text>
							</ListItem>
							{currentUser && (
								<ListItem onClick={handleLogout}>
									<Icon>
										<i className="fa-solid fa-arrow-right-from-bracket"></i>
									</Icon>
									<Text>Logout</Text>
								</ListItem>
							)}
						</List>
					</MenuBottom>
				</SideMenuWrapper>
			</Container>
		)
	);
};

export default SideMenu;
