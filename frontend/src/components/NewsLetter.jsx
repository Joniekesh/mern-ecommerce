import styled from "styled-components";

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

const InputContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 55%;
	margin-top: 20px;
	border-radius: 5px;
`;

const Input = styled.input`
	flex: 8;
	padding: 10px;
	font-size: 18px;
	border: none;
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
	return (
		<Container>
			<Text>Newsletter</Text>
			<Desc>Subscribe to our news letter to get latest deals and arrivals</Desc>
			<InputContainer>
				<Input placeholder="Enter Your Email" />
				<Button>Subscribe</Button>
			</InputContainer>
		</Container>
	);
};

export default NewsLetter;
