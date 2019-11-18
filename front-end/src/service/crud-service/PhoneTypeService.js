import { BaseService } from '../react';

class PhoneTypeService extends BaseService {

    async index () {
       return await this.CreateRequest('GET', '/phone-types');
    }
    
}

export default new PhoneTypeService();