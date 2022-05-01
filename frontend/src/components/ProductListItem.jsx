import styled from "styled-components";
import { Link } from "react-router-dom";

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
`;

const ListItemImg = styled.img`
	width: 90%;
	height: 90%;
	object-fit: cover;
	border-radius: 5px;
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
	background-color: purple;
	color: white;
	border: none;
`;

const ProductListItem = () => {
	return (
		<Link to="/products/111">
			<ListItem>
				<ListItemImg src="/assets/image8.jpg" />
				<Desc>
					Play ear piece Pro max with high specs and affordable. Buy and enjoy
					good sound in music
				</Desc>

				<Price>$ 99.99</Price>
				<Button>View</Button>
			</ListItem>
		</Link>
	);
};

export default ProductListItem;
