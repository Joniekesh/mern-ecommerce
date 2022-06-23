import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SideBar from "../../components/admin/SideBar";
import { Link } from "react-router-dom";
import {
	adminGetProducts,
	deleteProduct,
} from "../../redux/adminRedux/adminApiCalls";
import { useEffect } from "react";
import Loader from "../../components/Loader";

const Container = styled.div`
	max-width: 1200px;
	overflow: hidden;
	margin: auto;
	margin-top: 7rem;
	padding: 0 2rem;
`;

const LeftContainer = styled.div`
	flex: 1.5;
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	background-color: white;
	padding: 10px;
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	z-index: 10;
	overflow: hidden;
`;

const RightContainer = styled.div`
	flex: 10;
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	background-color: white;
	padding: 10px;
	overflow-x: auto;
	margin-left: 80px;
	margin-left: 205px;
`;

const Top = styled.div`
	margin-bottom: 10px;
	position: relative;
`;

const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	color: teal;
	font-weight: 500;
`;

const AddUser = styled.button`
	padding: 6px;
	font-weight: 500;
	cursor: pointer;
	color: teal;
	position: absolute;
	top: 0px;
	right: 5px;
`;

const Title = styled.h2``;

const TableDiv = styled.table`
	width: 100%;
`;

const Table = styled.table`
	border-collapse: collapse;
	border-spacing: 0;
	width: 100%;
	border: 1px solid #ddd;
`;

const TableHead = styled.thead``;
const TableBody = styled.tbody``;

const TableRow = styled.tr`
	&:nth-child(even) {
		background-color: #f2f2f2;
	}
	&:hover {
		background-color: orange;
	}
`;

const UserContainer = styled.div`
	display: flex;
	align-items: center;
`;
const UserImage = styled.img`
	width: 30px;
	height: 30px;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 8px;
`;
const UserName = styled.p``;

const TableHeading = styled.th`
	text-align: left;
	padding: 8px;
`;

const TableData = styled.td`
	text-align: left;
	padding: 8px;
`;

const ActionDiv = styled.div`
	display: flex;
	align-items: center;
`;

const View = styled.p`
	cursor: pointer;
	margin-right: 8px;
	color: green;
	background-color: #00800078;
	padding: 5px;
	border-radius: 4px;
`;

const Delete = styled.p`
	cursor: pointer;
	color: crimson;
	background-color: #dc143c7b;
	padding: 5px;
	border-radius: 4px;
`;

const Products = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user.currentUser.user);
	const adminProduct = useSelector((state) => state.adminProduct);
	const { products, isLoading } = adminProduct;

	if (!user.isAdmin) {
		toast.error("You are not authorized to access this route", {
			theme: "colored",
		});
		history.push("/");
	}

	useEffect(() => {
		dispatch(adminGetProducts());
	}, [dispatch]);

	const handleDelete = (id) => {
		dispatch(deleteProduct(id));
	};

	return (
		<Container>
			<LeftContainer>
				<SideBar />
			</LeftContainer>
			{isLoading ? (
				<Loader />
			) : (
				<RightContainer>
					<Top>
						<TitleContainer>
							<Title>PRODUCTS</Title>
						</TitleContainer>
						<Link to="/admin/createProduct">
							<AddUser>+ CREATE</AddUser>
						</Link>
					</Top>
					{products.length === 0 ? (
						<h4>No products to show</h4>
					) : (
						<TableDiv>
							<Table>
								<TableHead>
									<TableRow>
										<TableHeading>ID</TableHeading>
										<TableHeading>PRODUCT</TableHeading>
										<TableHeading>STOCK</TableHeading>
										<TableHeading>PRICE</TableHeading>
										<TableHeading>ACTION</TableHeading>
									</TableRow>
								</TableHead>
								<TableBody>
									{products.map((product) => (
										<TableRow key={product._id}>
											<TableData>{product._id}</TableData>
											<TableData>
												<UserContainer>
													<UserImage src={product.image} />
													<UserName>{product.name}</UserName>
												</UserContainer>
											</TableData>
											<TableData>{product.countInStock}</TableData>

											<TableData>$ {product.price}</TableData>
											<TableData>
												<ActionDiv>
													<Link to={`/admin/products/${product._id}`}>
														<View>View</View>
													</Link>
													<Delete onClick={() => handleDelete(product._id)}>
														Delete
													</Delete>
												</ActionDiv>
											</TableData>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableDiv>
					)}
				</RightContainer>
			)}
		</Container>
	);
};

export default Products;
