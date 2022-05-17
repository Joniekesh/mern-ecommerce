import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteProductById } from "../redux/apiCalls/cartApiCalls";
import {
	surfaceProResponsive,
	ipadAirResponsive,
	ipadMiniResponsive,
	miniPhoneResponsive,
	miniPhoneResponsive715,
	miniPhoneResponsive685,
	mobile,
} from "../responsive";

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
		width: "90%",
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
		marginRight: "none",
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

const DeleteIcon = styled.span`
	color: crimson;
	cursor: pointer;
	${surfaceProResponsive({
		marginLeft: "60px",
	})}
	${ipadAirResponsive({
		marginLeft: "80px",
	})}
	${ipadMiniResponsive({
		marginLeft: "60px",
	})}
	${miniPhoneResponsive({
		marginLeft: "60px",
	})}
	${miniPhoneResponsive715({
		marginLeft: "60px",
	})}
	${miniPhoneResponsive685({
		marginLeft: "60px",
	})}
	${mobile({
		marginLeft: "-10px",
	})}
`;

const CartListItem = ({ product }) => {
	const [quantity, setQuantity] = useState(0);
	const dispatch = useDispatch();

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
					<DeleteIcon>
						<i
							className="fas fa-trash"
							onClick={() => dispatch(deleteProductById(product._id))}
						></i>
					</DeleteIcon>
				</ProductDetailsRight>
			</ProductList>
		</div>
	);
};

export default CartListItem;
