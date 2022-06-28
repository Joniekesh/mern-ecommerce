import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import CheckoutSteps from "../components/CheckoutSteps";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";
import { savePaymentMethod } from "../redux/apiCalls/paymentActions";

const Container = styled.div`
	max-width: 1200px;
	overflow: hidden;
	overflow-x: hidden;
	margin: auto;
	margin-top: 7rem;
	padding: 0 2rem;
	background-color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Title = styled.h1`
	color: #08173b;
`;

const Form = styled.form`
	width: 50%;
	display: flex;
	flex-direction: column;
	border: 1px solid #ddd;
	padding: 8px;
	margin: 10px 0;
	border-radius: 5px;
`;

const FormContainer = styled.div``;
const Title2 = styled.h3`
	text-align: center;
	margin: 10px 0;
	font-weight: 400;
`;

const FormGroup = styled.div`
	display: flex;
	align-items: center;
	margin: 10px 0;
`;

const Label = styled.label`
	display: block;
	margin-bottom: 5px;
	font-weight: 500;
	color: #08173b;
`;

const Input = styled.input`
	padding: 8px;
	width: 90%;
	font-size: 16px;
	border: none;
	border-bottom: 1px solid #08173b;
	&:focus {
		outline: none;
		border-bottom: 2px solid #08173b;
	}
`;

const Button = styled.button`
	align-self: left;
	padding: 8px;
	border: none;
	background-color: orange;
	color: white;
	cursor: pointer;
	font-size: 14px;
`;

const Payment = () => {
	const [paymentMethod, setPaymentMethod] = useState("PayPal");

	const history = useHistory();
	const dispatch = useDispatch();

	const shipping = useSelector((state) => state.shipping);
	const { shippingAddress } = shipping;

	if (!shippingAddress) {
		history.push("/shipping");
	}

	const user = useSelector((state) => state.user);
	const { currentUser } = user;
	const userId = currentUser._id;

	if (!userId) {
		history.push("/login");
	}

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(savePaymentMethod(paymentMethod));
		history.push("/placeorder");
	};

	return (
		<>
			<Container>
				<CheckoutSteps step1 step2 step3 />
				<Title>Payment</Title>
				<Form>
					<Title2>Please choose your payment method</Title2>
					<FormContainer>
						<FormGroup>
							<Label>PayPal or Credit Card</Label>
							<Input
								type="radio"
								name="paymentMethod"
								id="paypal"
								value={paymentMethod}
								onChange={(e) => setPaymentMethod(e.target.value)}
							></Input>
						</FormGroup>
						{/* <FormGroup>
						<Label>Stripe or Credit Card</Label>
						<Input
							type="radio"
							name="paymentMethod"
							id="stripe"
							value={stripe}
							onChange={(e) => setStripe(e.target.value)}
						></Input>
					</FormGroup> */}
					</FormContainer>
				</Form>
				<Button type="submit" onClick={submitHandler}>
					CONTINUE
				</Button>
			</Container>
			<NewsLetter />
			<Footer />
		</>
	);
};

export default Payment;
