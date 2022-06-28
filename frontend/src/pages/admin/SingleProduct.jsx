import styled from "styled-components";
import { useEffect, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import SideBar from "../../components/admin/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getProductById } from "../../redux/apiCalls/productApiCalls";
import Loader from "../../components/Loader";
import axios from "axios";
import { updateProduct } from "../../redux/adminRedux/adminApiCalls";
import { updateProductReset } from "../../redux/adminRedux/adminUpdateProductRedux";

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
	overflow-y: auto;
	margin-left: 180px;
`;

const Title = styled.h2`
	color: teal;
	margin-bottom: 8px;
`;

const ProductPerformance = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 10px;
	margin-bottom: 10px;
`;

const PerformanceContainer = styled.div`
	flex: 1;
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	background-color: white;
	padding: 10px;
`;

const DetailsContainer = styled.div`
	flex: 1;
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	background-color: white;
	padding: 10px;
`;

const SalesTitle = styled.h4``;

const DetailsTop = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 16px;
`;

const Image = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 20px;
`;

const ProductName = styled.p`
	font-weight: 500;
	font-size: 18px;
	color: teal;
`;

const DetailsDiv = styled.div`
	display: flex;
	align-items: center;
	margin: 10px 0;
`;

const DetailsKey = styled.p`
	margin-right: 20px;
	font-weight: 500;
`;

const DetailsValue = styled.p`
	color: gray;
`;

const DetailsBottom = styled.div``;

const ProductEdit = styled.div`
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	background-color: white;
	padding: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ProductEditLeft = styled.div`
	flex: 5;
`;

const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
`;

const FormGroup = styled.div`
	margin: 8px;
	display: flex;
	flex-direction: column;
	width: 300px;
`;

const Label = styled.label`
	color: #08173b;
	font-weight: 500;
	margin-bottom: 5px;
	font-size: 16px;
`;

const Input = styled.input`
	width: 95%;
	padding: 8px;
	font-size: 16px;
	outline: none;
`;

const ProductEditRight = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

const UpdateTop = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 16px;
`;

const UpdateImage = styled.img`
	width: 120px;
	height: 120px;
	border-radius: 6px;
	object-fit: cover;
	margin-right: 16px;
`;

const UpdateIcon = styled.span`
	color: teal;
	font-weight: 500;
	font-size: 24px;
	cursor: pointer;
`;

const UpdateButton = styled.button`
	border: none;
	padding: 6px;
	background-color: teal;
	color: white;
	cursor: pointer;
	border-radius: 5px;
	font-size: 16px;
	&:hover {
		opacity: 0.8;
	}
`;

const SingleProduct = () => {
	const product = useSelector((state) => state.product);
	const { product: singleProduct, isLoading } = product;

	const adminUpdateProduct = useSelector((state) => state.adminUpdateProduct);
	const { success } = adminUpdateProduct;

	const [file, setFile] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [categories, setCategories] = useState("");
	const [countInStock, setCountInStock] = useState("");
	const [color, setColor] = useState("");
	const [size, setSize] = useState("");

	const history = useHistory();

	const currentUser = useSelector((state) => state.user.currentUser);

	if (!currentUser.isAdmin) {
		toast.error("You are not authorized to access this route", {
			theme: "colored",
		});
		history.push("/");
	}

	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		if (success) {
			dispatch(updateProductReset());
			history.push("/admin/products");
		} else {
			if (!singleProduct.name || singleProduct._id !== id) {
				dispatch(getProductById(id));
			} else {
				setName(singleProduct.name);
				setDescription(singleProduct.description);
				setCountInStock(singleProduct.countInStock);
				setPrice(singleProduct.price);
				setCategories(singleProduct.categories);
				setColor(singleProduct.color);
				setSize(singleProduct.size);
			}
		}
	}, [history, dispatch, id, singleProduct, success]);

	const handleCategories = (e) => {
		setCategories(e.target.value.split(","));
	};

	const handleColor = (e) => {
		setColor(e.target.value.split(","));
	};

	const handleSize = (e) => {
		setSize(e.target.value.split(","));
	};

	const handleUpdate = async (e) => {
		e.preventDefault();

		const data = new FormData();
		data.append("file", file);
		data.append("upload_preset", "upload");

		try {
			const uploadRes = await axios.post(
				"https://api.cloudinary.com/v1_1/joniekesh/image/upload",
				data
			);

			const { url } = uploadRes.data;

			const product = {
				user: currentUser._id,
				name,
				description,
				countInStock,
				price,
				categories,
				color,
				size,
				image: url,
			};
			dispatch(updateProduct(id, product));
			toast.success("Product updated", { theme: "colored" });
			history.push("/admin/products");
			window.location.reload();
		} catch (error) {}
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
					<Title>Product</Title>
					<ProductPerformance>
						<PerformanceContainer>
							<SalesTitle>Sales details(last 3 months)</SalesTitle>
						</PerformanceContainer>
						<DetailsContainer>
							<DetailsTop>
								<Image src={singleProduct.image} alt="" />
								<Link to={`/products/${singleProduct._id}`}>
									<ProductName>{singleProduct.name}</ProductName>
								</Link>
							</DetailsTop>
							<DetailsBottom>
								<DetailsDiv>
									<DetailsKey>ID:</DetailsKey>
									<DetailsValue>{singleProduct._id}</DetailsValue>
								</DetailsDiv>
								<DetailsDiv>
									<DetailsKey>SALES:</DetailsKey>
									<DetailsValue>292</DetailsValue>
								</DetailsDiv>
								<DetailsDiv>
									<DetailsKey>IN STOCK:</DetailsKey>
									<DetailsValue>{singleProduct.countInStock}</DetailsValue>
								</DetailsDiv>
							</DetailsBottom>
						</DetailsContainer>
					</ProductPerformance>
					<ProductEdit>
						<ProductEditLeft>
							<Form>
								<FormGroup>
									<Label>Name</Label>
									<Input
										type="text"
										defaultValue={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</FormGroup>
								<FormGroup>
									<Label>Description</Label>
									<Input
										type="text"
										defaultValue={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</FormGroup>
								<FormGroup>
									<Label>Categories</Label>
									<Input
										type="text"
										defaultValue={categories}
										onChange={handleCategories}
									/>
								</FormGroup>
								<FormGroup>
									<Label>Color</Label>
									<Input
										type="text"
										defaultValue={color}
										onChange={handleColor}
									/>
								</FormGroup>
								<FormGroup>
									<Label>Size</Label>
									<Input
										type="text"
										defaultValue={size}
										onChange={handleSize}
									/>
								</FormGroup>
								<FormGroup>
									<Label>Count In Stock</Label>
									<Input
										type="number"
										defaultValue={countInStock}
										onChange={(e) => setCountInStock(e.target.value)}
									/>
								</FormGroup>
								<FormGroup>
									<Label>Price</Label>
									<Input
										type="number"
										defaultValue={price}
										onChange={(e) => setPrice(e.target.value)}
									/>
								</FormGroup>
							</Form>
						</ProductEditLeft>
						<ProductEditRight>
							<UpdateTop>
								{file ? (
									<UpdateImage src={URL.createObjectURL(file)} alt="" />
								) : (
									<UpdateImage src={singleProduct.image} alt="" />
								)}
								<Label htmlFor="fileInput">
									<UpdateIcon>
										<i className="fa-solid fa-upload"></i>
									</UpdateIcon>
								</Label>
								<Input
									type="file"
									id="fileInput"
									onChange={(e) => setFile(e.target.files[0])}
									style={{ display: "none" }}
								/>
							</UpdateTop>
							<UpdateButton onClick={handleUpdate}>Update</UpdateButton>
						</ProductEditRight>
					</ProductEdit>
				</RightContainer>
			)}
		</Container>
	);
};

export default SingleProduct;
