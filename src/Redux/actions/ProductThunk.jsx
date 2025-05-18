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