import "./index.css";
import { useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { getCurrentUser } from "./redux/apiCalls/userApiCalls";

const App = () => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user.currentUser);

	const TOKEN = user?.token;

	useEffect(() => {
		TOKEN && dispatch(getCurrentUser());
	}, [dispatch, TOKEN]);

	return (
		<Router>
			<Navbar user={user} />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/register">
					{user ? <Redirect to="/" /> : <Register />}
				</Route>
				<Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
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
