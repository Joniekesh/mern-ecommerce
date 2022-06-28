import styled from "styled-components";
import { ipadAirResponsive800, mobile } from "../responsive";

const Container = styled.div`
	width: 100%;
	background-color: #cfcccc;
	height: 50vh;
	display: flex;
	justify-content: space-between;
	padding: 20px 20px 0px 20px;
	color: black;
	${mobile({
		flexDirection: "column",
		height: "65vh",
		padding: "8px",
	})}
`;

const Left = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 20px;
`;

const Logo = styled.h1`
	color: teal;
	${mobile({
		fontSize: "20px",
	})}
`;

const Desc = styled.p`
	margin: 20px 0px;
	${mobile({
		margin: "8px 0px",
	})}
`;

const SocialContainer = styled.div`
	display: flex;
`;

const SocialIcon = styled.div`
	background-color: #${(props) => props.color};
	width: 32px;
	color: white;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20px;
	cursor: pointer;
	${mobile({
		marginRight: "8px",
		width: "28px",
		height: "28px",
	})}
`;

const Center = styled.div`
	flex: 1;
	padding: 20px;
	${ipadAirResponsive800({
		display: "none",
	})}
`;

const Title = styled.h3`
	margin-bottom: 30px;
	color: teal;
`;

const List = styled.ul`
	margin: 0;
	padding: 0;
	list-style: none;
	display: flex;
	flex-wrap: wrap;
`;

const ListItem = styled.li`
	width: 50%;
	margin-bottom: 10px;
`;

const Right = styled.div`
	flex: 1;
	padding: 20px;
	${mobile({
		marginTop: "-70px",
	})}
`;

const PaymentMethod = styled.div`
	display: flex;
	align-items: center;
`;

const Image = styled.img`
	width: 50%;
	margin-left: 10px;
`;

const ContactItem = styled.div`
	margin-bottom: 20px;
	display: flex;
	align-items: center;
`;

const Footer = () => {
	return (
		<Container>
			<Left>
				<Logo>SHOPARENA</Logo>
				<Desc>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
					aspernatur dignissimos delectus a adipisci fuga autem provident, eum
					excepturi quibusdam dolor laborum et nemo officia natus magni nam
					neque distinctio.
				</Desc>
				<SocialContainer>
					<SocialIcon color="3B5999">
						<i className="fa-brands fa-facebook-f"></i>
					</SocialIcon>
					<SocialIcon color="E4405F">
						<i className="fa-brands fa-instagram"></i>
					</SocialIcon>
					<SocialIcon color="55ACEE">
						<i className="fa-brands fa-twitter"></i>
					</SocialIcon>
					<SocialIcon color="E60023">
						<i className="fa-brands fa-pinterest-p"></i>
					</SocialIcon>
				</SocialContainer>
			</Left>
			<Center>
				<Title>USEFUL LINKS</Title>
				<List>
					<ListItem>Man Fashion</ListItem>
					<ListItem>Woman Fashion</ListItem>
					<ListItem>Accessories</ListItem>
					<ListItem>My Account</ListItem>
					<ListItem>Order Tracking</ListItem>
					<ListItem>Wishlist</ListItem>
					<ListItem>Wishlist</ListItem>
					<ListItem>Terms</ListItem>
				</List>
			</Center>
			<Right>
				<Title>Contact</Title>
				<ContactItem>
					<i
						className="fa-solid fa-house"
						style={{ marginRight: "10px", color: "#08173b" }}
					></i>{" "}
					622 Dixie Path , South Tobinchester 98336
				</ContactItem>
				<ContactItem>
					<i
						className="fa-solid fa-phone"
						style={{ marginRight: "10px", color: "#08173b" }}
					></i>{" "}
					+1 234 56 78
				</ContactItem>
				<ContactItem>
					<i
						className="fa-solid fa-envelope"
						style={{ marginRight: "10px", color: "#08173b" }}
					></i>{" "}
					contact@john.dev
				</ContactItem>
				<PaymentMethod>
					<i
						className="fa-solid fa-money-check"
						style={{ marginRight: "10px", color: "#08173b" }}
					/>
					<Image src="https://i.ibb.co/Qfvn4z6/payment.png" />
				</PaymentMethod>
			</Right>
		</Container>
	);
};

export default Footer;
