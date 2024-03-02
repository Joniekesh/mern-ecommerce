import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import SideBar from "../../components/admin/SideBar";
import { useEffect } from "react";
import {
  adminGetAllUsers,
  adminDeleteUser,
} from "../../redux/adminRedux/adminApiCalls";
import Loader from "../../components/Loader";
import { Table } from "antd";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  margin: auto;
  margin-top: 8rem;
  display: flex;
`;

const Error = styled.p`
  color: red;
`;

const RightContainer = styled.div`
  padding: 10px;
  flex: 5;
  overflow-x: auto;
  height: fit-content;
`;

const Top = styled.div`
  margin-bottom: 10px;
  position: relative;
`;
const AddUser = styled.button`
  padding: 6px;
  font-weight: 500;
  cursor: pointer;
  color: teal;
  position: absolute;
  top: 0px;
  right: 5px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  color: teal;
  font-weight: 500;
`;
const Icon = styled.span`
  margin-right: 10px;
  color: #0080807a;
  font-size: 24px;
`;

const Title = styled.h2``;

const Users = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);

  const adminUser = useSelector((state) => state.adminUser);
  const { users, isLoading, error } = adminUser;

  const filteredUsers = users.map((user) => {
    return {
      _id: user._id,
      name: user.name,
      email: user.name,
      createdAt: user.createdAt,
      isAdmin: user.isAdmin,
    };
  });

  useEffect(() => {
    dispatch(adminGetAllUsers());
  }, [dispatch]);

  if (!user.isAdmin) {
    toast.error("You are not authorized to access this route", {
      theme: "colored",
    });
    history.push("/");
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <span>{new Date(text).toDateString()}</span>,
    },
    {
      title: "ADMIN",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (_, record) => (
        <b>
          {record.isAdmin && (
            <i
              className="fas fa-check"
              style={{ color: "green", fontSize: "20px" }}
            ></i>
          )}
        </b>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <button
            style={{
              padding: "5px",
              cursor: "pointer",
              color: "green",
              background: "#00800078",
              border: "none",
            }}
          >
            <Link to={`/admin/users/${record._id}`}>View</Link>
          </button>
          <button
            style={{
              padding: "5px",
              cursor: "pointer",
              color: "crimson",
              background: "#dc143c7b",
              border: "none",
            }}
            onClick={() => dispatch(adminDeleteUser(record._id))}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <Container>
      <SideBar />
      <RightContainer>
        {error && <Error>{error}</Error>}
        <Top>
          <TitleContainer>
            <Icon>
              <i className="fas fa-users"></i>
            </Icon>
            <Title>USERS</Title>
          </TitleContainer>
          <Link to="/admin/createUser">
            <AddUser>+ CREATE</AddUser>
          </Link>
        </Top>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {users.length === 0 ? (
              <h4>No user to show</h4>
            ) : (
              <Table dataSource={filteredUsers} columns={columns} />
            )}
          </>
        )}
      </RightContainer>
    </Container>
  );
};

export default Users;
