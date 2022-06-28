import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import CheckoutSteps from "../components/CheckoutSteps";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";
import { toast } from "react-toastify";
import { saveShippingAddress } from "../redux/apiCalls/shippinAddressActions";

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
const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
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

const Shipping = () => {
	const shipping = useSelector((state) => state.shipping);
	const { shippingAddress } = shipping;

	const [address, setAddress] = useState(shippingAddress?.address);
	const [phone, setPhone] = useState(shippingAddress?.phone);
	const [country, setCountry] = useState(shippingAddress?.country);
	const [city, setCity] = useState(shippingAddress?.city);
	const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);

	const history = useHistory();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);
	const { currentUser } = user;
	const userId = currentUser?._id;

	if (!userId) {
		history.push("/login");
	}

	const submitHandler = (e) => {
		e.preventDefault();
		if (!address || !phone || !country || !city || !postalCode) {
			toast.error("All fields must be filled", { theme: "colored" });
		} else {
			dispatch(
				saveShippingAddress({ address, phone, country, city, postalCode })
			);
			toast.success("Shipping address saved", { theme: "colored" });
			history.push("/payment");
		}
	};

	return (
		<>
			<Container>
				<CheckoutSteps step1 step2 />
				<Title>Shipping</Title>
				<Form>
					<FormGroup>
						<Label>Address</Label>
						<Input
							type="text"
							placeholder="Address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						></Input>
					</FormGroup>
					<FormGroup>
						<Label>Phone</Label>
						<Input
							type="number"
							placeholder="Phone"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						></Input>
					</FormGroup>
					<FormGroup>
						<Label>Country</Label>
						<Input
							type="text"
							placeholder="Country"
							value={country}
							onChange={(e) => setCountry(e.target.value)}
						></Input>
					</FormGroup>
					<FormGroup>
						<Label>City</Label>
						<Input
							type="text"
							placeholder="City"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						></Input>
					</FormGroup>
					<FormGroup>
						<Label>Postal Code</Label>
						<Input
							type="text"
							placeholder="Postal code"
							value={postalCode}
							onChange={(e) => setPostalCode(e.target.value)}
						></Input>
					</FormGroup>
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

export default Shipping;
