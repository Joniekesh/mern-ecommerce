import styled from "styled-components";
import CartListItem from "../components/CartListItem";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import { Link } from "react-router-dom";

const Container = styled.div`
	max-width: 1200px;
	background-color: white;
	overflow: hidden;
	overflow-x: hidden;
	margin: auto;
	margin-top: 7rem;
	padding: 2rem;
`;

const CartContainer = styled.div``;

const Title = styled.h1`
	text-align: center;
	font-weight: 400;
`;

const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: 500;
	margin: 20px 0px;
	border-bottom: 1px solid #ddd;
`;

const TopButton = styled.button`
	padding: 10px;
	font-weight: 600;
	border: ${(props) => props.type === "filled" && "none"};
	background-color: ${(props) =>
		props.type === "filled" ? "black" : "transparent"};
	color: ${(props) => props.type === "filled" && "white"};
	cursor: pointer;
`;

const TopTexts = styled.div`
	display: flex;
`;

const TopText = styled.span`
	margin-right: 10px;
	border-bottom: 2px solid #05055f;
	cursor: pointer;
`;

const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ProductDetails = styled.div`
	width: 75%;
	height: fit-content;
	padding: 10px;
	display: flex;
	flex-direction: column;
`;

const CartSummary = styled.div`
	width: 25%;
	height: max-content;
	display: flex;
	flex-direction: column;
	border: 1px solid #ddd;
	padding: 12px;
	border-radius: 5px;
`;

const SummaryContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const SummaryTitle = styled.span`
	font-size: 24px;
	font-weight: 500;
	text-align: center;
`;

const SummaryDetails = styled.div`
	display: flex;
	justify-content: space-between;
`;

const SummaryDetail = styled.div`
	margin-bottom: 16px;
	font-size: 18px;
`;

const SummaryPrice = styled.span`
	font-weight: 500;
`;

const Hr = styled.hr`
	font-size: 1px;
	color: #ddd;
	margin-bottom: 5px;
`;

const SummaryCheckoutButton = styled.button`
	background-color: #05055f;
	color: white;
	padding: 10px;
	border: none;
	cursor: pointer;
	font-weight: 500;
	transition: all 0.4s ease;
	&:hover {
		transform: scale(1.07);
	}
`;

const Cart = () => {
	return (
		<div>
			<Navbar />
			<Container>
				<CartContainer>
					<Title>YOUR BAG</Title>
					<Top>
						<Link to="/">
							<TopButton>CONTINUE SHOPPING</TopButton>
						</Link>
						<TopTexts>
							<TopText>Shopping Bag (2)</TopText>
							<TopText>Your Wishlist (0)</TopText>
						</TopTexts>
						<TopButton type="filled">CHECKOUT NOW</TopButton>
					</Top>
					<Bottom>
						<ProductDetails>
							<CartListItem />
							<CartListItem />
							<CartListItem />
							<CartListItem />
							<CartListItem />
							<CartListItem />
						</ProductDetails>
						<CartSummary>
							<SummaryTitle>SUMMARY</SummaryTitle>
							<Hr />
							<SummaryContainer>
								<SummaryDetails>
									<SummaryDetail>Subtotal</SummaryDetail>
									<SummaryPrice>$ 80.00</SummaryPrice>
								</SummaryDetails>
								<SummaryDetails>
									<SummaryDetail>Estimated Shipping</SummaryDetail>
									<SummaryPrice>$ 5.99</SummaryPrice>
								</SummaryDetails>
								<SummaryDetails>
									<SummaryDetail>Shipping Discount</SummaryDetail>
									<SummaryPrice>$ -5.99</SummaryPrice>
								</SummaryDetails>
								<Hr />
								<SummaryDetails>
									<SummaryDetail>Total</SummaryDetail>
									<SummaryPrice>$ 80.00</SummaryPrice>
								</SummaryDetails>
								<SummaryCheckoutButton>CHECKOUT NOW</SummaryCheckoutButton>
							</SummaryContainer>
						</CartSummary>
					</Bottom>
				</CartContainer>
			</Container>
			<NewsLetter />
			<Footer />
		</div>
	);
};

export default Cart;
