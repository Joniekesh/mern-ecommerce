import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

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
	transition: all 0.6 ease;
	margin-right: 8px;
	&:hover {
		transform: scale(1.07);
	}
`;

const Register = () => {
	return (
		<>
			<Navbar />
			<Container>
				<RegisterContainer>
					<Top>
						<Logo>REGISTER</Logo>
						<Desc>Please register to have unlimited access to the site</Desc>
					</Top>
					<Bottom>
						<Form>
							<FormGroup>
								<Label>Name</Label>
								<Input type="text" placeholder="Name" />
							</FormGroup>
							<FormGroup>
								<Label>Email</Label>
								<Input type="text" placeholder="Email" />
							</FormGroup>
							<FormGroup>
								<Label>Password</Label>
								<Input type="password" placeholder="Password" />
							</FormGroup>
							<FormGroup>
								<Label>Confirm Password</Label>
								<Input type="password" placeholder="Confirm Password" />
							</FormGroup>
							<Button>REGISTER</Button>
							Already have an account? <Link to="/login">Login</Link>
						</Form>
					</Bottom>
				</RegisterContainer>
			</Container>
		</>
	);
};

export default Register;
