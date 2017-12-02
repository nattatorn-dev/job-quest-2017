import { combineReducers } from "redux";
import cart from "../reducers/cart";
import catalog from "../reducers/catalog";

export default combineReducers({
  cart,
  catalog
});
