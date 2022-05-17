import styled from "styled-components";
import Rating from "../Rating";
import { format } from "timeago.js";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #ebe5e5;
	width: 90%;
	overflow: hidden;
	padding: 16px;
	border-radius: 5px;
	margin-bottom: 10px;
`;

const ReviewerInfo = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
	font-weight: 500;
`;

const ReviewerName = styled.p``;

const ReviewTime = styled.span`
	font-size: 14px;
`;

const RatingContainer = styled.div`
	display: flex;
	margin-bottom: 10px;
	border-bottom: 1px solid #cac7c7;
`;

const RatingTextEquivalent = styled.span`
	margin-left: 20px;
	font-weight: 500;
	color: #08173b;
`;
const ReviewDesc = styled.p``;

const ReviewsListItem = ({ review }) => {
	return (
		<Container>
			<ReviewerInfo>
				<ReviewerName>{review.name}</ReviewerName>
				<ReviewTime>{format(review.createdAt)}</ReviewTime>
			</ReviewerInfo>
			<RatingContainer>
				<Rating rating={review.rating} />

				<RatingTextEquivalent>Exellent</RatingTextEquivalent>
			</RatingContainer>
			<ReviewDesc>{review.comment}</ReviewDesc>
		</Container>
	);
};

export default ReviewsListItem;
