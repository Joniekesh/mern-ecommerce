import styled from "styled-components";
import { Link } from "react-router-dom";
import {
	surfaceProResponsive,
	responsive988,
	responsive948,
	responsive908,
	ipadAirResponsive,
	ipadMiniResponsive,
	miniPhoneResponsive,
	miniPhoneResponsive715,
	miniPhoneResponsive685,
	mobile,
	mobile480,
} from "../responsive";

const ListItem = styled.div`
	background-color: #f0ecec;
	width: 200px;
	height: 300px;
	padding: 5px;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	transition: all 0.5s ease;
	&:hover {
		transform: scale(1.05);
	}
	${surfaceProResponsive({
		width: "240px",
	})}
	${responsive988({
		width: "190px",
	})}
	${responsive948({
		width: "180px",
		height: "250px",
	})}
	${responsive908({
		width: "170px",
		height: "250px",
	})}
	${ipadAirResponsive({
		width: "210px",
	})}
	${ipadMiniResponsive({
		width: "200px",
	})}
	${miniPhoneResponsive({
		width: "190px",
		height: "250px",
	})}
	${miniPhoneResponsive715({
		width: "180px",
		height: "230px",
	})}
	${miniPhoneResponsive715({
		height: "310px",
	})}
	${miniPhoneResponsive685({
		width: "260px",
		height: "300px",
	})}
		${mobile({
		width: "270px",
		height: "250px",
	})}
	${mobile480({
		width: "380px",
	})}
`;

const ListItemImg = styled.img`
	width: 90%;
	height: 100px;
	object-fit: cover;
	border-radius: 5px;
	overflow: hidden;
`;

const Desc = styled.p`
	margin-top: 10px;
	font-size: 15px;
`;

const Price = styled.p`
	margin: 10px 0px;
	font-weight: 500;
`;

const Button = styled.button`
	width: 100%;
	padding: 5px;
	cursor: pointer;
	font-size: 16px;
	font-weight: 500;
	background-color: #08173b;
	color: white;
	border: none;
`;

const ProductListItem = ({ item }) => {
	return (
		<Link to={`/products/${item._id}`}>
			<ListItem>
				<ListItemImg src={item.image} />
				<Desc>
					{item.description.length < 100
						? item.description
						: item.description.substring(0, 120)}
				</Desc>

				<Price>$ {item.price}</Price>
				<Button>View</Button>
			</ListItem>
		</Link>
	);
};

export default ProductListItem;
