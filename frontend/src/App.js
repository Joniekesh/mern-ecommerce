import "./index.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import CreateUser from "./pages/admin/CreateUser";
import CreateProduct from "./pages/admin/CreateProduct";
import SingleUser from "./pages/admin/SingleUser";
import SingleProduct from "./pages/admin/SingleProduct";

const App = () => {
	const user = useSelector((state) => state.user.currentUser);

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
				<Route path="/admin/users/:id">
					<SingleUser />
				</Route>
				<Route path="/admin/users">
					<Users />
				</Route>
				<Route path="/admin/createUser">
					<CreateUser />
				</Route>
				<Route path="/admin/products/:id">
					<SingleProduct />
				</Route>
				<Route path="/admin/products">
					<Products />
				</Route>
				<Route path="/admin/createProduct">
					<CreateProduct />
				</Route>
				<Route path="/admin/orders">
					<Orders />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
