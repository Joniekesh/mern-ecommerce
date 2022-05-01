import styled from "styled-components";
import Announcement from "./Announcement";
import { Link } from "react-router-dom";

const NavContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto;
	width: 100%;
	height: 50px;
	padding: 10px 20px;
	background-color: #05055f;
	position: fixed;
	top: 30px;
	z-index: 3;
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
`;

const Lang = styled.p`
	margin-right: 8px;
`;

const SearchContainer = styled.div`
	display: flex;
	align-items: center;
	background-color: white;
	padding: 10px;
	border-radius: 5px;
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
`;

const NavCenter = styled.div`
	font-size: 20px;
	cursor: pointer;
`;

const NavRight = styled.div`
	display: flex;
	align-items: center;
	font-weight: 300;
`;

const Register = styled.span`
	cursor: pointer;
`;

const Login = styled.span`
	margin: 0px 16px;
	cursor: pointer;
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
	background-color: red;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

const Navbar = ({ user }) => {
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
							<SearchInput placeholder="Search for products and categories" />
						</SearchContainer>
					</NavLeft>
					<Link to="/">
						<NavCenter>SHOPARENA</NavCenter>
					</Link>
					<NavRight>
						<Link to="/register">
							<Register>REGISTER</Register>
						</Link>
						<Link to="/login">
							<Login>LOGIN</Login>
						</Link>
						{user && (
							<ProfileContainer>
								<Link to="/profile">
									<Image src="/assets/image6.jpg" alt="" />
									<OnlineLogo></OnlineLogo>
								</Link>
							</ProfileContainer>
						)}

						<CartContainer>
							<Link to="/cart">
								<CartLogo>
									<i className="fa-solid fa-cart-shopping"></i>
								</CartLogo>
								<CartCount>5</CartCount>
							</Link>
						</CartContainer>
					</NavRight>
				</NavWrapper>
			</NavContainer>
		</>
	);
};

export default Navbar;
