import styled from "styled-components";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";
import ProductList from "../components/ProductList";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { mobile, mobile480 } from "../responsive";

const Container = styled.div`
  max-width: 1200px;
  background-color: white;
  overflow: hidden;
  overflow-x: hidden;
  margin: auto;
  margin-top: 7rem;
  padding: 0 2rem;
  ${mobile({
    padding: "2px",
  })}
  ${mobile480({
    padding: "none",
    width: "100%",
  })}
`;

const CatTitle = styled.h1`
  margin-top: 20px;
  color: teal;
  ${mobile({
    fontSize: "28px",
  })}
`;

const FilterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0px;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  ${mobile({
    flexDirection: "column",
  })}
`;

const Title = styled.div`
  margin-right: 10px;
  font-weight: 500;
  font-size: 20px;
  ${mobile({
    marginBottom: "8px",
  })}
`;

const SelectDiv = styled.div`
  display: flex;
`;

const Select = styled.select`
  margin-right: 20px;
  padding: 10px;
  ${mobile({
    padding: "8px",
  })}
`;

const Option = styled.option`
  font-size: 16px;
  ${mobile({
    fontSize: "15px",
  })}
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  ${mobile({
    flexDirection: "column",
  })}
`;

const Category = () => {
  const [filters, setFilters] = useState({});
  const [sorting, setSorting] = useState("newest");

  const location = useLocation();
  const catName = location.pathname.split("/")[2];
  const cat = catName.toLowerCase();

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Container>
        <CatTitle>{catName}</CatTitle>
        <FilterDiv>
          <Left>
            <Title>Filter Products:</Title>
            <SelectDiv>
              <Select name="size" onChange={handleChange}>
                <Option disabled>SIZE</Option>
                <Option>XS</Option>
                <Option>S</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XS</Option>
              </Select>
              <Select name="color" onChange={handleChange}>
                <Option disabled>COLOR</Option>
                <Option>white</Option>
                <Option>black</Option>
                <Option>red</Option>
                <Option>blue</Option>
                <Option>yellow</Option>
                <Option>green</Option>
                <Option>ash</Option>
              </Select>
            </SelectDiv>
          </Left>
          <Right>
            <Title>Sort Products:</Title>
            <Select onClick={(e) => setSorting(e.target.value)}>
              <Option value="newest">Newest</Option>
              <Option value="asc">Price (asc)</Option>
              <Option value="desc">Price (desc)</Option>
            </Select>
          </Right>
        </FilterDiv>
        <ProductList cat={cat} filters={filters} sorting={sorting} />
      </Container>
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Category;
