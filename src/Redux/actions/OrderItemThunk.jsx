import { orderItemService } from "../../Service/OrderItemService";

export const insertOrder = (body) => async (dispatch) => {
    try {
        console.log("📦 Đang gửi order:", body);

        const response = await orderItemService.insertOrder(body);

        console.log("✅ Phản hồi từ server:", response);

        const code = response?.code;

        if (code) {
            dispatch({
                type: "INSERT_ORDER",
                payload: response,
            });
        } else {
            console.warn("⚠️ Server không trả về dữ liệu order.");
        }

        return response;
    } catch (error) {
        console.error("❌ Lỗi khi gửi đơn hàng:");

        if (error.response?.data?.message) {
            console.error("🧨 API Error:", error.response.data.message);
        } else {
            console.error("🧨 Lỗi không xác định:", error.message);
        }

        throw error; // Rất quan trọng nếu phía gọi muốn biết lỗi
    }
};
export const getAllHistoryOrder = (page,size,orderStatus,sort,userId) => async (dispatch) => {
    try {

        const response = await orderItemService.historyOrders({page,size,orderStatus,sort},userId);

        if (response.data) {
            dispatch({
                type: "HISTORY_ORDER",
                payload: response.data,
            });
        } else {
            console.warn("⚠️ Server không trả về dữ liệu order.");
        }

        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi gửi đơn hàng:");

        if (error.response?.data?.message) {
            console.error("🧨 API Error:", error.response.data.message);
        } else {
            console.error("🧨 Lỗi không xác định:", error.message);
        }

        throw error; // Rất quan trọng nếu phía gọi muốn biết lỗi
    }
};

export const refundOrder = (orderId) => async (dispatch) => {
    try {

        const response = await orderItemService.refund(orderId);

        if (response) {
            dispatch({
                type: "REFUND_ORDER",
                payload: response,
            });
        } else {
            console.warn("⚠️ Server không trả về dữ liệu order.");
        }

        return response;
    } catch (error) {
        console.error("❌ Lỗi khi gửi đơn hàng:");

        throw error;
    }
};