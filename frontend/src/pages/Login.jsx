import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/apiCalls/userApiCalls";
import { useState } from "react";

const Container = styled.div`
	height: 100vh;
	margin: auto;
	margin-top: 5rem;
	padding: 2rem;
`;

const RegisterContainer = styled.div`
	background-color: white;
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: auto;
	width: 50vw;
	height: 50vh;
	border-radius: 5px;
`;

const Top = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	margin-bottom: 10px;
`;

const Logo = styled.span`
	font-weight: 500;
	font-size: 20px;
	margin-bottom: 8px;
`;

const Desc = styled.p``;

const Bottom = styled.div``;

const Form = styled.form``;

const FormGroup = styled.div`
	margin-bottom: 16px;
	width: 100%;
`;

const Label = styled.label`
	display: block;
	font-weight: 500;
	font-size: 18px;
	margin-bottom: 4px;
`;

const Input = styled.input`
	width: 90%;
	padding: 8px;
	font-size: 16px;
`;

const Button = styled.button`
	width: 100px;
	border: none;
	padding: 10px;
	cursor: pointer;
	background-color: #05055f;
	color: white;
	transition: all 0.5s ease;
	margin-right: 8px;
	&:hover {
		transform: scale(1.07);
	}
`;

const Login = () => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(loginUser({ email, password }));
	};

	return (
		<>
			<Container>
				<RegisterContainer>
					<Top>
						<Logo>LOGIN</Logo>
						<Desc>Please login to have unlimited access to the site</Desc>
					</Top>
					<Bottom>
						<Form onSubmit={submitHandler}>
							<FormGroup>
								<Label>Email</Label>
								<Input
									type="text"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Password</Label>
								<Input
									type="password"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</FormGroup>
							<Button>LOGIN</Button>
							Don't have an account? <Link to="/register">Register</Link>
						</Form>
					</Bottom>
				</RegisterContainer>
			</Container>
		</>
	);
};

export default Login;
