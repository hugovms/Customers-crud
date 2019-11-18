import { BaseService } from '../react';
import axios from 'axios';

class UserLoginService extends BaseService {

    Login(username, password) {

        if (username === 'admin' && password === '123456') {
            return { admin: 1 };
        }

        if (username === 'surittec' && password === '123456') {
            return { admin: 0 };
        }
        return false;

        // return this.CreateRequest('POST', '/sessions',
        //     {
        //         email: email,
        //         password: password,
        //     })

    }


}

export default new UserLoginService();