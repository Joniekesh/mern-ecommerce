import styled from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReview } from "../redux/apiCalls/productApiCalls";
import { toast } from "react-toastify";

const Container = styled.div`
	margin: 24px 0px;
	width: 70%;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Select = styled.select`
	width: 100px;
	padding: 5px;
	font-size: 16px;
`;

const Option = styled.option``;

const TextArea = styled.textarea`
	margin: 16px 0px;
	padding: 8px;
	font-size: 16px;
	border: 1px solid #08173b;
`;

const Button = styled.button`
	width: 100px;
	padding: 8px;
	font-size: 16px;
	background-color: #08173b;
	color: white;
	font-weight: 500;
	cursor: pointer;
	border: none;
	transition: all 0.4s ease;
	&:hover {
		transform: scale(1.07);
	}
`;

const ReviewForm = ({ product }) => {
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);
	const { currentUser } = user;

	const submitHandler = async (e) => {
		e.preventDefault();

		const newReview = {
			user: currentUser.user._id,
			name: currentUser.user.name,
			rating,
			comment,
		};

		if (product.reviews.includes(currentUser.user)) {
			toast.error("Product already reviewed", { theme: "colored" });
		} else {
			dispatch(addReview(product._id, newReview));
			toast.success("Review added", { theme: "colored" });
		}
	};

	return (
		<Container>
			<Form onSubmit={submitHandler}>
				<Select value={rating} onChange={(e) => setRating(e.target.value)}>
					<Option value="">Select...</Option>
					<Option value="1">1 - Poor</Option>
					<Option value="2">2 - Fair</Option>
					<Option value="3">3 - Good</Option>
					<Option value="4">4 - Very Good</Option>
					<Option value="5">5 - Excellent</Option>
				</Select>
				<TextArea
					rows="3"
					placeholder="Add Review"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				></TextArea>
				<Button type="submit">Submit</Button>
			</Form>
		</Container>
	);
};

export default ReviewForm;
