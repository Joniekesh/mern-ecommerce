import styled from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReview } from "../redux/apiCalls/productApiCalls";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { mobile } from "../responsive";

const Container = styled.div`
	margin: 24px 0px;
	width: 70%;
	${mobile({
		width: "100%",
	})}
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
	const history = useHistory();

	const user = useSelector((state) => state.user.currentUser?.user);

	const alreadyReviewed = product?.reviews.find(
		(review) => review.user === user?._id
	);

	const submitHandler = async (e) => {
		e.preventDefault();

		const newReview = {
			user: user?._id,
			name: user?.name,
			rating,
			comment,
		};

		if (!user) {
			toast.error("Please login to add a review", { theme: "colored" });
			history.push("/login");
		} else if (!rating || !comment) {
			toast.error("All fields MUST be filled", { theme: "colored" });
		} else if (alreadyReviewed) {
			toast.error("Product already reviewed", { theme: "colored" });
		} else {
			dispatch(addReview(product._id, newReview));
			window.location.reload();
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
