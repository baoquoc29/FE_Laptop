import {baseService} from "./BaseService";

export class OrderItemService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    };
    insertOrder  = (body) => {
        return  this.post('api/v1/order',body)
    }

}
export const orderItemService = new OrderItemService ();