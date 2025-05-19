import {baseService} from "./BaseService";

export class OrderItemService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    };
    insertOrder  = (body) => {
        return  this.post('api/v1/order',body)
    }
    historyOrders = (params, userId) => {
        const {
            page = 0,
            size = 5,
            orderStatus = null,
            sort = null
        } = params;

        const queryParams = new URLSearchParams();
        queryParams.append('page', page);
        queryParams.append('size', size);

        // Only add optional parameters if they exist
        if (orderStatus) queryParams.append('orderStatus', orderStatus);
        if (sort) queryParams.append('sort', sort);

        return this.get(`api/v1/order/history/${userId}?${queryParams.toString()}`, true);
    }
}
export const orderItemService = new OrderItemService ();