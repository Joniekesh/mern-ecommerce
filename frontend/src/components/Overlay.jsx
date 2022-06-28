import styled from "styled-components";

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.8);
	z-index: 2;
`;

const Overlay = ({ overlay }) => {
	return overlay && <Container></Container>;
};

export default Overlay;
