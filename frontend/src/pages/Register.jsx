import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/apiCalls/userApiCalls";

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
	height: 70vh;
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

const Register = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match");
		}

		dispatch(registerUser({ name, email, password }));

		history.push("/");
	};
	return (
		<>
			<Container>
				<RegisterContainer>
					<Top>
						<Logo>REGISTER</Logo>
						<Desc>Please register to have unlimited access to the site</Desc>
					</Top>
					<Bottom>
						<Form onSubmit={handleSubmit}>
							<FormGroup>
								<Label>Name</Label>
								<Input
									type="text"
									placeholder="Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</FormGroup>
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
							<FormGroup>
								<Label>Confirm Password</Label>
								<Input
									type="password"
									placeholder="Confirm Password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							</FormGroup>
							<Button type="submit">REGISTER</Button>
							Already have an account? <Link to="/login">Login</Link>
						</Form>
					</Bottom>
				</RegisterContainer>
			</Container>
		</>
	);
};

export default Register;
