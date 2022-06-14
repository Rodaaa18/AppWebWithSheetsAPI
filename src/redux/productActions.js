import {ADD_PRODUCTS, REMOVE_PRODUCTS} from "../redux/productTypes";

export const addProducts = (product) => {
    return {
        type: ADD_PRODUCTS,
        payload: product
    }
}

export const removeProducts = (product) => {
    return {
        type: REMOVE_PRODUCTS,
        payload: product
    }
}