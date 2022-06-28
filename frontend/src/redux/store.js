import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/userRedux";
import categoryReducer from "./reducers/categoryRedux";
import productReducer from "./reducers/productRedux";
import cartReducer from "./reducers/cartRedux";
import shippingAddressReducer from "./reducers/shippingAddressRedux";
import paymentReducer from "./reducers/paymentRedux";
import orderReducer from "./reducers/orderRedux";
import orderPayReducer from "./reducers/orderPayRedux";
import orderDeliverReducer from "./reducers/orderDeliverRedux";
import profileReducer from "./reducers/profileRedux";
import myOrderReducer from "./reducers/myOrderRedux";
import adminOrderReducer from "./adminRedux/adminOrderRedux";
import adminUserReducer from "./adminRedux/adminUserRedux";
import adminProductReducer from "./adminRedux/adminProductRedux";
import adminUserStatsReducer from "./adminRedux/adminUserStatsRedux";
import adminUpdateProductReducer from "./adminRedux/adminUpdateProductRedux";
import adminUpdateUserReducer from "./adminRedux/adminUpdateUserRedux";
import updateMyProfileReducer from "./reducers/updateMyProfileRedux";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
};

const rootReducer = combineReducers({
	user: userReducer,
	category: categoryReducer,
	product: productReducer,
	cart: cartReducer,
	shipping: shippingAddressReducer,
	payment: paymentReducer,
	order: orderReducer,
	orderPay: orderPayReducer,
	orderDeliver: orderDeliverReducer,
	profile: profileReducer,
	updateMyProfile: updateMyProfileReducer,
	myOrder: myOrderReducer,
	adminOrder: adminOrderReducer,
	adminUser: adminUserReducer,
	adminUserStats: adminUserStatsReducer,
	adminUpdateUser: adminUpdateUserReducer,
	adminProduct: adminProductReducer,
	adminUpdateProduct: adminUpdateProductReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export let persistor = persistStore(store);
