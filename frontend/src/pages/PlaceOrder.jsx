import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import CheckoutSteps from "../components/CheckoutSteps";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";
import { createOrder } from "../redux/apiCalls/orderApiCalls";
import { toast } from "react-toastify";
import { mobile } from "../responsive";

const Container = styled.div`
	max-width: 1200px;
	overflow: hidden;
	overflow-x: hidden;
	margin: auto;
	margin-top: 7rem;
	padding: 0 2rem;
	background-color: white;
`;

const PlaceOrderContainer = styled.div`
	display: flex;
	${mobile({
		flexDirection: "column",
	})}
`;

const Left = styled.div`
	flex: 8;
`;

const LeftTop = styled.div`
	background-color: #fff;
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	padding: 10px;
	border-radius: 8px;
`;

const TitleEdit = styled.div`
	display: flex;
	justify-content: space-between;
`;
const Icon = styled.span`
	color: #08173b;
	font-size: 18px;
	cursor: pointer;
`;

const LeftCenter = styled.div`
	background-color: #fff;
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	padding: 10px;
	border-radius: 8px;
	margin: 10px 0;
`;

const Title = styled.h2`
	margin-bottom: 16px;
	color: #08173b;
`;

const InfoContainer = styled.div`
	display: flex;
	margin: 8px 0;
`;

const Address = styled.p`
	margin-right: 16px;
`;

const AddressValue = styled.p``;

const LeftBottom = styled.div`
	background-color: #fff;
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	padding: 10px;
	border-radius: 8px;
	margin: 10px 0;
`;

const Message = styled.p``;

const OrderList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const OrderListItem = styled.li`
	display: flex;
	align-items: center;
	border-bottom: 1px solid #ddd;
`;

const Image = styled.img`
	width: 200px;
	height: 150px;
	margin-right: 10px;
`;

const Name = styled.h3`
	margin-right: 16px;
	width: 40%;
`;

const ProductInfo = styled.p``;

const CartSummary = styled.div`
	flex: 4;
	height: max-content;
	display: flex;
	flex-direction: column;
	background-color: #fff;
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	padding: 10px;
	border-radius: 8px;
	margin: 10px 0;
	margin-left: 10px;
`;

const SummaryContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const SummaryTitle = styled.span`
	font-size: 24px;
	font-weight: 500;
	color: teal;
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
	background-color: #08173b;
	color: white;
	padding: 10px;
	border: none;
	cursor: pointer;
	font-weight: 500;
	transition: all 0.4s ease;
	border-radius: 5px;
	&:hover {
		transform: scale(1.06);
	}
`;

const PlaceOrder = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);
	const { currentUser } = user;
	const userId = currentUser._id;

	if (!userId) {
		history.push("/login");
	}

	const cart = useSelector((state) => state.cart);
	const { products } = cart;

	const shipping = useSelector((state) => state.shipping);
	const { shippingAddress } = shipping;

	const payment = useSelector((state) => state.payment);
	const { paymentMethod } = payment;

	if (!shippingAddress) {
		history.push("/shipping");
	} else if (!paymentMethod) {
		history.push("/payment");
	}

	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	const shippingPrice = addDecimals(cart.total > 100 ? 0 : 100);
	const taxPrice = addDecimals(0.01 * cart.total);
	const totalSum = addDecimals(
		Number(cart.total) + Number(shippingPrice) + Number(taxPrice)
	);

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				user: userId,
				orderItems: products.map((item) => ({
					product: item._id,
					name: item.name,
					qty: item.quantity,
					image: item.image,
					price: item.price,
				})),
				shippingAddress,
				paymentMethod,
				itemsPrice: cart.total,
				shippingPrice,
				taxPrice,
				totalPrice: totalSum,
			})
		);

		history.push("/profile");
		toast.success("Order Created.You can proceed to make payment", {
			theme: "colored",
		});
	};
	// eslint-disable-next-line

	return (
		<>
			<Container>
				<CheckoutSteps step1 step2 step3 step4 />
				<PlaceOrderContainer>
					<Left>
						<LeftTop>
							<TitleEdit>
								<Title>Shipping</Title>
								<Icon onClick={() => history.push("/shipping")}>
									<i className="fa-solid fa-pen"></i>
								</Icon>
							</TitleEdit>
							<InfoContainer>
								<Address>
									<strong>Address:</strong>
								</Address>
								<AddressValue>{shippingAddress.address}</AddressValue>
							</InfoContainer>
							<InfoContainer>
								<Address>
									<strong>City:</strong>
								</Address>
								<AddressValue>{shippingAddress.city}</AddressValue>
							</InfoContainer>
							<InfoContainer>
								<Address>
									<strong>Country:</strong>
								</Address>
								<AddressValue>{shippingAddress.country}</AddressValue>
							</InfoContainer>
							<InfoContainer>
								<Address>
									<strong>Phone:</strong>
								</Address>
								<AddressValue>{shippingAddress.phone}</AddressValue>
							</InfoContainer>
							<InfoContainer>
								<Address>
									<strong>Postal Code:</strong>
								</Address>
								<AddressValue>{shippingAddress.postalCode}</AddressValue>
							</InfoContainer>
						</LeftTop>
						<LeftCenter>
							<Title>Payment Method</Title>
							<InfoContainer>
								<Address>
									<strong>Method:</strong>
								</Address>
								<AddressValue>{paymentMethod}</AddressValue>
							</InfoContainer>
						</LeftCenter>
						<LeftBottom>
							<Title>Order Items</Title>
							{products.length === 0 ? (
								<Message>Your Cart is empty</Message>
							) : (
								<OrderList>
									{products.map((product) => (
										<OrderListItem>
											<Image src={product.image} />
											<Name>
												<Link to={`/products/${product._id}`}>
													{product.name}
												</Link>
											</Name>
											<ProductInfo>
												{product.quantity} X ${product.price} ={" "}
												<strong>
													${addDecimals(product.quantity * product.price)}
												</strong>
											</ProductInfo>
										</OrderListItem>
									))}
								</OrderList>
							)}
						</LeftBottom>
					</Left>
					<CartSummary>
						<SummaryTitle>ORDER SUMMARY</SummaryTitle>
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
							<SummaryDetails
								style={{
									fontWeight: "500",
									fontSize: "20px",
								}}
							>
								<SummaryDetail>Total</SummaryDetail>
								<SummaryPrice style={{ color: "teal" }}>
									$ {addDecimals(totalSum)}
								</SummaryPrice>
							</SummaryDetails>
							<SummaryCheckoutButton
								type="button"
								disabled={products.length === 0}
								onClick={placeOrderHandler}
							>
								PLACE ORDER
							</SummaryCheckoutButton>
						</SummaryContainer>
					</CartSummary>
				</PlaceOrderContainer>
			</Container>
			<NewsLetter />
			<Footer />
		</>
	);
};

export default PlaceOrder;
