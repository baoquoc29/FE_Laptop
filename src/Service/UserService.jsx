import {baseService} from "./BaseService";

export class UserService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    };
    register = (username,password,fullName,email) => {
        return this.post('api/v1/auth/register',{username,email,password,fullName})
    }
    login = (username,password) => {
        return this.post('api/v1/auth/login',{username,password})
    }
    changePassword = (currentPassword, newPassword,confirmPassword) => {
        return this.post('api/v1/auth/change-password',{currentPassword, newPassword,confirmPassword})
    }
    getBalanceOfUser = (id) => {
        return this.get(`api/v1/auth/balance/${id}`,true);
    }
    informationUser = (username) => {
        return this.get(`api/v1/auth/${username}`);
    }
    adminGetAllUser = (keyword, page,size) => {
        const params = new URLSearchParams({
            keyword: keyword,
            page: page,
            size: size,
        }).toString();
        return this.get(`api/v1/users/admin?${params}`, true);
    }
    blockUser = (userId) => {
        return this.put(`api/v1/users/block/${userId}`,{});
    }

}
export const userService = new UserService ();