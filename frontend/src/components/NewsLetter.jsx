import styled from "styled-components";
import { useState } from "react";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

const Container = styled.div`
	margin: 20px 0px;
	background-color: #eceef0;
	padding: 40px;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Text = styled.h1`
	font-size: 60px;
`;

const Desc = styled.span`
	font-size: 24px;
	margin: 10px 0px 20px;
`;

const InputContainer = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 55%;
	margin-top: 20px;
	border-radius: 5px;
`;

const InputDiv = styled.div`
	display: flex;
	margin-bottom: "5px";
`;

const Input = styled.input`
	flex: 8;
	padding: 10px;
	font-size: 18px;
	/* border: none; */
	outline: none;
`;

const Button = styled.button`
	flex: 1;
	border: none;
	padding: 11px;
	background-color: #08173b;
	color: white;
	height: fit-content;
	cursor: pointer;
	font-size: 16px;
	&:hover {
		opacity: 0.8;
	}
`;

const NewsLetter = () => {
	const formRef = useRef();
	const [done, setDone] = useState(false);

	const SERVICE = process.env.REACT_APP_EMAILJS_SERVICE_KEY;

	const TEMPLATE = process.env.REACT_APP_EMAILJS_TEMPLATE_KEY;
	const USER = process.env.REACT_APP_EMAILJS_USER_ID;

	const onSubmitHandler = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				"service_dyhz7at",
				"template_ws07cum",
				formRef.current,
				"8eM_QdyapZvV9qn2M"
			)
			.then(
				(result) => {
					console.log(result.text);
					setDone(true);
				},
				(error) => {
					console.log(error.text);
				}
			);
	};

	return (
		<Container>
			<Text>Newsletter</Text>
			<Desc>Subscribe to our news letter to get latest deals and arrivals</Desc>
			<InputContainer ref={formRef} onSubmit={onSubmitHandler}>
				<InputDiv>
					<Input placeholder="Enter Your Email" name="user_email" />
					<Button type="submit">Subscribe</Button>
				</InputDiv>
				{done && (
					<span style={{ color: "green" }}>
						Email received.You will always be updated on any trending deals.
						<br />
						Thank You!
					</span>
				)}
			</InputContainer>
		</Container>
	);
};

export default NewsLetter;
