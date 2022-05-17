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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import AdminDashboard from "./pages/admin/AdminDashboard";

const App = () => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user.currentUser);

	// const TOKEN = user?.token;

	// useEffect(() => {
	// 	TOKEN && dispatch(getCurrentUser());
	// }, [dispatch, TOKEN]);

	return (
		<Router>
			<ToastContainer />
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
				<Route path="/shipping">
					<Shipping />
				</Route>
				<Route path="/payment">
					<Payment />
				</Route>
				<Route path="/placeorder">
					<PlaceOrder />
				</Route>
				<Route path="/order">
					<Order />
				</Route>
				<Route path="/admin/dashboard">
					<AdminDashboard />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
