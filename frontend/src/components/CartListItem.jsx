import { useState } from "react";
import styled from "styled-components";

const ProductList = styled.div`
	display: flex;
	border-bottom: 1px solid #ddd;
	padding: 12px;
`;

const ProductDetailsLeft = styled.div`
	width: 75%;
	display: flex;
`;

const ImageContainer = styled.div`
	flex: 1;
	margin-right: 20px;
`;

const Image = styled.img`
	width: 200px;
`;

const Details = styled.div`
	flex: 3;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-size: 18px;
`;

const ProductName = styled.span``;

const ProductID = styled.span``;

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
`;

const Counter = styled.div`
	display: flex;
	font-weight: 500;
	font-size: 24px;
`;

const Add = styled.span`
	cursor: pointer;
`;

const Count = styled.span`
	margin: 0px 10px;
`;

const Remove = styled.span`
	cursor: pointer;
`;

const Price = styled.span`
	font-weight: 500;
	font-size: 24px;
`;

const DeleteIcon = styled.span`
	color: crimson;
	cursor: pointer;
`;

const CartListItem = () => {
	const [counter, setCounter] = useState(0);

	const handleClick = (type) => {
		if (type === "plus") {
			setCounter(counter + 1);
		} else {
			counter > 0 && setCounter(counter - 1);
		}
	};

	return (
		<div>
			<ProductList>
				<ProductDetailsLeft>
					<ImageContainer>
						<Image src="/assets/image8.jpg" />
					</ImageContainer>
					<Details>
						<ProductName>
							<b>Product:</b> EAR PHONE
						</ProductName>
						<ProductID>
							<b>ID: </b>338444464848
						</ProductID>
						<ProductColor></ProductColor>
						<ProductSize>
							<b>Size: </b>38.5
						</ProductSize>
					</Details>
				</ProductDetailsLeft>
				<ProductDetailsRight>
					<Counter>
						<Remove onClick={() => handleClick("minus")}>-</Remove>
						<Count>{counter}</Count>
						<Add onClick={() => handleClick("plus")}>+</Add>
					</Counter>
					<Price>$ 39.99</Price>
					<DeleteIcon>
						<i className="fas fa-trash"></i>
					</DeleteIcon>
				</ProductDetailsRight>
			</ProductList>
		</div>
	);
};

export default CartListItem;
