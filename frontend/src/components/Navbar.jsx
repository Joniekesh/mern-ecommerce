import styled from "styled-components";
import { useState } from "react";
import Announcement from "./Announcement";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/apiCalls/userApiCalls";
import { nestHubResponsive, miniPhoneResponsive, mobile } from "../responsive";
import { resetOrder } from "../redux/reducers/orderRedux";
import { clearCart } from "../redux/reducers/cartRedux";
import { userprofileReset } from "../redux/reducers/profileRedux";
import { myOrderReset } from "../redux/reducers/myOrderRedux";
import { resetShippingAddress } from "../redux/reducers/shippingAddressRedux";

const NavContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto;
	width: 100%;
	height: 50px;
	padding: 10px 20px;
	background-color: #08173b;
	position: fixed;
	top: 30px;
	z-index: 3;
	${nestHubResponsive({
		padding: "10px",
	})}
`;

const NavWrapper = styled.div`
	width: 90%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: white;
`;

const NavLeft = styled.div`
	display: flex;
	align-items: center;
	position: relative;
`;

const Lang = styled.p`
	margin-right: 8px;
	${mobile({
		fontSize: "15px",
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
	width: 250px;
	padding-left: 50px;
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
	z-index: 999;
	top: 54px;
	width: 100%;
	text-align: center;
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

const NavCenter = styled.div`
	font-size: 20px;
	cursor: pointer;
	${miniPhoneResponsive({
		fontSize: "16x",
	})}
	${mobile({
		fontSize: "16px",
	})}
`;

const NavRight = styled.div`
	display: flex;
	align-items: center;
	font-weight: 300;
	${nestHubResponsive({
		marginRight: "24px",
	})}
	${mobile({
		marginRight: "60px",
	})}
`;

const Register = styled.span`
	cursor: pointer;
	${mobile({
		fontSize: "15px",
	})}
`;

const Login = styled.span`
	margin: 0px 16px;
	cursor: pointer;
	${nestHubResponsive({
		margin: "10px",
	})}
	${mobile({
		fontSize: "15px",
	})}
`;

const Logout = styled.span`
	margin-right: 12px;
	cursor: pointer;
	${mobile({
		fontSize: "15px",
	})}
`;

const ProfileContainer = styled.div`
	position: relative;
	margin-right: 16px;
`;

const Image = styled.img`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	object-fit: cover;
	cursor: pointer;
`;
const OnlineLogo = styled.span`
	position: absolute;
	top: 20px;
	right: -5px;
	height: 6px;
	width: 6px;
	border-radius: 50%;
	background-color: teal;
	border: 2px solid white;
`;

const CartContainer = styled.span`
	position: relative;
	cursor: pointer;
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

const Navbar = ({ user }) => {
	const [search, setSearch] = useState("");

	const dispatch = useDispatch();
	const history = useHistory();

	const product = useSelector((state) => state.product);
	const { products } = product;

	const cart = useSelector((state) => state.cart);
	const { quantity } = cart;

	const handleLogout = () => {
		dispatch(resetOrder());
		dispatch(clearCart());
		dispatch(userprofileReset());
		dispatch(myOrderReset());
		dispatch(resetShippingAddress());
		dispatch(logout());

		history.push("/login");
	};

	return (
		<>
			<Announcement />
			<NavContainer>
				<NavWrapper>
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
													{product.name}
												</Link>
												<hr />
											</SearchListItem>
										))}
								</SearchList>
							</Search>
						)}
					</NavLeft>
					<Link to="/">
						<NavCenter>SHOPARENA</NavCenter>
					</Link>
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
										<Image src="/assets/image6.jpg" alt="" />
										<OnlineLogo></OnlineLogo>
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
