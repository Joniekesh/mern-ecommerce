import styled from "styled-components";
import { Link } from "react-router-dom";

const CheckoutStepsContainer = styled.div`
	margin: 16px 0;
`;
const CheckoutList = styled.ul`
	display: flex;
	align-items: center;
	justify-content: center;
`;
const CheckoutListItem = styled.li`
	margin-right: 16px;
	background-color: teal;
	color: white;
	padding: 8px;
	border-radius: 5px;
	&:disabled {
		cursor: not-allowed;
		opacity: 0.8;
	}
`;

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
	return (
		<CheckoutStepsContainer>
			<CheckoutList>
				<CheckoutListItem>
					{step1 ? (
						<Link to="/login">Login</Link>
					) : (
						<Link disabled to="/login">
							Login
						</Link>
					)}
				</CheckoutListItem>
				<CheckoutListItem>
					{step2 ? (
						<Link to="/shipping">Shipping</Link>
					) : (
						<Link disabled to="/shipping">
							Shipping
						</Link>
					)}
				</CheckoutListItem>
				<CheckoutListItem>
					{step3 ? (
						<Link to="/payment">Payment</Link>
					) : (
						<Link disabled to="/payment">
							Payment
						</Link>
					)}
				</CheckoutListItem>
				<CheckoutListItem>
					{step4 ? (
						<Link to="/placeorder">Placeorder</Link>
					) : (
						<Link disabled to="/placeorder">
							Placeorder
						</Link>
					)}
				</CheckoutListItem>
			</CheckoutList>
		</CheckoutStepsContainer>
	);
};

export default CheckoutSteps;
