import styled from "styled-components";
import ProductListItem from "./ProductListItem";

const Container = styled.div`
	margin: 20px 0px;
	background-color: white;
	padding: 10px;
	border-radius: 5px;
`;

const Top = styled.div`
	display: flex;
	justify-content: space-between;
	color: white;
	background-color: purple;
	padding: 10px;
	margin-bottom: 10px;
`;

const Text = styled.p`
	font-size: 24px;
`;

const Right = styled.span`
	cursor: pointer;
	border-bottom: 2px dotted white;
`;

const Bottom = styled.div``;

const List = styled.ul`
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
`;

const ProductList = ({ home }) => {
	return (
		<Container>
			{home && (
				<Top>
					<Text>POPULAR PRODUCTS</Text>
					<Right>SEE ALL</Right>
				</Top>
			)}
			<Bottom>
				<List>
					<ProductListItem />
					<ProductListItem />
					<ProductListItem />
					<ProductListItem />
					<ProductListItem />
					<ProductListItem />
					<ProductListItem />
					<ProductListItem />
				</List>
			</Bottom>
		</Container>
	);
};

export default ProductList;
