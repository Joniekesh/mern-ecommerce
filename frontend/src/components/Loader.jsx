import styled from "styled-components";

const Container = styled.div`
	border: 8px solid #f3f3f3;
	border-radius: 50%;
	border-top: 8px solid #08173b;
	border-bottom: 8px solid #08173b;
	width: 30px;
	height: 30px;
	margin: auto;
	-webkit-animation: spin 2s linear infinite;
	animation: spin 2s linear infinite;

	@-webkit-keyframes spin {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

const Loader = () => {
	return <Container></Container>;
};

export default Loader;
