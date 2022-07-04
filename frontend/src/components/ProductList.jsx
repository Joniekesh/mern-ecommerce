import styled from "styled-components";
import { useEffect, useState } from "react";
import ProductListItem from "./ProductListItem";
import axios from "axios";
import { axiosInstance } from "../utils/config";

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

const ProductList = ({ home, cat, filters, sorting }) => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const res = await axiosInstance.get(
					cat ? `/products?cat=${cat}` : "/products"
				);
				setProducts(res.data);
			} catch (error) {}
		};

		getProducts();
	}, [cat]);

	useEffect(() => {
		cat &&
			setFilteredProducts(
				products.filter((item) =>
					Object.entries(filters).every(([key, value]) =>
						item[key].includes(value)
					)
				)
			);
	}, [cat, products, filters]);

	useEffect(() => {
		if (sorting === "newest") {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => a.createdAt - b.createdAt)
			);
		} else if (sorting === "asc") {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => a.price - b.price)
			);
		} else {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => b.price - a.price)
			);
		}
	}, [sorting]);

	return (
		<Container>
			<>
				{home && (
					<Top>
						<Text>POPULAR PRODUCTS</Text>
						<Right>SEE ALL</Right>
					</Top>
				)}
				<Bottom>
					<List>
						{cat
							? filteredProducts.map((item) => (
									<ProductListItem item={item} key={item._id} />
							  ))
							: products.map((item) => (
									<ProductListItem item={item} key={item._id} />
							  ))}
					</List>
				</Bottom>
			</>
		</Container>
	);
};

export default ProductList;
