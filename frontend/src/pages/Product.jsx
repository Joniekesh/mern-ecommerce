import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";
import { getProductById } from "../redux/apiCalls/productApiCalls";
import Rating from "../Rating";
import Loader from "../components/Loader";
import ReviewsListItem from "../components/ReviewsListItem";
import ReviewForm from "../components/ReviewForm";
import { addProduct } from "../redux/reducers/cartRedux";
import { toast } from "react-toastify";
import { miniPhoneResponsive685, mobile, mobile480 } from "../responsive";

const Wrapper = styled.div`
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  background-color: white;
  overflow: hidden;
  overflow-x: hidden;
  margin: auto;
  margin-top: 7rem;
  padding: 2rem;
  ${mobile({
    padding: "none",
  })}
`;

const ProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({
    flexDirection: "column",
  })}
`;

const Image = styled.img`
  width: 50%;
  height: 400px;
  object-fit: cover;
  margin-right: 20px;
  ${mobile480({
    height: "300px",
  })}
  ${mobile({
    width: "100%",
  })}
`;

const InfoContainer = styled.div`
  width: 50%;
  flex-direction: column;
  ${mobile({
    width: "100%",
  })}
`;

const Title = styled.span`
  font-size: 32px;
  font-weight: 300;
  ${mobile({
    textAlign: "center",
    fontSize: "24px",
  })}
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const RatingCount = styled.span`
  margin-right: 5px;
`;

const PriceInstockContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.p`
  font-size: 40px;
  font-weight: 300;
  margin: 16px 0px;
  ${miniPhoneResponsive685({
    fontSize: "30px",
  })}
  ${mobile({
    fontSize: "24px",
  })}
	${mobile480({
    fontSize: "24px",
  })}
`;

const CountInStock = styled.span`
  font-size: 24px;
  ${miniPhoneResponsive685({
    fontSize: "20px",
  })}
  ${mobile({
    fontSize: "18px",
  })}
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const FilterColor = styled.div`
  display: flex;
  align-items: center;
`;

const ColorTitle = styled.span`
  font-size: 20px;
  font-weight: 400;
`;

const ColorsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({
    marginRight: "10px",
  })}
`;

const Color = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0px 5px;
  cursor: pointer;
  background-color: ${(props) => props.color};
  ${mobile({
    width: "16px",
    height: "16px",
  })}
`;

const FilterSize = styled.div`
  display: flex;
  align-items: center;
`;

const Size = styled.span`
  margin-right: 5px;
  font-size: 20px;
  font-weight: 400;
  ${mobile({
    fontSize: "16px",
  })}
`;

const Select = styled.select`
  padding: 5px;
`;

const Option = styled.option`
  padding: 10px;
  font-size: 18px;
  ${mobile({
    padding: "none",
    fontSize: "15px",
  })}
`;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const Counter = styled.div`
  display: flex;
  align-items: center;
`;

const AddButton = styled.span`
  height: 16px;
  width: 24px;
  background-color: orange;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 5px;
  font-size: 30px;
  border-radius: 4px;
  cursor: pointer;
`;

const AddCount = styled.span`
  margin: 0px 20px;
  font-weight: 500;
`;

const RemoveButton = styled.span`
  height: 16px;
  width: 24px;
  background-color: orange;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 5px;
  font-size: 30px;
  border-radius: 4px;
  cursor: pointer;
`;

const AddToCart = styled.button`
  width: 100px;
  padding: 6px;
  border: 2px solid #08173b;
  font-weight: 500;
  background-color: white;
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    opacity: 0.8;
  }
`;

const Hr = styled.div`
  border: 0.5px solid #ddd;
  margin: 10px 0px;
`;

const ReviewsList = styled.div`
  border: 1px solid #ddd;
  width: 50%;
  padding: 10px;
  ${mobile({
    width: "100%",
  })}
`;
const ReviewTop = styled.div`
  margin-bottom: 10px;
`;
const ReviewsText = styled.h2`
  margin-bottom: 20px;
`;

const ReviewAverageContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Average = styled.h3`
  margin-right: 16px;
`;

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product);
  const { product: singleProduct, isLoading } = product;

  const myOrder = useSelector((state) => state.myOrder);
  const { orders } = myOrder;

  useEffect(() => {
    id && dispatch(getProductById(id));
  }, [dispatch, id]);

  const handleClick = (type) => {
    if (type === "add") {
      setQuantity(quantity + 1);
    } else {
      quantity > 0 && setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addProduct({ ...singleProduct, quantity, color, size }));
    toast.success("Product added to the cart", { theme: "colored" });
  };

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  return (
    <Wrapper>
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ProductContainer>
              <Image src={singleProduct?.image} />
              <InfoContainer>
                <Title>{singleProduct?.name}</Title>
                <Desc>{singleProduct?.description}</Desc>
                <RatingContainer>
                  <RatingCount>{singleProduct?.rating}</RatingCount>
                  <Rating
                    value={singleProduct?.rating}
                    text={`${singleProduct?.numReviews} reviews`}
                  />
                </RatingContainer>
                <PriceInstockContainer>
                  <Price>$ {addDecimals(singleProduct?.price)}</Price>
                  <CountInStock>
                    Count In Stock: <b>{singleProduct?.countInStock}</b>
                  </CountInStock>
                </PriceInstockContainer>
                {singleProduct?.size?.length > 0 &&
                  singleProduct.color?.length > 0 && (
                    <FilterContainer>
                      <FilterColor>
                        <ColorTitle>Color:</ColorTitle>
                        <ColorsContainer>
                          {singleProduct?.color.map((c) => (
                            <Color
                              color={c}
                              key={c}
                              onClick={() => setColor(c)}
                            />
                          ))}
                        </ColorsContainer>
                      </FilterColor>
                      <FilterSize>
                        <Size>Size:</Size>
                        <Select onChange={(e) => setSize(e.target.value)}>
                          {singleProduct.size.map((s) => (
                            <Option key={s}>{s}</Option>
                          ))}
                        </Select>
                      </FilterSize>
                    </FilterContainer>
                  )}
                <AddContainer>
                  <Counter>
                    <RemoveButton onClick={() => handleClick("minus")}>
                      -
                    </RemoveButton>
                    <AddCount>{quantity}</AddCount>
                    <AddButton onClick={() => handleClick("add")}>+</AddButton>
                  </Counter>
                  <AddToCart onClick={handleAddToCart}>ADD TO CART</AddToCart>
                </AddContainer>
              </InfoContainer>
            </ProductContainer>
            <Hr />
            <ReviewsList>
              <ReviewTop>
                <ReviewsText>Ratings and Reviews</ReviewsText>
                <ReviewAverageContainer>
                  <Average>Average:</Average>
                  <RatingContainer>
                    <RatingCount>{singleProduct?.rating}</RatingCount>
                    <Rating
                      value={singleProduct?.rating}
                      text={`${singleProduct?.numReviews} reviews`}
                    />
                  </RatingContainer>
                </ReviewAverageContainer>
              </ReviewTop>
              <ReviewForm product={singleProduct} />
              {singleProduct?.reviews?.map((review) => (
                <ReviewsListItem review={review} key={review._id} />
              ))}
            </ReviewsList>
          </>
        )}
      </Container>
      <NewsLetter />
      <Footer />
    </Wrapper>
  );
};

export default Product;
