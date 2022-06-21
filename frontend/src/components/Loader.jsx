import styled from "styled-components";

const Container = styled.div`
	border: 3px solid #f3f3f3;
	border-radius: 50%;
	border-top: 3px solid #08173b;
	border-bottom: 3px solid #08173b;
	width: 36px;
	height: 36px;
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
