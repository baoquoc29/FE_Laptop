import {baseService} from "./BaseService";

export class ProductService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    };
    getProductDetailById = (id) => {
        return this.get(`api/v1/products/detail/${id}` , false);
    }
}
export const productService = new ProductService ();