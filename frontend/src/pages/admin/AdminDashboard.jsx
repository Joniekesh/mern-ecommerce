import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SideBar from "../../components/admin/SideBar";
import DashboardTop from "../../components/admin/DashboardTop";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Chart from "../../components/admin/Chart";

import Loader from "../../components/Loader";
import { adminGetAllOrders } from "../../redux/adminRedux/adminApiCalls";
import axios from "axios";
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
  overflow: hidden;
`;

const DashboarCenter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
`;

const Left = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  border-radius: 8px;
`;

const Desc = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DescTitle = styled.h4`
  font-weight: 500;
  color: gray;
`;

const DescIcon = styled.span``;

const BottomDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProgressBar = styled.div`
  width: 100px;
  height: 100px;
  margin: 10px 0;
`;

const BottomTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: gray;
`;

const Amount = styled.h1`
  margin: 20px 0;
`;

const SalesDesc = styled.span`
  text-align: center;
  color: gray;
  font-size: 14px;
`;

const TargetContainer = styled.div`
  display: flex;
  margin: 20px 0;
`;

const Target = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
  text-align: center;
`;

const TargetTitle = styled.p`
  font-weight: 500;
  color: gray;
  margin-bottom: 16px;
`;

const TargetDescDiv = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const TargetIcon = styled.span`
  margin-right: 5px;
`;
const TargetAmount = styled.p``;

const Right = styled.div`
  flex: 3;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

const DashboardBottom = styled.div`
  overflow-x: auto;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  background-color: white;
  padding: 10px;
  height: fit-content;
  width: 100%;
`;

const OrderTitle = styled.h2`
  color: gray;
  font-weight: 500;
`;

const AdminDashboard = () => {
  const [stats, setStats] = useState([]);

  const TOKEN = JSON.parse(localStorage.getItem("token"));

  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.user);
  const { currentUser } = user;

  if (!currentUser?.isAdmin) {
    toast.error("You are not authorized to access this route", {
      theme: "colored",
    });
    history.push("/");
  }

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/users/stats", {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });

        res.data.map((item) => {
          return setStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active Users": item.total },
          ]);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getStats();
  }, [MONTHS, TOKEN]);

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

  useEffect(() => {
    dispatch(adminGetAllOrders());
  }, [dispatch]);

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
        <DashboardTop />
        <DashboarCenter>
          <Left>
            <Desc>
              <DescTitle>Total Revenue</DescTitle>
              <DescIcon>
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </DescIcon>
            </Desc>
            <BottomDiv>
              <ProgressBar>
                <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
              </ProgressBar>
              <BottomTitle>Total sales made today</BottomTitle>
              <Amount>$10.6k</Amount>
              <SalesDesc>
                Previous transaction processing.Last payment may not be included
              </SalesDesc>
              <TargetContainer>
                <Target>
                  <TargetTitle>Target</TargetTitle>
                  <TargetDescDiv style={{ color: "red" }}>
                    <TargetIcon>
                      <i className="fa-solid fa-angle-down"></i>
                    </TargetIcon>
                    <TargetAmount>$9.4k</TargetAmount>
                  </TargetDescDiv>
                </Target>
                <Target>
                  <TargetTitle>Last Week</TargetTitle>
                  <TargetDescDiv style={{ color: "green" }}>
                    <TargetIcon>
                      <i className="fa-solid fa-angle-up"></i>
                    </TargetIcon>
                    <TargetAmount>$10.8k</TargetAmount>
                  </TargetDescDiv>
                </Target>
                <Target>
                  <TargetTitle>Last Month</TargetTitle>
                  <TargetDescDiv style={{ color: "green" }}>
                    <TargetIcon>
                      <i className="fa-solid fa-angle-up"></i>
                    </TargetIcon>
                    <TargetAmount>$10.8k</TargetAmount>
                  </TargetDescDiv>
                </Target>
              </TargetContainer>
            </BottomDiv>
          </Left>
          <Right>
            <Chart
              data={stats}
              title="User Analytics"
              grid
              dataKey="Active Users"
            />
          </Right>
        </DashboarCenter>
        <DashboardBottom>
          <OrderTitle>Latest Orders</OrderTitle>
          {error && <span>{error}</span>}
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {orders.length === 0 ? (
                <h4>No orders to show</h4>
              ) : (
                <Table dataSource={filteredOrders} columns={columns} />
              )}
            </>
          )}
        </DashboardBottom>
      </RightContainer>
    </Container>
  );
};

export default AdminDashboard;
