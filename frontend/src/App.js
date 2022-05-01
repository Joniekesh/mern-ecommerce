import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

const App = () => {
	const user = true;

	return (
		<Router>
			<Navbar user={user} />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/cart">
					<Cart />
				</Route>
				<Route path="/category/:id">
					<Category />
				</Route>
				<Route path="/products/:id">
					<Product />
				</Route>
				<Route path="/profile">
					<Profile />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
