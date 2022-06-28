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
} from "../responsive";

const CatListItem = styled.div`
	position: relative;
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
	})}
	${responsive908({
		width: "170px",
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
	${miniPhoneResponsive685({
		width: "260px",
		height: "300px",
	})}
		${mobile({
		width: "100vw",
		height: "350px",
	})}
`;

const ItemText = styled.h3`
	text-align: center;
	font-weight: 500;
`;

const ItemImage = styled.img`
	width: 90%;
	height: 200px;
	object-fit: cover;
	border-radius: 5px;
	overflow: hidden;
	${mobile({
		width: "100%",
	})}
`;

const Button = styled.button`
	position: absolute;
	padding: 8px;
	font-weight: 500;
	border: none;
	background-color: teal;
	color: white;
	cursor: pointer;
`;

const CategoryListItem = ({ category }) => {
	return (
		<Link to={`/category/${category.name}`}>
			<CatListItem>
				<ItemText>{category.name}</ItemText>
				<ItemImage src={category.photo} />
				<Button>SHOP NOW</Button>
			</CatListItem>
		</Link>
	);
};

export default CategoryListItem;
