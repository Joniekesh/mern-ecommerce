import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import SideBar from "../../components/admin/SideBar";
import { useEffect } from "react";
import {
  adminGetUserById,
  userUpdateByAdmin,
} from "../../redux/adminRedux/adminApiCalls";
import Loader from "../../components/Loader";
import { mobile } from "../../responsive";
import { adminUpdateUserReset } from "../../redux/adminRedux/adminUserRedux";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  margin: auto;
  margin-top: 8rem;
  display: flex;
  gap: 20px;
`;

const RightContainer = styled.div`
  flex: 10;
  overflow: hidden;
`;

const Title = styled.h2`
  color: teal;
  margin-bottom: 16px;
`;

const Form = styled.form`
  border: 1px solid #ddd;
  padding: 10px;
  width: 60%;
  background-color: white;
  height: 40vh;
  ${mobile({
    width: "300px",
  })}
`;

const FormGroup = styled.div`
  display: flex;
  margin: 30px 0;
  align-items: center;
`;

const Label = styled.span`
  color: #08173b;
  margin-right: 10px;
  font-size: 24px;
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

const SingleUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser.isAdmin) {
    toast.error("You are not authorized to access this route", {
      theme: "colored",
    });
    history.push("/");
  }

  const adminUser = useSelector((state) => state.adminUser);
  const { user, isLoading } = adminUser;

  const adminUpdateUser = useSelector((state) => state.adminUpdateUser);
  const { success } = adminUpdateUser;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const location = useLocation();
  const id = location.pathname.split("/")[3];

  useEffect(() => {
    if (success) {
      dispatch(adminUpdateUserReset());
      history.push("/admin/users");
    } else {
      if (!user?.name || user._id !== id) {
        dispatch(adminGetUserById(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [success, dispatch, history, user, id]);

  const updatedUser = {
    _id: id,
    name,
    email,
    isAdmin,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userUpdateByAdmin(id, updatedUser));
    toast.success("User successfully UPDATED.", {
      theme: "colored",
    });
    history.push("/admin/users");
    window.location.reload();
  };

  return (
    <Container>
      {/* <LeftContainer> */}
      <SideBar />
      {/* </LeftContainer> */}
      {isLoading ? (
        <Loader />
      ) : (
        <RightContainer>
          <Title>Edit User</Title>
          <Form onSubmit={submitHandler}>
            <FormGroup>
              <Label>
                <i className="fas fa-user"></i>
              </Label>
              <Input
                type="text"
                placeholder="Enter name"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>
                <i className="fas fa-envelope"></i>
              </Label>
              <Input
                type="email"
                placeholder="Enter email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>isAdmin</Label>
              <Input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Input>
            </FormGroup>
            <ButtonGroup>
              <GoBackBtn onClick={() => history.push("/admin/users")}>
                Go Back
              </GoBackBtn>
              <Button type="submit">Update</Button>
            </ButtonGroup>
          </Form>
        </RightContainer>
      )}
    </Container>
  );
};

export default SingleUser;
