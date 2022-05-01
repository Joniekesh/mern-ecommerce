import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import ProductList from "../components/ProductList";

const Container = styled.div`
	max-width: 1200px;
	background-color: white;
	overflow: hidden;
	overflow-x: hidden;
	margin: auto;
	margin-top: 7rem;
	/* margin-bottom: 3rem; */
	padding: 0 2rem;
`;

const CatTitle = styled.h1`
	margin-top: 20px;
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
`;

const Title = styled.div`
	margin-right: 10px;
	font-weight: 500;
	font-size: 20px;
`;

const SelectDiv = styled.div`
	display: flex;
`;

const Select = styled.select`
	margin-right: 20px;
	padding: 10px;
`;

const Option = styled.option`
	font-size: 16px;
`;

const Right = styled.div`
	display: flex;
	align-items: center;
`;

const Category = () => {
	return (
		<div>
			<Navbar />
			<Container>
				<CatTitle>Dresses</CatTitle>
				<FilterDiv>
					<Left>
						<Title>Filter Products:</Title>
						<SelectDiv>
							<Select>
								<Option disabled selected>
									SIZE
								</Option>
								<Option>XS</Option>
								<Option>S</Option>
								<Option>M</Option>
								<Option>L</Option>
								<Option>XS</Option>
							</Select>
							<Select>
								<Option disabled selected>
									COLOR
								</Option>
								<Option>RED</Option>
								<Option>BROWN</Option>
								<Option>BLUE</Option>
								<Option>ASH</Option>
								<Option>BLACK</Option>
								<Option>WHITE</Option>
							</Select>
						</SelectDiv>
					</Left>
					<Right>
						<Title>Sort Products:</Title>
						<Select>
							<Option>NEWEST</Option>
							<Option>PRICE (ASC)</Option>
							<Option>PRICE (DESC)</Option>
						</Select>
					</Right>
				</FilterDiv>

				<ProductList />
			</Container>
			<NewsLetter />
			<Footer />
		</div>
	);
};

export default Category;
