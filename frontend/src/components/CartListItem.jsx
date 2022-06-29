import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const ProductList = styled.div`
	display: flex;
	border-bottom: 1px solid #ddd;
	padding: 12px;
	${mobile({
		flexDirection: "column",
	})}
`;

const ProductDetailsLeft = styled.div`
	width: 75%;
	display: flex;
	height: 150px;
	${mobile({
		flexDirection: "column",
		width: "100%",
		marginBottom: "32px",
	})}
`;

const ImageContainer = styled.div`
	flex: 1;
	margin-right: 20px;
	max-height: 140px;
	min-height: 140px;
	${mobile({
		width: "100%",
	})}
`;

const Image = styled.img`
	width: 200px;
	height: 100%;
	${mobile({
		width: "100%",
		height: "200px",
	})}
`;

const Details = styled.div`
	flex: 3;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-size: 18px;
	${mobile({
		width: "100%",
		marginTop: "70px",
		alignItems: "center",
		justifyContent: "center",
	})}
`;

const ProductName = styled.span`
	width: 40%;
	${mobile({
		width: "100%",
		textAlign: "center",
	})}
`;

const ProductID = styled.span`
	${mobile({
		margin: "10px 0px",
	})}
`;

const ProductColor = styled.span`
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background-color: black;
	cursor: pointer;
`;

const ProductSize = styled.span``;

const ProductDetailsRight = styled.div`
	width: 25%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	${mobile({
		width: "100%",
		marginTop: "130px",
		alignItems: "center",
		justifyContent: "center",
	})}
`;

const Counter = styled.div`
	display: flex;
	align-items: center;
	font-weight: 500;
	${mobile({
		marginTop: "30px",
	})}
`;

const Add = styled.span`
	height: 10px;
	width: 16px;
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

const Count = styled.span`
	margin: 0px 10px;
	font-weight: 500;
`;

const Remove = styled.span`
	height: 10px;
	width: 16px;
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

const Price = styled.span`
	font-weight: 500;
	font-size: 24px;
	${mobile({
		fontSize: "20px",
		margin: "16px 0px",
	})}
`;

const CartListItem = ({ product }) => {
	const [quantity, setQuantity] = useState(0);

	const handleClick = (type) => {
		if (type === "plus") {
			setQuantity(quantity + 1);
		} else {
			quantity > 0 && setQuantity(quantity - 1);
		}
	};

	return (
		<div>
			<ProductList>
				<ProductDetailsLeft>
					<ImageContainer>
						<Image src={product.image} alt="" />
					</ImageContainer>
					<Details>
						<ProductName>
							<b>Product:</b>
							{product.name}
						</ProductName>
						<ProductID>
							<b>ID: </b>
							{product._id}
						</ProductID>
						<ProductColor></ProductColor>
						<ProductSize>
							{product.size && <b>Size: </b>}
							{product?.size}
						</ProductSize>
					</Details>
				</ProductDetailsLeft>
				<ProductDetailsRight>
					<Counter>
						<Remove onClick={() => handleClick("minus")}>-</Remove>
						<Count>{product.quantity}</Count>
						<Add onClick={() => handleClick("plus")}>+</Add>
					</Counter>
					<Price>$ {product.price}</Price>
				</ProductDetailsRight>
			</ProductList>
		</div>
	);
};

export default CartListItem;
