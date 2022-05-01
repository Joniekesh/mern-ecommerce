import styled from "styled-components";
import CategoryList from "../components/CategoryList";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import ProductList from "../components/ProductList";
// import TopRatedProducts from "../components/TopRatedProducts";

const Container = styled.div`
	max-width: 1200px;
	overflow: hidden;
	overflow-x: hidden;
	margin: auto;
	margin-top: 7rem;
	/* margin-bottom: 3rem; */
	padding: 0 2rem;
`;
const Home = () => {
	return (
		<div>
			<Navbar />
			<Container>
				{/* <TopRatedProducts /> */}
				<CategoryList />
				<ProductList home />
				<NewsLetter />
			</Container>
			<Footer />
		</div>
	);
};

export default Home;
