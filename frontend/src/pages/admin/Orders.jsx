import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SideBar from "../../components/admin/SideBar";
import Loader from "../../components/Loader";

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

const TableDiv = styled.table`
  overflow-x: auto;
  width: 100%;
`;

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
`;

const TableHead = styled.thead``;
const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: orange;
  }
`;
const TableHeading = styled.th`
  text-align: left;
  padding: 8px;
`;

const TableData = styled.td`
  text-align: left;
  padding: 8px;
`;

const Button = styled.button`
  padding: 5px 8px;
  cursor: pointer;
  border: none;
  background-color: #08173b;
  color: white;
  border-radius: 3px;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Orders = () => {
  const history = useHistory();

  const user = useSelector((state) => state.user.currentUser);

  const adminOrder = useSelector((state) => state.adminOrder);
  const { orders, isLoading, error } = adminOrder;

  if (!user.isAdmin) {
    toast.error("You are not authorized to access this route", {
      theme: "colored",
    });
    history.push("/");
  }

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
              <TableDiv>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeading>ORDER ID</TableHeading>
                      <TableHeading>NAME</TableHeading>
                      <TableHeading>EMAIL</TableHeading>
                      <TableHeading>DATE</TableHeading>
                      <TableHeading>TOTAL</TableHeading>
                      <TableHeading>PAID</TableHeading>
                      <TableHeading>DELIVERED</TableHeading>
                      <TableHeading></TableHeading>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableData>{order._id}</TableData>
                        <TableData>{order.user?.name}</TableData>
                        <TableData>{order.user?.email}</TableData>
                        <TableData>
                          {new Date(order.createdAt).toDateString()}
                        </TableData>
                        <TableData>$ {order.totalPrice}</TableData>
                        <TableData>
                          {order.isPaid ? (
                            <p
                              style={{
                                backgroundColor: "green",
                                color: "white",
                                padding: "5px",
                                borderRadius: "3px",
                              }}
                            >
                              {new Date(order.paidAt).toLocaleDateString()}
                            </p>
                          ) : (
                            <p
                              style={{
                                backgroundColor: "crimson",
                                color: "white",
                                padding: "5px",
                                borderRadius: "3px",
                              }}
                            >
                              Not Paid
                            </p>
                          )}
                        </TableData>
                        <TableData>
                          {order.isDelivered ? (
                            <p
                              style={{
                                backgroundColor: "green",
                                color: "white",
                                padding: "5px",
                                borderRadius: "3px",
                              }}
                            >
                              {new Date(order.deliveredAt).toLocaleDateString()}
                            </p>
                          ) : (
                            <p
                              style={{
                                backgroundColor: "crimson",
                                color: "white",
                                padding: "5px",
                                borderRadius: "3px",
                              }}
                            >
                              Not Delivered
                            </p>
                          )}
                        </TableData>
                        <Link to={`/order/${order._id}`}>
                          <TableData>
                            <Button>View</Button>
                          </TableData>
                        </Link>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableDiv>
            )}
          </>
        )}
      </RightContainer>
    </Container>
  );
};

export default Orders;
