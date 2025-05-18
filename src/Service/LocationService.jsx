import {baseService} from "./BaseService";

export class LocationService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    };
    getProvinces  = () => {
        return  this.get('api/v1/provinces',true)
    }
    getDistrict  = (provinceId) => {
        return  this.get(`api/v1/districts/${provinceId}`,true)
    }
    getWards  = (wardId) => {
        return  this.get(`api/v1/wards/${wardId}`,true)
    }
}
export const locationService = new LocationService ();