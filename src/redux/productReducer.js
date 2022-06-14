import { ADD_PRODUCTS, REMOVE_PRODUCTS } from "./productTypes";

const initialState = {
    products: []
}
const productReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_PRODUCTS:
            return {
                products: state.products.concat(payload)
            };
        case REMOVE_PRODUCTS:
            return {
                products: state.products.filter(product => product.CODIGO_FABRICA !== payload.CODIGO_FABRICA),
            };
        default:
            return state;
}}; 


export default productReducer;