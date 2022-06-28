import styled from "styled-components";
import CategoryListItem from "./CategoryListItem";
import Loader from "./Loader";

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
	gap: 10px;
`;

const CategoryList = ({ categories, isLoading }) => {
	return (
		<Container>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Top>
						<Text>POPULAR CATEGORIES</Text>
						<Right>SEE ALL</Right>
					</Top>
					<Bottom>
						<CatList>
							{categories?.length > 0 &&
								categories.map((category) => (
									<CategoryListItem category={category} key={category._id} />
								))}
						</CatList>
					</Bottom>
				</>
			)}
		</Container>
	);
};

export default CategoryList;
