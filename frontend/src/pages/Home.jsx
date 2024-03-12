import styled from "styled-components";
import CategoryList from "../components/CategoryList";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";
import ProductList from "../components/ProductList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/apiCalls/categoryApiCalls";
import { getProducts } from "../redux/apiCalls/productApiCalls";
import { mobile } from "../responsive";
import TopRatedProducts from "../components/TopRatedProducts";

const HomeDiv = styled.div`
  overflow-x: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  overflow: hidden;
  margin: auto;
  margin-top: 8rem;
  padding: 0 2rem;
  ${mobile({
    padding: "2px",
    width: "100%",
  })}
`;
const Home = () => {
  const dispatch = useDispatch();

  const category = useSelector((state) => state.category);
  const { category: currentCategory, isLoading } = category;

  const product = useSelector((state) => state.product);
  const { products, isLoadingProducts } = product;

  // console.log(products);

  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   },
  // };
  // useEffect(() => {
  //   const fetchCat = async () => {
  //     const res = await axiosInstance.get("/categories", config);
  //     // const profile = await axios.get(
  //     //   "http://localhost:5000/api/users/profile"
  //     // );

  //     console.log(res.data);
  //     // console.log(profile.data);
  //   };

  //   fetchCat();
  // }, []);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <HomeDiv>
      <Container>
        <TopRatedProducts />
        <CategoryList categories={currentCategory} isLoading={isLoading} />
        <ProductList home products={products} isLoading={isLoadingProducts} />
      </Container>
      <NewsLetter />
      <Footer />
    </HomeDiv>
  );
};

export default Home;
