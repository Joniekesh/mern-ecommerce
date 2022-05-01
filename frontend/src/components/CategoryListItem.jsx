import styled from "styled-components";
import { Link } from "react-router-dom";

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
`;

const ItemText = styled.p`
	text-align: center;
	font-weight: 500;
`;

const ItemImage = styled.img`
	width: 90%;
	height: 90%;
	object-fit: cover;
	border-radius: 5px;
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

const CategoryListItem = () => {
	return (
		<Link to="/category/111">
			<CatListItem>
				<ItemText>PHONES</ItemText>
				<ItemImage src="assets/image11.jpg" />
				<Button>SHOP NOW</Button>
			</CatListItem>
		</Link>
	);
};

export default CategoryListItem;
