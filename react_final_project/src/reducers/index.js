import { combineReducers } from "redux";
import AuthReducers from "./authreducers";
import Products from "./getProduct";

export default combineReducers({ auth: AuthReducers, products: Products });
