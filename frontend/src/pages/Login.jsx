import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/apiCalls/userApiCalls";
import { useState } from "react";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({
    backgroundColor: "white",
  })}
`;

const RegisterContainer = styled.div`
  background-color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  justify-content: center;
  height: max-content;
  border-radius: 5px;
  margin-top: 50px;
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
  margin: 16px 0;
  width: 100%;
  ${mobile({
    margin: "30px 0",
  })}
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
  background-color: #08173b;
  color: white;
  transition: all 0.5s ease;
  margin-right: 8px;
  &:hover {
    transform: scale(1.07);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const verified = password !== "" || email !== "";

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }));
  };

  return (
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
            <Button disabled={!verified}>LOGIN</Button>
            Don't have an account? <Link to="/register">Register</Link>
          </Form>
        </Bottom>
      </RegisterContainer>
    </Container>
  );
};

export default Login;
