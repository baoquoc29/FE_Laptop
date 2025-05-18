import { voucherService } from "../../Service/VoucherService";

export const getAllVoucher = (page,size) => async (dispatch) => {
    try {
        const res = await voucherService.getAllVoucher(page,size);
        if (res && res.data) {
            dispatch({
                type: "VOUCHER",
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