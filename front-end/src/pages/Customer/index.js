import React from 'react';

import { ModalButton, Pagination } from '../../components';

import { CustomerService } from '../../service/crud-service';

import CustomerForm from "./form";

export default class Customer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            perPage: 10,
            totalPages: 0,
            isAdmin: localStorage.getItem('admin'),
            customerList: []
        }
    }

    componentDidMount() {
        document.title = this.props.title
        this.handlePagination(this.state.currentPage, this.state.perPage);
    }

    handlePagination = async (currentPage, perPage) => {

        try {
            var result = await CustomerService.List();
            console.log(result);

            await this.setState({
                customerList: result.data,
                totalPages: result.data.lastPage,
                currentPage: result.data.page,
                perPage: result.data.perPage
            });

            console.log(result)
        } catch (err) {
            console.error(err);
        }
    };

    formatCpf(cpf) {
        cpf = cpf.slice(0, 3) + '.' + cpf.slice(3)
        cpf = cpf.slice(0, 7) + '.' + cpf.slice(7)
        cpf = cpf.slice(0, 11) + '-' + cpf.slice(11)
        return (
            <span>{cpf}</span>
        )
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

    onClickPagination = async (page) => {
        await this.setState({ currentPage: page });

        this.handlePagination(page, this.state.perPage);
    };

    CancelCustomer = async (id) => {
        try {
            const cancel = await CustomerService.CancelCustomer(id)
            await this.handlePagination(this.state.currentPage, this.state.perPage);
            return cancel
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="card shadow rounded-1">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                {this.state.isAdmin === '1' ? <a href="/customer/new" className="float-right btn btn-success shadow">Cadastrar novo cliente</a> : '' }
                                </div>
                            </div>
                            {this.state.customerList.length > 0 &&
                                <div>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>CPF</th>
                                                <th>Telefone</th>
                                                <th>Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.customerList.map((customer, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{customer.name}</td>
                                                            <td>{this.formatCpf(customer.cpf)}</td>
                                                            <td>{this.formatPhone(customer.phone[0].phoneNumber)}</td>
                                                            <td>{customer.mail[0].mail}</td>
                                                            <td>
                                                                <div className="row justify-content-end">
                                                                    <div className="row">
                                                                        <a className=" btn btn-primary mr-2" role="button" href={"/customer/show/" + customer.id}>
                                                                            Ver Cliente
                                                                        </a>
                                                                            {this.state.isAdmin === '1' ? <a className=" btn btn-success" role="button" href={"/customer/edit/" + customer.id}>Editar</a> : '' }
                                                                            {this.state.isAdmin === '1' ? <ModalButton color="danger" buttonText="Cancelar" acceptButtonText="Excluir cliente" text="Deseja realmente excluir esse cliente?" accept={() => { this.CancelCustomer(customer.id) }} /> : '' }
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            }

                            {this.state.customerList.length === 0 &&
                                <div>
                                    Nenhum registro encontrado!
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export {
    CustomerForm
}