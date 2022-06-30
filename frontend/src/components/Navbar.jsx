import styled from "styled-components";
import { useEffect, useState } from "react";
import Announcement from "./Announcement";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/apiCalls/userApiCalls";
import {
	nestHubResponsive,
	miniPhoneResponsive,
	mobile,
	mobile444,
} from "../responsive";
import { resetUser } from "../redux/reducers/userRedux";
import { resetOrder } from "../redux/reducers/orderRedux";
import { clearCart } from "../redux/reducers/cartRedux";
import { myOrderReset } from "../redux/reducers/myOrderRedux";
import { resetShippingAddress } from "../redux/reducers/shippingAddressRedux";
import { getProducts } from "../redux/apiCalls/productApiCalls";
import SideMenu from "./SideMenu";

const NavContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto;
	width: 100%;
	height: 70px;
	padding: 10px 20px;
	background-color: #08173b;
	position: fixed;
	top: 30px;
	z-index: 3;
	${mobile({
		padding: "10px 0px",
	})}
`;

const NavLogo = styled.h2`
	position: absolute;
	left: 40%;
	top: 0;
	color: white;
	display: none;
	cursor: pointer;
	${mobile444({
		display: "flex",
		left: "33%",
		fontSize: "18px",
	})}
`;

const NavWrapper = styled.div`
	width: 90%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: white;
	${mobile({
		width: "100%",
	})}
`;

const MenuIcon = styled.span`
	margin-right: 5px;
	font-size: 24px;
	display: none;
	cursor: pointer;
	${mobile({
		display: "flex",
		margin: "0px 10px",
	})}
`;

const NavLeft = styled.div`
	display: flex;
	align-items: center;
	position: relative;
`;

const NavCenter = styled.h2`
	cursor: pointer;
	letter-spacing: 2px;
	${miniPhoneResponsive({
		fontSize: "16x",
	})}
	${mobile({
		fontSize: "16px",
	})}
	${mobile444({
		display: "none",
	})}
`;

const Lang = styled.p`
	margin-left: 8px;
	${mobile({
		display: "none",
	})}
`;

const SearchContainer = styled.div`
	display: flex;
	align-items: center;
	background-color: white;
	padding: 10px;
	border-radius: 5px;
	${mobile({
		padding: "5px",
		margin: "0px 5px",
	})}
`;

const SearchIcon = styled.span`
	color: #c5c3c3;
	margin-right: 5px;
`;
const SearchInput = styled.input`
	outline: none;
	border: none;
	font-size: 16px;
	width: 200px;
	${mobile({
		fontSize: "15px",
		width: "150px",
	})}
`;

const Search = styled.div`
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	background-color: #e4e2e2;
	color: black;
	padding: 10px;
	position: absolute;
	z-index: 9999;
	top: 54px;
	width: 100%;
	text-align: right;
	margin-left: 50px;
`;

const SearchList = styled.ul`
	display: flex;
	flex-direction: column;
`;

const SearchListItem = styled.li`
	padding: 8px;
	font-weight: 500;
	color: teal;
`;

const ListItemDiv = styled.div`
	display: flex;
	align-items: center;
`;

const ListItemImage = styled.img`
	width: 30px;
	height: 30px;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 5px;
`;

const NavRight = styled.div`
	display: flex;
	align-items: center;
	font-weight: 300;
	${nestHubResponsive({
		marginRight: "24px",
	})}
`;

const Register = styled.span`
	cursor: pointer;
	${mobile({
		display: "none",
	})}
`;

const Login = styled.span`
	margin: 0px 16px;
	cursor: pointer;
	${nestHubResponsive({
		margin: "10px",
	})}
	${mobile({
		display: "none",
	})}
`;

const Logout = styled.span`
	margin-right: 12px;
	cursor: pointer;
	${mobile({
		display: "none",
	})}
`;

const ProfileContainer = styled.div`
	position: relative;
	margin-right: 16px;
`;

const UserInitials = styled.span`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	cursor: pointer;
	color: #08173b;
	font-weight: 500;
	background-color: white;
	margin-right: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	${mobile({
		width: "30px",
		height: "30px",
		fontSize: "15px",
	})}
`;

const CartContainer = styled.span`
	position: relative;
	cursor: pointer;
	${mobile({
		paddingRight: "0px",
	})}
`;

const CartLogo = styled.span``;

const CartCount = styled.span`
	position: absolute;
	top: -10px;
	right: -10px;
	font-size: 12px;
	font-weight: 500;
	background-color: orange;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

const Navbar = ({ user, open, setOpen, setOverlay }) => {
	const [search, setSearch] = useState("");
	const userInitials =
		user?.name?.split(" ")[0].charAt(0).toString() +
		user?.name?.split(" ")[1].charAt(0).toString();

	const dispatch = useDispatch();
	const history = useHistory();

	const cart = useSelector((state) => state.cart);
	const { quantity } = cart;

	const product = useSelector((state) => state.product);
	const { products } = product;

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	const handleLogout = () => {
		dispatch(resetUser());
		dispatch(resetOrder());
		dispatch(clearCart());
		dispatch(myOrderReset());
		dispatch(resetShippingAddress());
		dispatch(logout());
		localStorage.removeItem("token");

		history.push("/login");
	};

	const handleOpen = () => {
		setOpen(true);
		setOverlay(true);
	};

	return (
		<>
			<Announcement />
			<NavContainer>
				<Link to="/">
					<NavLogo>SHOPARENA</NavLogo>
				</Link>
				<NavWrapper>
					<SideMenu setOpen={setOpen} open={open} setOverlay={setOverlay} />
					<MenuIcon onClick={() => handleOpen()}>
						<i className="fa-solid fa-bars"></i>
					</MenuIcon>
					<Link to="/">
						<NavCenter>SHOPARENA</NavCenter>
					</Link>
					<NavLeft>
						<Lang>EN</Lang>
						<SearchContainer>
							<SearchIcon>
								<i className="fa-solid fa-magnifying-glass"></i>
							</SearchIcon>
							<SearchInput
								placeholder="Search for products and categories"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</SearchContainer>
						{search.length > 0 && (
							<Search>
								<SearchList>
									{products
										.filter((product) =>
											product.name.toLowerCase().includes(search)
										)
										.map((product) => (
											<SearchListItem key={product._id}>
												<Link to={`/products/${product._id}`}>
													<ListItemDiv>
														<ListItemImage src={product.image} />
														{product.name}
													</ListItemDiv>
												</Link>
												<hr />
											</SearchListItem>
										))}
								</SearchList>
							</Search>
						)}
					</NavLeft>

					<NavRight>
						{!user && (
							<>
								<Link to="/register">
									<Register>REGISTER</Register>
								</Link>
								<Link to="/login">
									<Login>LOGIN</Login>
								</Link>
							</>
						)}
						{user && (
							<>
								<Logout onClick={handleLogout}>LOGOUT</Logout>
								<ProfileContainer>
									<Link to="/profile">
										<UserInitials>{userInitials}</UserInitials>
									</Link>
								</ProfileContainer>
							</>
						)}

						<CartContainer>
							<Link to="/cart">
								<CartLogo>
									<i className="fa-solid fa-cart-shopping"></i>
								</CartLogo>
								{quantity > 0 && <CartCount>{quantity}</CartCount>}
							</Link>
						</CartContainer>
					</NavRight>
				</NavWrapper>
			</NavContainer>
		</>
	);
};

export default Navbar;
