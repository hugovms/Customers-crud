import { BaseService } from '../react';

class CustomerService extends BaseService {

    List(page, perPage) {
        return this.CreateRequest("GET", `/customers`, {},
            {
                page: page,
                perPage: perPage
            });
    }

    async index() {
        let array = await this.CreateRequest('GET', '/customers');
        return array;
    }

    async getAll() {
        return await this.CreateRequest('GET', '/customers');
    }

    Create(data) {
        const { name, email, cpf, phone, address } = data;

        //Remove ponto e traço do cpf
        let formattedCpf = cpf.replace(/[.]|[-]/g, '');

        let phoneArr = [];
        //Formata o array de telefones e remove caracteres especiais para salvar corretamente no back-end
        phone.forEach((el) => {
            el.type = el.type === "" ? "1" : el.type;
            el.phoneNumber = el.phoneNumber.replace(/[(]|[)]|[-]/g, '');
            phoneArr.push({ phoneNumber: el.phoneNumber, type: { id: el.type } })
            console.log(el.phoneNumber)
        });

        let addressArr = [];
        //Remove traço do CEP e formata envio de dados para o back-end
        address.forEach((el) => {
            el.cep = el.cep.replace(/[-]/g, '');
            addressArr.push(
                {
                    cep: el.cep,
                    city: el.city,
                    complement: el.complement,
                    neighborhood: el.neighborhood,
                    state: el.state,
                    street: el.street
                })
        });
        return this.CreateRequest("POST", '/customer',
            {
                name: name,
                mail: email,
                cpf: formattedCpf,
                phone: phoneArr,
                address: address
            })
    };

    async GetById(id) {
        let data = await this.CreateRequest('GET', `/customer/` + id)
        return data
    }

    async CancelCustomer(id) {
        return await this.CreateRequest('DELETE', `/customer/${id}`)
    }


    Update(id, data) {
        const { name, email, cpf, phone, address } = data;

        //Remove ponto e traço do cpf
        let formattedCpf = cpf.replace(/[.]|[-]/g, '');

        let phoneArr = [];
        //Formata o array de telefones e remove caracteres especiais para salvar corretamente no back-end
        phone.forEach((el) => {
            el.type = el.type === "" ? 1 : el.type;
            el.phoneNumber = el.phoneNumber.replace(/[(]|[)]|[-]/g, '');
            phoneArr.push({ id: el.id, phoneNumber: el.phoneNumber, type: el.type })
        });

        let addressArr = [];
        //Remove traço do CEP e formata envio de dados para o back-end
        address.forEach((el) => {
            el.cep = el.cep.replace(/[-]/g, '');
            addressArr.push(
                {
                    id: el.id,
                    cep: el.cep,
                    city: el.city,
                    complement: el.complement,
                    neighborhood: el.neighborhood,
                    state: el.state,
                    street: el.street
                })
        });

        return this.CreateRequest('PUT', `/customer/${id}`,
            {
                name: name,
                mail: email,
                cpf: formattedCpf,
                phone: phoneArr,
                address: address
            }).then((data) => {
                console.log(data);
            })
    }
}

export default new CustomerService();