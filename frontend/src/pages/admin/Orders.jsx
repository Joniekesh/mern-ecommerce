import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SideBar from "../../components/admin/SideBar";
import Loader from "../../components/Loader";
import { Table } from "antd";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  margin: auto;
  margin-top: 8rem;
  display: flex;
`;

const RightContainer = styled.div`
  padding: 10px;
  flex: 5;
  overflow-x: auto;
  height: fit-content;
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
      title: "TOTAL($)",
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
              color: "green",
            }}
          >
            PAID
          </span>
        ) : (
          <span
            style={{
              color: "crimson",
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
              color: "green",
            }}
          >
            DELIVERED
          </span>
        ) : (
          <span
            style={{
              color: "crimson",
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
      <SideBar />
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
