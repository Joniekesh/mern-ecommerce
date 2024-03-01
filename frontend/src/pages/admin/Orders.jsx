import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SideBar from "../../components/admin/SideBar";
import Loader from "../../components/Loader";
import { Table } from "antd";

const Container = styled.div`
  max-width: 1200px;
  overflow: hidden;
  margin: auto;
  margin-top: 7rem;
  padding: 0 2rem;
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
  overflow-x: auto;
  margin-left: 205px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  background-color: white;
  padding: 10px;
`;

const Error = styled.p`
  color: red;
`;

const Top = styled.div`
  margin-bottom: 10px;
  position: relative;
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

const Orders = () => {
  const history = useHistory();

  const user = useSelector((state) => state.user.currentUser);

  const adminOrder = useSelector((state) => state.adminOrder);
  const { orders, isLoading, error } = adminOrder;

  const filteredOrders = orders.map((order) => {
    return {
      _id: order._id,
      name: order.user.name,
      email: order.user.email,
      createdAt: order.createdAt,
      totalPrice: order.totalPrice,
      isPaid: order.isPaid,
      isDelivered: order.isDelivered,
    };
  });

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
      render: (text) => <span>{text.slice(0, 10)}...</span>,
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
      title: "DATE",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <span>{new Date(text).toDateString()}</span>,
    },
    {
      title: "TOTAL",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "PAID",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (_, record) =>
        record.isPaid ? (
          <span
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "6px",
              borderRadius: "4px",
            }}
          >
            PAID
          </span>
        ) : (
          <span
            style={{
              backgroundColor: "crimson",
              color: "white",
              padding: "6px",
              borderRadius: "4px",
            }}
          >
            NOT PAID
          </span>
        ),
    },
    {
      title: "DELIVERED",
      dataIndex: "isDelivered",
      key: "isDelivered",
      render: (_, record) =>
        record.isDelivered ? (
          <span
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "6px",
              borderRadius: "4px",
            }}
          >
            DELIVERED
          </span>
        ) : (
          <span
            style={{
              backgroundColor: "crimson",
              color: "white",
              padding: "6px",
              borderRadius: "4px",
            }}
          >
            NOT DELIVERED
          </span>
        ),
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      render: (_, record) => <Link to={`/order/${record._id}`}>View</Link>,
    },
  ];

  return (
    <Container>
      <LeftContainer>
        <SideBar />
      </LeftContainer>
      <RightContainer>
        {error && <Error>{error}</Error>}
        <Top>
          <TitleContainer>
            <Icon>
              <i className="fas fa-shopping-cart"></i>
            </Icon>
            <Title>ORDERS</Title>
          </TitleContainer>
        </Top>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {orders.length === 0 ? (
              <h4>No order to show</h4>
            ) : (
              <Table dataSource={filteredOrders} columns={columns} />
            )}
          </>
        )}
      </RightContainer>
    </Container>
  );
};

export default Orders;
