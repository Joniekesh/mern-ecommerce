import styled from "styled-components";
import CartListItem from "../components/CartListItem";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteCart } from "../redux/apiCalls/cartApiCalls";
import { ipadMiniResponsive, mobile } from "../responsive";
import { resetOrder } from "../redux/reducers/orderRedux";
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
	${ipadMiniResponsive({
		fontSize: "24px",
	})}
`;

const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: 500;
	margin: 20px 0px;
	border-bottom: 1px solid #ddd;
	${mobile({
		margin: "10px 0px",
	})}
`;

const TopButton = styled.button`
	padding: 10px;
	font-weight: 600;
	border: ${(props) => props.type === "filled" && "none"};
	background-color: ${(props) =>
		props.type === "filled" ? "black" : "transparent"};
	color: ${(props) => props.type === "filled" && "white"};
	cursor: pointer;
	${mobile({
		padding: "8px",
		fontWeight: "500",
	})}
`;

const TopTexts = styled.div`
	display: flex;
	${mobile({
		display: "none",
	})}
`;

const TopText = styled.span`
	margin-right: 10px;
	border-bottom: 2px solid #05055f;
	cursor: pointer;
`;

const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
	${ipadMiniResponsive({
		flexDirection: "column",
	})}
`;

const ProductDetails = styled.div`
	width: 75%;
	height: fit-content;
	padding: 10px;
	display: flex;
	flex-direction: column;
	${ipadMiniResponsive({
		width: "100%",
	})}
	${mobile({
		width: "100%",
	})}
`;

const CartSummary = styled.div`
	width: 25%;
	height: max-content;
	display: flex;
	flex-direction: column;
	border: 1px solid #ddd;
	padding: 12px;
	border-radius: 5px;
	${ipadMiniResponsive({
		width: "50%",
		margin: "auto",
	})}
	${mobile({
		width: "90%",
	})}
`;

const SummaryContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const SummaryTitle = styled.span`
	font-size: 24px;
	font-weight: 500;
	text-align: center;
	${ipadMiniResponsive({
		fontSize: "18px",
	})}
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
	background-color: #08173b;
	color: white;
	padding: 10px;
	border: none;
	cursor: pointer;
	font-weight: 500;
	transition: all 0.4s ease;
	border-radius: 5px;
	&:hover {
		transform: scale(1.07);
	}
`;

const Button = styled.button`
	border: none;
	padding: 8px;
	background-color: crimson;
	color: white;
	cursor: pointer;
	margin-top: 20px;
	transition: all 0.4s ease;

	&:hover {
		transform: scale(1.07);
	}
`;

const Cart = () => {
	const cart = useSelector((state) => state.cart);
	const { quantity, products } = cart;

	const user = useSelector((state) => state.user);
	const { currentUser } = user;
	console.log(currentUser);

	const dispatch = useDispatch();
	const history = useHistory();

	const checkOutHandler = () => {
		if (currentUser) {
			history.push("/shipping");
		} else {
			history.push("/login");
		}
	};

	const handleClick = () => {
		dispatch(deleteCart());
		dispatch(resetOrder());
	};

	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	const shippingPrice = addDecimals(cart.total > 100 ? 0 : 100);
	const taxPrice = addDecimals(Number(0.01 * cart.total));
	const totalSum =
		Number(cart.total) + Number(shippingPrice) + Number(taxPrice);
	return (
		<div>
			<Container>
				<CartContainer>
					<Title>YOUR BAG</Title>
					<Top>
						<Link to="/">
							<TopButton>CONTINUE SHOPPING</TopButton>
						</Link>
						<TopTexts>
							<TopText>Shopping Bag ({quantity})</TopText>
							<TopText>Your Wishlist (0)</TopText>
						</TopTexts>
						<TopButton type="filled">CHECKOUT NOW</TopButton>
					</Top>
					<Bottom>
						<ProductDetails>
							{products.map((product) => (
								<CartListItem product={product} key={product._id} />
							))}
						</ProductDetails>
						{products.length > 0 && (
							<CartSummary>
								<SummaryTitle>SUMMARY</SummaryTitle>
								<Hr />
								<SummaryContainer>
									<SummaryDetails>
										<SummaryDetail>Subtotal</SummaryDetail>
										<SummaryPrice>$ {addDecimals(cart.total)}</SummaryPrice>
									</SummaryDetails>
									<SummaryDetails>
										<SummaryDetail>Shipping Price</SummaryDetail>
										<SummaryPrice>$ {shippingPrice}</SummaryPrice>
									</SummaryDetails>
									<SummaryDetails>
										<SummaryDetail>Tax price</SummaryDetail>
										<SummaryPrice>$ {taxPrice}</SummaryPrice>
									</SummaryDetails>
									<Hr />
									<SummaryDetails>
										<SummaryDetail>Total</SummaryDetail>
										<SummaryPrice>$ {addDecimals(totalSum)}</SummaryPrice>
									</SummaryDetails>
									<SummaryCheckoutButton onClick={checkOutHandler}>
										CHECKOUT NOW
									</SummaryCheckoutButton>
									<Button onClick={handleClick}>CLEAR CART</Button>
								</SummaryContainer>
							</CartSummary>
						)}
					</Bottom>
				</CartContainer>
			</Container>
			<NewsLetter />
			<Footer />
		</div>
	);
};

export default Cart;
