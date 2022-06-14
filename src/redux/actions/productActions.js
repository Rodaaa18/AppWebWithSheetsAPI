import { ADD_PRODUCTS, REMOVE_PRODUCTS } from "../types/productTypes";

export const addProducts = (payload) => {
  return {
    type: ADD_PRODUCTS,
    payload,
  };
};

export const removeProducts = (payload) => {
  return {
    type: REMOVE_PRODUCTS,
    payload,
  };
};
