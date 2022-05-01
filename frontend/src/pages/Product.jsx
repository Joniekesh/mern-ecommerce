import { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import { Link } from "react-router-dom";

const Container = styled.div`
	max-width: 1200px;
	background-color: white;
	overflow: hidden;
	overflow-x: hidden;
	margin: auto;
	margin-top: 7rem;
	padding: 2rem;
`;

const ProductContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Image = styled.img`
	width: 50%;
	height: 400px;
	object-fit: cover;
	margin-right: 20px;
`;

const InfoContainer = styled.div`
	width: 50%;
	flex-direction: column;
`;

const Title = styled.span`
	font-size: 32px;
	font-weight: 300;
`;

const Desc = styled.p`
	margin: 20px 0px;
`;

const RatingContainer = styled.div`
	display: flex;
	font-weight: 500;
`;

const RatingCount = styled.span``;

const RatingIcons = styled.div`
	margin: 0px 5px 10px 5px;
`;

const Icon = styled.span`
	color: orange;
`;

const Reviews = styled.span``;

const Price = styled.p`
	font-size: 40px;
	font-weight: 300;
	margin: 16px 0px;
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
`;

const ColorBlue = styled.span`
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background-color: #05055f;
	margin: 0px 7px;
	cursor: pointer;
`;

const ColorBlack = styled.div`
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background-color: black;
	margin-right: 7px;
	cursor: pointer;
`;

const ColorGray = styled.div`
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background-color: gray;
	margin-right: 7px;
	cursor: pointer;
`;

const ColorWhite = styled.div`
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background-color: white;
	margin-right: 7px;
	cursor: pointer;
`;

const FilterSize = styled.div`
	display: flex;
	align-items: center;
`;

const Size = styled.span`
	margin-right: 5px;
	font-size: 20px;
	font-weight: 400;
`;

const Select = styled.select`
	padding: 5px;
`;

const Option = styled.option`
	padding: 10px;
	font-size: 18px;
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
	font-size: 30px;
	cursor: pointer;
`;

const AddCount = styled.span`
	margin: 0px 10px;
`;

const RemoveButton = styled.span`
	font-size: 30px;
	cursor: pointer;
`;

const AddToCart = styled.button`
	width: 100px;
	padding: 6px;
	border: 2px solid #05055f;
	font-weight: 500;
	background-color: #f4f4f4;
	cursor: pointer;
	transition: all 0.4s ease;
	&:hover {
		opacity: 0.8;
	}
`;

const Product = () => {
	const [counter, setCounter] = useState(0);

	const handleClick = (type) => {
		if (type === "add") {
			setCounter(counter + 1);
		} else {
			counter > 0 && setCounter(counter - 1);
		}
	};

	return (
		<>
			<Navbar />
			<Container>
				<ProductContainer>
					<Image src="/assets/image8.jpg" />
					<InfoContainer>
						<Title>Apple Headphone</Title>
						<Desc>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque
							voluptas eum sint, totam nesciunt tenetur eveniet aut quod eos
							quo. Quia saepe consequuntur excepturi natus fugit! Sunt debitis
							reiciendis eveniet!
						</Desc>
						<RatingContainer>
							<RatingCount>4.5</RatingCount>
							<RatingIcons>
								<Icon>
									<i className="fa-solid fa-star"></i>
								</Icon>

								<Icon>
									{" "}
									<i className="fa-solid fa-star"></i>
								</Icon>
								<Icon>
									{" "}
									<i className="fa-solid fa-star"></i>
								</Icon>
								<Icon>
									{" "}
									<i className="fa-solid fa-star"></i>
								</Icon>
								<Icon>
									{" "}
									<i className="fa-solid fa-star-half-stroke"></i>
								</Icon>
							</RatingIcons>
							<Reviews>/ 7 reviews</Reviews>
						</RatingContainer>
						<Price>$ 39.99</Price>
						<FilterContainer>
							<FilterColor>
								<ColorTitle>Color:</ColorTitle>
								<ColorsContainer>
									<ColorBlue></ColorBlue>
									<ColorBlack></ColorBlack>
									<ColorGray></ColorGray>
									<ColorWhite></ColorWhite>
								</ColorsContainer>
							</FilterColor>
							<FilterSize>
								<Size>Size:</Size>
								<Select>
									<Option>XL</Option>
									<Option>L</Option>
									<Option>M</Option>
									<Option>S</Option>
									<Option>XS</Option>
								</Select>
							</FilterSize>
						</FilterContainer>
						<AddContainer>
							<Counter>
								<RemoveButton onClick={() => handleClick("minus")}>
									-
								</RemoveButton>
								<AddCount>{counter}</AddCount>
								<AddButton onClick={() => handleClick("add")}>+</AddButton>
							</Counter>
							<Link to="/cart">
								<AddToCart>ADD TO CART</AddToCart>
							</Link>
						</AddContainer>
					</InfoContainer>
				</ProductContainer>
			</Container>
			<NewsLetter />
			<Footer />
		</>
	);
};

export default Product;
