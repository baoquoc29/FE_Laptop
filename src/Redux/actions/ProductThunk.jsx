import { productService } from "../../Service/ProductService";

export const getProductDetailById = (id) => async (dispatch) => {
    try {
        const res = await productService.getProductDetailById(id);
        console.log("Cart items response:", res);

        if (res && res.data) {
            dispatch({
                type: "PRODUCT_DETAIL",
                payload: res.data,
            });
        } else {
            console.log("No cart data found.");
        }
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            console.error("API Error:", error.response.data.message);
        } else {
            console.error("Unexpected error:", error.message);
        }
    }
};

export const searchProducts = (params) => async (dispatch) => {
    try {
        const res = await productService.searchProducts(params);
        console.log("Search products response:", res);

        if (res && res.data) {
            dispatch({
                type: "PRODUCT_SEARCH_SUCCESS",
                payload: res.data
            });
        } else {
            console.log("No product data found.");
        }

        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            console.error("API Error:", error.response.data.message);
        } else {
            console.error("Unexpected error:", error.message);
        }

        dispatch({
            type: "PRODUCT_SEARCH_FAILURE",
            payload: error.message
        });
    }
};

export const searchProductsDetail = (params) => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_SEARCH_REQUEST" });

        const res = await productService.searchDetailProducts(params);

        if (res && res.data) {
            dispatch({
                type: "PRODUCT_SEARCH_SUCCESS",
                payload: res.data
            });
        } else {
            dispatch({
                type: "PRODUCT_SEARCH_FAILURE",
                payload: "No product data found"
            });
        }

        return res.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch({
            type: "PRODUCT_SEARCH_FAILURE",
            payload: errorMessage
        });
    }
};

export const getAllCategories = () => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_REQUEST" });
        const response = await productService.getAllCategories();
        dispatch({
            type: "CATEGORY_SUCCESS",
            payload: response.data
        });
        return response.data;
    } catch (error) {
        dispatch({
            type: "CATEGORY_FAILURE",
            payload: error.response?.data?.message || error.message
        });
    }
};

export const getAllBrands = () => async (dispatch) => {
    try {
        dispatch({ type: "BRAND_REQUEST" });
        const response = await productService.getAllBrands();
        dispatch({
            type: "BRAND_SUCCESS",
            payload: response.data
        });
        return response.data;
    } catch (error) {
        dispatch({
            type: "BRAND_FAILURE",
            payload: error.response?.data?.message || error.message
        });
    }
};