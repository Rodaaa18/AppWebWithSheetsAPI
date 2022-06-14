import { combineReducers } from "redux";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
  productStates: productReducer,
});

export default rootReducer;
