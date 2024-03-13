import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { payOrder } from "../redux/apiCalls/orderApiCalls";
import { getOrderById } from "../redux/apiCalls/myOrderApiCalls";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";
import { deliverOrder } from "../redux/apiCalls/orderDeliverApiCalls";
import { miniPhoneResponsive685, mobile480 } from "../responsive";

const Wrapper = styled.div`
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  overflow: hidden;
  overflow-x: hidden;
  margin: auto;
  margin-top: 7rem;
  padding: 0 2rem;
  background-color: white;
  ${miniPhoneResponsive685({
    padding: "0px",
  })}
`;

const OrderTitle = styled.h1`
  margin: 10px 0;
  color: teal;
  ${miniPhoneResponsive685({
    fontSize: "22px",
    marginLeft: "10px",
  })}
`;

const PlaceOrderContainer = styled.div`
  display: flex;
  ${miniPhoneResponsive685({
    flexDirection: "column",
  })}
`;

const Left = styled.div`
  flex: 8;
`;

const LeftTop = styled.div`
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  padding: 10px;
  border-radius: 8px;
`;

const TitleEdit = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Icon = styled.span`
  color: #08173b;
  font-size: 18px;
  cursor: pointer;
`;

const LeftCenter = styled.div`
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  padding: 10px;
  border-radius: 8px;
  margin: 10px 0;
`;

const Title = styled.h2`
  margin-bottom: 16px;
  color: #08173b;
`;

const InfoContainer = styled.div`
  display: flex;
  margin: 16px 0;
`;

const Address = styled.p`
  margin-right: 16px;
`;

const AddressValue = styled.p``;

const LeftBottom = styled.div`
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  padding: 10px;
  border-radius: 8px;
  margin: 10px 0;
`;

const Message = styled.p``;

const OrderList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${mobile480({
    width: "100%",
  })}
`;

const OrderListItem = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  ${mobile480({
    flexDirection: "column",
  })}
`;

const Image = styled.img`
  width: 200px;
  height: 150px;
  margin-right: 10px;
  ${mobile480({
    width: "100%",
    height: "200px",
  })}
`;

const Name = styled.h3`
  margin-right: 16px;
  width: 40%;
  ${mobile480({
    width: "100%",
    textAlign: "center",
    marginBottom: "8px",
    fontSize: "18px",
  })}
`;

const ProductInfo = styled.p``;

const CartSummary = styled.div`
  flex: 4;
  height: max-content;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  padding: 10px;
  border-radius: 8px;
  margin: 10px 0;
  margin-left: 10px;
  z-index: 10;
`;

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SummaryTitle = styled.span`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  color: teal;
`;

const SummaryDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SummaryDetail = styled.div`
  margin-bottom: 16px;
  font-size: 18px;
`;

const SummaryPrice = styled.span`
  font-weight: 500;
`;

const Hr = styled.hr`
  font-size: 1px;
  color: #ddd;
  margin-bottom: 5px;
`;

const Error = styled.p`
  color: crimson;
`;

const DeliverButton = styled.button`
  padding: 10px;
  border: none;
  cursor: pointer;
  background-color: #08173b;
  color: white;
  font-weight: 500;
  border-radius: 3px;
  &:hover {
    opacity: 0.9;
  }
`;

const Order = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const user = useSelector((state) => state.user.currentUser);

  if (!user) {
    history.push("/login");
  }

  const myOrder = useSelector((state) => state.myOrder);
  const { order: currentOrder, isLoading, error } = myOrder;

  //   console.log(myOrder);

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { isLoading: deliverLoading } = orderDeliver;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  useEffect(() => {
    id && dispatch(getOrderById(id));
  }, [dispatch, id]);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascripty";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {};
      document.body.appendChild(script);
    };

    !currentOrder?.ispaid && !isLoading && addPayPalScript();
  }, [currentOrder, isLoading]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(id, paymentResult));
    toast.success("Payment SUCCESS", { theme: "colored" });
    window.location.reload();
  };

  const deliverHandler = () => {
    id && user && user.isAdmin && dispatch(deliverOrder(id, currentOrder));
    history.push("/admin/dashboard");
    toast.success("Order marked as delivered", { theme: "colored" });
    window.location.reload();
  };

  return (
    <Wrapper>
      <Container>
        {isLoading ? (
          <Loader />
        ) : error ? (
          toast.error({ error }, { theme: "colored" })
        ) : (
          <>
            <OrderTitle>Order ID: {currentOrder?._id}</OrderTitle>
            <PlaceOrderContainer>
              <Left>
                <LeftTop>
                  <TitleEdit>
                    <Title>Shipping</Title>
                    {!id && (
                      <Icon onClick={() => history.push("/shipping")}>
                        <i className="fa-solid fa-pen"></i>
                      </Icon>
                    )}
                  </TitleEdit>
                  <InfoContainer>
                    <Address>
                      <strong>Name:</strong>
                    </Address>
                    <AddressValue>{currentOrder?.user?.name}</AddressValue>
                  </InfoContainer>
                  <InfoContainer>
                    <Address>
                      <strong>Email:</strong>
                    </Address>
                    <AddressValue>
                      <a href={`mailto:${currentOrder?.user?.email}`}>
                        {currentOrder?.user?.email}
                      </a>
                    </AddressValue>
                  </InfoContainer>
                  <InfoContainer>
                    <Address>
                      <strong>Address:</strong>
                    </Address>
                    <AddressValue>
                      {currentOrder?.shippingAddress.address}
                    </AddressValue>
                  </InfoContainer>
                  <InfoContainer>
                    <Address>
                      <strong>City:</strong>
                    </Address>
                    <AddressValue>
                      {currentOrder?.shippingAddress.city}
                    </AddressValue>
                  </InfoContainer>
                  <InfoContainer>
                    <Address>
                      <strong>Country:</strong>
                    </Address>
                    <AddressValue>
                      {currentOrder?.shippingAddress.country}
                    </AddressValue>
                  </InfoContainer>
                  <InfoContainer>
                    <Address>
                      <strong>Phone:</strong>
                    </Address>
                    <AddressValue>
                      {currentOrder?.shippingAddress.phone}
                    </AddressValue>
                  </InfoContainer>
                  <InfoContainer>
                    <Address>
                      <strong>Postal Code:</strong>
                    </Address>
                    <AddressValue>
                      {currentOrder?.shippingAddress.postalCode}
                    </AddressValue>
                  </InfoContainer>
                  <InfoContainer>
                    <Address>
                      <strong style={{ color: "teal", fontSize: "18px" }}>
                        Delivery Status:
                      </strong>
                    </Address>
                    {currentOrder?.isDelivered ? (
                      <AddressValue style={{ color: "green" }}>
                        Delivered on{" "}
                        <b>
                          {new Date(currentOrder.deliveredAt).toLocaleString()}
                        </b>
                      </AddressValue>
                    ) : (
                      <AddressValue style={{ color: "crimson" }}>
                        Not Delivered
                      </AddressValue>
                    )}
                  </InfoContainer>
                </LeftTop>

                <LeftCenter>
                  <Title>Payment Method</Title>
                  <InfoContainer>
                    <Address>
                      <strong>Method:</strong>
                    </Address>
                    <AddressValue>
                      <b>{currentOrder?.paymentMethod}</b>
                    </AddressValue>
                  </InfoContainer>
                  <InfoContainer>
                    <Address>
                      <strong style={{ color: "teal", fontSize: "18px" }}>
                        Payment Status:
                      </strong>
                    </Address>
                    {currentOrder?.isPaid ? (
                      <AddressValue style={{ color: "green" }}>
                        Paid on{" "}
                        <b>{new Date(currentOrder?.paidAt).toLocaleString()}</b>
                      </AddressValue>
                    ) : (
                      <AddressValue style={{ color: "crimson" }}>
                        Not Paid
                      </AddressValue>
                    )}
                  </InfoContainer>
                </LeftCenter>
                <LeftBottom>
                  <Title>Order Items</Title>
                  {currentOrder?.orderItems.length === 0 ? (
                    <Message>Your Order is empty</Message>
                  ) : (
                    <OrderList>
                      {currentOrder?.orderItems.map((order) => (
                        <OrderListItem key={order._id}>
                          <Image src={order.image} />
                          <Name>
                            <Link to={`/products/${order.product}`}>
                              {order.name}
                            </Link>
                          </Name>
                          <ProductInfo>
                            {order.qty} X ${order.price} ={" "}
                            <strong>
                              ${addDecimals(order.qty * order.price)}
                            </strong>
                          </ProductInfo>
                        </OrderListItem>
                      ))}
                    </OrderList>
                  )}
                </LeftBottom>
              </Left>
              <CartSummary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <Hr />
                <SummaryContainer>
                  <SummaryDetails>
                    <SummaryDetail>Subtotal</SummaryDetail>
                    <SummaryPrice>
                      $ {addDecimals(currentOrder?.itemsPrice)}
                    </SummaryPrice>
                  </SummaryDetails>
                  <SummaryDetails>
                    <SummaryDetail>Shipping Price</SummaryDetail>
                    <SummaryPrice>$ {currentOrder?.shippingPrice}</SummaryPrice>
                  </SummaryDetails>
                  <SummaryDetails>
                    <SummaryDetail>Tax price</SummaryDetail>
                    <SummaryPrice>$ {currentOrder?.taxPrice}</SummaryPrice>
                  </SummaryDetails>
                  <Hr />
                  <SummaryDetails
                    style={{
                      fontWeight: "500",
                      fontSize: "20px",
                    }}
                  >
                    <SummaryDetail>Total</SummaryDetail>
                    <SummaryPrice style={{ color: "teal" }}>
                      $ {currentOrder?.totalPrice}
                    </SummaryPrice>
                  </SummaryDetails>
                  {error && <Error>{error}</Error>}
                  {!currentOrder?.isPaid &&
                    currentOrder?.user?._id === user._id && (
                      <PayPalButton
                        amount={currentOrder?.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  {deliverLoading && <Loader />}
                  {user &&
                    user.isAdmin &&
                    !currentOrder?.isDelivered &&
                    currentOrder?.isPaid && (
                      <DeliverButton onClick={deliverHandler}>
                        Mark as Delivered
                      </DeliverButton>
                    )}
                </SummaryContainer>
              </CartSummary>
            </PlaceOrderContainer>
          </>
        )}
      </Container>
      <NewsLetter />
      <Footer />
    </Wrapper>
  );
};

export default Order;
