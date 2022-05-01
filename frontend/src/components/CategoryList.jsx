import styled from "styled-components";
import CategoryListItem from "./CategoryListItem";

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
	background-color: orange;
	padding: 10px;
`;

const Text = styled.p`
	font-size: 24px;
`;

const Right = styled.span`
	cursor: pointer;
	border-bottom: 2px dotted white;
`;

const Bottom = styled.div`
	margin: 10px 0px;
`;

const CatList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
`;

const CategoryList = () => {
	return (
		<Container>
			<Top>
				<Text>POPULAR CATEGORIES</Text>
				<Right>SEE ALL</Right>
			</Top>
			<Bottom>
				<CatList>
					<CategoryListItem />
					<CategoryListItem />
					<CategoryListItem />
					<CategoryListItem />
					<CategoryListItem />
					<CategoryListItem />
					<CategoryListItem />
					<CategoryListItem />
				</CatList>
			</Bottom>
		</Container>
	);
};

export default CategoryList;
