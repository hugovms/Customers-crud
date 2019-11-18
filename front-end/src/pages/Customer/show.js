import React from 'react';

import { ModalButton, Pagination } from '../../components';

import { CustomerService } from '../../service/crud-service';

export default class CustomerShow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            customerList: []
        }
    }

    componentDidMount() {
        document.title = this.props.title
        this.getById();
    }

    getById = async () => {
        let routeId = this.props.routeProps.match.params.id;

        try {
            let result = await CustomerService.GetById(routeId);

            await this.setState({
                customerList: result.data
            });
        } catch (err) {
            console.log(err);
        }

        return
    }

    formatCpf() {
        let cpf = this.state.customerList.cpf;

        if (cpf !== undefined) {
            cpf = cpf.slice(0, 3) + '.' + cpf.slice(3)
            cpf = cpf.slice(0, 7) + '.' + cpf.slice(7)
            cpf = cpf.slice(0, 11) + '-' + cpf.slice(11)
            return (
                <span>{cpf}</span>
            )
        } else {
            return (
                <span><i className="fa fa-spinner fa-spin"></i></span>
            )
        }
    }

    formatCep(cep) {
        if (cep !== undefined) {
            cep = cep.slice(0, 5) + '-' + cep.slice(5)
            return (
                <span>{cep}</span>
            )
        } else {
            return (
                <span><i className="fa fa-spinner fa-spin"></i></span>
            )
        }
    }

    formatPhone(phone) {
        if (phone.length === 10) {
            phone = phone.slice(0, 0) + '(' + phone.slice(0);
            phone = phone.slice(0, 3) + ')' + phone.slice(3);
            phone = phone.slice(0, 8) + '-' + phone.slice(8);
        }
        if (phone.length === 11) {
            phone = phone.slice(0, 0) + '(' + phone.slice(0);
            phone = phone.slice(0, 3) + ')' + phone.slice(3);
            phone = phone.slice(0, 4) + ' ' + phone.slice(4);
            phone = phone.slice(0, 6) + ' ' + phone.slice(6);
            phone = phone.slice(0, 11) + '-' + phone.slice(11);
        }
        return (
            <span>{phone}</span>
        )
    }

    render() {
        console.log(this.state.customerList);
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="card shadow rounded-1">
                        <div className="card-body">
                            <div className="row">
                            </div>
                            <div>
                                <ul>
                                    <li>Nome: {this.state.customerList.name}</li>
                                    <li>CPF: {this.formatCpf()}</li>
                                    {this.state.customerList.mail !== undefined &&
                                        <div>
                                            {
                                                this.state.customerList.mail.map((mail, index) => {
                                                    return (
                                                        <ul key={index}>
                                                            <hr />
                                                            <li>Email #{index + 1} : {mail.mail}</li>
                                                        </ul>
                                                    )
                                                })
                                            }
                                        </div>
                                    }

                                    {this.state.customerList.phone !== undefined &&
                                        <div>
                                            {
                                                this.state.customerList.phone.map((phone, index) => {
                                                    return (
                                                        <ul key={index}>
                                                            <hr />
                                                            <li>Telefone #{index + 1}: {this.formatPhone(phone.phoneNumber)}</li>
                                                            <li>Tipo: {phone.type.name}</li>
                                                        </ul>
                                                    )
                                                })
                                            }
                                        </div>
                                    }

                                    {this.state.customerList.address !== undefined &&
                                        <div>
                                            {
                                                this.state.customerList.address.map((address, index) => {
                                                    return (
                                                        <ul key={index}>
                                                            <hr />
                                                            <span>Endereço #{index + 1}: </span>
                                                            <li>CEP: {this.formatCep(address.cep)}</li>
                                                            <li>Logradouro: {address.street}</li>
                                                            <li>Bairro: {address.neighborhood}</li>
                                                            <li>Complemento: {address.complement}</li>
                                                            <li>Cidade: {address.city}</li>
                                                            <li>Estado: {address.state}</li>
                                                        </ul>
                                                    )
                                                })
                                            }
                                        </div>
                                    }

                                    {this.state.customerList.address === undefined &&
                                        <div>
                                            Nenhum registro encontrado!
                                </div>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export {
    CustomerShow
}