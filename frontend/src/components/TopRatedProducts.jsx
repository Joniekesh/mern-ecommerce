import styled from "styled-components";
import { useSelector } from "react-redux";
import Slider from "react-styled-carousel";

const Text = styled.h2`
  margin-bottom: 10px;
  color: teal;
`;

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 16px;
  border-radius: 5px;
`;

const ProductContainer = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  flex: 25;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 30%;
  bottom: 50%;
  margin: auto;
  font-size: 24px;
  padding: 8px;
  color: black;
  font-weight: 500;
  height: 20px;
  border: 1px solid black;
`;

const Desc = styled.span`
  margin-right: 12px;
`;

const Price = styled.span``;

const responsive = [
  { breakPoint: 1280, cardsToShow: 1 }, // this will be applied if screen size is greater than 1280px. cardsToShow will become 4.
  { breakPoint: 760, cardsToShow: 1 },
];

const TopRatedProducts = () => {
  const adminProduct = useSelector((state) => state.adminProduct);
  const { products } = adminProduct;

  const topRatedProducts = products.filter((product) => product.rating >= 4);
  return (
    <>
      <Text>Top Rated Products</Text>
      <Container>
        <Slider responsive={responsive} autoSlide={2500}>
          {topRatedProducts &&
            topRatedProducts.map((product) => (
              <ProductContainer key={product._id}>
                <ImageWrapper>
                  <Image src={product.image} />
                  <Details>
                    <Desc>{product.name}</Desc>
                    <Price>$ {product.price}</Price>
                  </Details>
                </ImageWrapper>
              </ProductContainer>
            ))}
        </Slider>
      </Container>
    </>
  );
};

export default TopRatedProducts;
