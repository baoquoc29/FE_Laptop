import {baseService} from "./BaseService";

export class VoucherService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    };
    getAllVoucher = (page,size) => {
        return this.get(`api/v1/discounts/page?page=${page}&size=${size}`, false);
    }
}
export const voucherService = new VoucherService ();