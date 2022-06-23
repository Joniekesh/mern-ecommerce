import styled from "styled-components";
import SideBar from "../../components/admin/SideBar";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { adminCreateProduct } from "../../redux/adminRedux/adminApiCalls";
import axios from "axios";

const Container = styled.div`
	max-width: 1200px;
	overflow: hidden;
	margin: auto;
	margin-top: 8rem;
	padding: 0 4rem;
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
	margin-left: 170px;
	border-radius: 5px;
`;

const Title = styled.h2`
	color: teal;
`;

const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
`;

const FormGroup = styled.div`
	margin: 8px 0;
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
	width: 90%;
	padding: 8px;
	font-size: 16px;
`;

const Button = styled.button`
	border: none;
	padding: 6px;
	width: 100px;
	background-color: teal;
	color: white;
	cursor: pointer;
	border-radius: 5px;
	font-size: 16px;
	&:hover {
		opacity: 0.8;
	}
`;

const CreateProduct = () => {
	const [file, setFile] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [countInStock, setCountInStock] = useState(0);
	const [price, setPrice] = useState(0);
	const [categories, setCategories] = useState([]);
	const [size, setSize] = useState([]);
	const [color, setColor] = useState([]);

	const history = useHistory();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user.currentUser.user);

	if (!user.isAdmin) {
		toast.error("You are not authorized to access this route", {
			theme: "colored",
		});
		history.push("/");
	}

	const handleCategories = (e) => {
		setCategories(e.target.value.split(","));
	};

	const handleSize = (e) => {
		setSize(e.target.value.split(","));
	};

	const handleColor = (e) => {
		setColor(e.target.value.split(","));
	};

	const handleCreate = async (e) => {
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
				user: user._id,
				name,
				description,
				countInStock,
				price,
				categories,
				color,
				size,
				image: url,
			};
			dispatch(adminCreateProduct(product));
			window.location.reload();
			history.push("/admin/products");
			toast.success("Product Created", { theme: "colored" });
		} catch (error) {}
	};

	return (
		<Container>
			<LeftContainer>
				<SideBar />
			</LeftContainer>
			<RightContainer>
				<Title>New Product</Title>
				<Form>
					<FormGroup>
						<Label htmlFor="file">Image</Label>
						<Input
							type="file"
							id="file"
							onChange={(e) => setFile(e.target.files[0])}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Name</Label>
						<Input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Description</Label>
						<Input
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Categories</Label>
						<Input type="text" value={categories} onChange={handleCategories} />
					</FormGroup>
					<FormGroup>
						<Label>Color</Label>
						<Input type="text" value={color} onChange={handleColor} />
					</FormGroup>
					<FormGroup>
						<Label>Size</Label>
						<Input type="text" size={size} onChange={handleSize} />
					</FormGroup>
					<FormGroup>
						<Label>Count In Stock</Label>
						<Input
							type="number"
							value={countInStock}
							onChange={(e) => setCountInStock(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Price</Label>
						<Input
							type="number"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</FormGroup>
				</Form>
				<Button onClick={handleCreate}>Create</Button>
			</RightContainer>
		</Container>
	);
};

export default CreateProduct;
