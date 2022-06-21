import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SideBar from "../../components/admin/SideBar";
import { toast } from "react-toastify";
import { useState } from "react";
import { adminCreateUser } from "../../redux/adminRedux/adminApiCalls";

const Container = styled.div`
	max-width: 1200px;
	overflow: hidden;
	margin: auto;
	margin-top: 8rem;
	padding: 0 4rem;
`;

const LeftContainer = styled.div`
	flex: 1.5;
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	background-color: white;
	padding: 10px;
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	z-index: 10;
	overflow: hidden;
`;

const RightContainer = styled.div`
	flex: 10;
	width: 320px;
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	background-color: white;
	padding: 10px;
	margin-left: 170px;
	border-radius: 5px;
`;

const Title = styled.h2`
	color: teal;
	margin-bottom: 16px;
`;

const Form = styled.form`
	border: 1px solid #ddd;
	padding: 10px;
	width: 90%;
	background-color: white;
`;

const FormGroup = styled.div`
	display: flex;
	margin: 30px 0;
	align-items: center;
`;

const Label = styled.span`
	color: #08173b;
	margin-right: 10px;
	font-size: 16px;
	font-weight: 500;
`;

const Input = styled.input`
	width: 100%;
	border: none;
	border-bottom: 1px solid #08173b;
	background-color: inherit;
	font-size: 16px;
	&:focus {
		outline: none;
		border-bottom: 2px solid #08173b;
	}
`;

const ButtonGroup = styled.div`
	display: flex;
	justify-content: space-between;
`;
const GoBackBtn = styled.button`
	cursor: pointer;
	border: none;
	padding: 8px 10px;
	font-weight: 500;
`;

const Button = styled.button`
	cursor: pointer;
	border: none;
	padding: 8px 10px;
	background-color: #08173b;
	color: white;
	font-weight: 500;
`;

const CreateUser = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	const history = useHistory();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user.currentUser.user);

	if (!user.isAdmin) {
		toast.error("You are not authorized to access this route", {
			theme: "colored",
		});
		history.push("/");
	}

	const submitHandler = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match", { theme: "colored" });
		} else if (!name || !email || !password) {
			toast.error("Name, Email and Password MUST be filled", {
				theme: "colored",
			});
		} else {
			dispatch(
				adminCreateUser({ name, email, phoneNumber, password, isAdmin })
			);
			toast.success("User Created", { theme: "colored" });
			history.push("/admin/users");
		}
	};

	return (
		<Container>
			<LeftContainer>
				<SideBar />
			</LeftContainer>
			<RightContainer>
				<Title>Create User</Title>
				<Form>
					<FormGroup>
						<Label>Name</Label>
						<Input
							type="text"
							placeholder="Enter name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Email</Label>
						<Input
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Phone Number</Label>
						<Input
							type="number"
							placeholder="Enter Phone number"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Password</Label>
						<Input
							type="password"
							placeholder="Enter password"
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
					<FormGroup>
						<Label>isAdmin</Label>
						<Input
							type="checkbox"
							checked={isAdmin}
							onChange={(e) => setIsAdmin(e.target.checked)}
						/>
					</FormGroup>
					<ButtonGroup>
						<GoBackBtn onClick={() => history.push("/admin/users")}>
							Go Back
						</GoBackBtn>
						<Button type="submit" onClick={submitHandler}>
							Create
						</Button>
					</ButtonGroup>
				</Form>
			</RightContainer>
		</Container>
	);
};

export default CreateUser;
