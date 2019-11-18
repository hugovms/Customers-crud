import React from 'react'

import { ModalButton, Phone, Email } from '../../components';

import { CustomerService, PhoneTypeService } from '../../service/crud-service';

import Axios from "axios";

import InputMask from "react-input-mask";

export default class CustomerForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // Register States
            name: "",
            email: [{ mail: "" }],
            cpf: "",
            value: "",
            phone: [{ phoneNumber: "", type: "1" }],
            address: [{ street: "", cep: "", city: "", state: "", neighborhood: "", complement: "" }],
            phoneTypes: [],
            active: false,
            isDeleted: false,
            isAdmin: localStorage.getItem('admin'),
            // Validation States
            errorName: false,
        }
    }


    async componentDidMount() {

        let brutePhoneTypes = await PhoneTypeService.index();

        brutePhoneTypes = brutePhoneTypes.data;

        let phoneTypeArray = [];

        brutePhoneTypes.forEach((i) => {
            phoneTypeArray.push({ value: i.id, label: i.name });
        });

        this.setState({ phoneTypes: phoneTypeArray });

        try {
            var id = this.props.routeProps.match.params.id;
            var result = await CustomerService.GetById(id);
            var data = {};

            if (result.data) {
                data = result.data;
                this.setState({
                    name: data.name,
                    cpf:data.cpf,
                    email:data.mail,
                    phone:data.phone,
                    address:data.address,
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    handleInputChange = async (event) => {
        var target = event.target;
        var value = target.value;
        var name = target.name;

        if (target.type === 'checkbox')
            value = !this.state.active;

        await this.setState({ [name]: value })
    }

    save = async (e) => {
        e.preventDefault();
        var isCreationPage = window.location.pathname === '/customer/new';

        if (isCreationPage) {

            try {
                await CustomerService.Create(this.state);
                this.props.routeProps.history.push("/");
            } catch (err) {
                console.error(err);
            }

        } else {
            try {
                let routeId = this.props.routeProps.match.params.id;

                await CustomerService.Update(routeId, this.state);
                this.props.routeProps.history.push("/");
            } catch (err) {
                console.error(err);
            }
        }
    }

   

    createEmail() {
        return this.state.email.map((el, idx) => (
            <div key={idx}>
                <div className="form-row">

                    <div className="form-group col">

                        <label><b>{`Email #${idx + 1}`}</b></label>
                        <input
                            name="mail"
                            type="email"
                            className="form-control"
                            placeholder="seu@email.com"
                            value={this.state.email[idx].mail}
                            onChange={this.handleEmailChange.bind(this, idx)}
                            required
                        />


                    </div>
                    {idx > 0 ? <button type="button" onClick={this.removeEmail.bind(this, idx)} className="btn btn-danger btn-rouded mt-4 mb-4">Excluir</button> : ''}
                </div>

            </div>
        ));
    }

    createAddress() {
        let phoneId = 0;
        return this.state.address.map((el, idx) => (
            <div key={idx}>
                <h5><b>{`Endereço #${idx + 1}`}</b></h5>
                <div className="form-row ">
                    <div className="form-group col-4">
                        <label><b>CEP</b></label>
                        <InputMask
                            name="cep"
                            type="text"
                            minLength={9}
                            className="form-control"
                            placeholder="00000-000"
                            mask="99999-999"
                            maskChar={null}
                            value={this.state.address[idx].cep}
                            onChange={this.handleAddressCepChange.bind(this, idx)}
                            required
                        />
                    </div>

                    <div className="form-group col-8">
                        <label><b>Logradouro</b></label>
                        <input
                            name="street"
                            type="text"
                            id={phoneId}
                            className="form-control"
                            placeholder="Informe o Logradouro"
                            onChange={this.handleAddressChange.bind(this, idx)}
                            value={this.state.address[idx].street}
                            required
                        />
                    </div>

                    <div className="form-group col-8">
                        <label><b>Bairro</b></label>
                        <input
                            name="neighborhood"
                            type="text"
                            className="form-control"
                            placeholder="Informe o bairro"
                            onChange={this.handleAddressChange.bind(this, idx)}
                            value={this.state.address[idx].neighborhood}
                            required
                        />
                    </div>

                    <div className="form-group col-4">
                        <label><b>Cidade</b></label>
                        <input
                            name="city"
                            type="text"
                            className="form-control"
                            placeholder="Informe a cidade"
                            onChange={this.handleAddressChange.bind(this, idx)}
                            value={this.state.address[idx].city}
                            required
                        />

                    </div>

                    <div className="form-group col-4">
                        <label><b>Unidade Federativa</b></label>
                        <input
                            name="state"
                            data-id={idx}
                            type="text"
                            id={phoneId}
                            maxLength="2"
                            className="form-control"
                            placeholder="Informe a UF"
                            onChange={this.handleAddressChange.bind(this, idx)}
                            value={this.state.address[idx].state}
                            required
                        />
                    </div>

                    <div className="form-group col-8">
                        <label><b>Complemento</b></label>
                        <input
                            name="complement"
                            type="text"
                            className="form-control"
                            placeholder="Informe o complemento"
                            onChange={this.handleAddressChange.bind(this, idx)}
                            value={this.state.address[idx].complement}
                        />
                    </div>
                    {idx > 0 ? <button type="button" onClick={this.removeAddress.bind(this, idx)} className="btn btn-danger btn-rouded mt-4 mb-4 col-12">Excluir</button> : ''}
                </div>

            </div>
        ))
    }

    createPhone() {
        return this.state.phone.map((el, idx) => (
            <div key={idx}>
                <div className="form-row ">

                    <div className="form-group col">

                        <label><b>{`Telefone #${idx + 1}`}</b></label>
                        <InputMask
                            name="phoneNumber"
                            type="text"
                            className="form-control"
                            placeholder="(00)0000-0000"
                            mask={el.phoneNumber.length > 13 ? `(99)99999-9999` : `(99)9999-9999 `}
                            maskChar={null}
                            value={el.phoneNumber || ''}
                            onChange={this.handlePhoneChange.bind(this, idx)}
                            required
                        />
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="value"><b>Tipo</b></label>
                        <select
                            className="form-control"
                            name="type"
                            onChange={this.handlePhoneChange.bind(this, idx)}
                            value={el.type || 1}
                        >
                            {
                                this.state.phoneTypes.map((type, index) => {
                                    return (
                                        <option key={index} value={type.value}> {type.label}</option>
                                    );
                                })
                            }
                        </select>

                    </div>
                    {idx > 0 ? <button type="button" onClick={this.removePhone.bind(this, idx)} className="btn btn-danger btn-rouded mt-4 mb-4">Excluir</button> : ''}

                </div>

            </div>
        ))
    }

    addPhone = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            phone: [...prevState.phone, { phoneNumber: "", type: "" }],
        }));
    }

    removePhone(i) {
        let phone = [...this.state.phone];

        phone.splice(i, 1);

        this.setState({ phone })
    }

    addEmail = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            email: [...prevState.email, { mail: "" }],
        }))
    }

    removeEmail(i) {
        let email = [...this.state.email];
        email.splice(i, 1);

        this.setState({ email })
    }

    addAddress = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            address: [...prevState.address, { street: "", cep: "", city: "", state: "", neighborhood: "", complement: "", }],
        }))
    }

    removeAddress(i) {
        let address = [...this.state.address];
        address.splice(i, 1);
        this.setState({ address });
    }

    handleEmailChange(i, e) {
        const { name, value } = e.target;
        let email = [...this.state.email];
        email[i] = { ...email[i], [name]: value };
        this.setState({ email });
    }

    handlePhoneChange(i, e) {
        const { name, value } = e.target;
        let phone = [...this.state.phone];
        phone[i] = { ...phone[i], [name]: value };
        this.setState({ phone });
    }

    handleAddressChange(i, e) {
        const { name, value } = e.target;
        let address = [...this.state.address];
        address[i] = { ...address[i], [name]: value };
        this.setState({ address });
    }

    async handleAddressCepChange(i, e) {

        const { name, value } = e.target;
        let address = [...this.state.address];
        address[i] = { ...address[i], [name]: value };
        this.setState({ address });

        if (address[i].cep.length === 9) {
            let cep = address[i].cep;

            await Axios({
                method: "GET",
                url: 'https://viacep.com.br/ws/' + cep + '/json/'
            })
                .then(async (data) => {
                    data = await data.data
                    address[i] = { ...address[i], street: data.logradouro, neighborhood: data.bairro, state: data.uf, city: data.localidade, complement: "" };
                    this.setState({ address });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="card rounded-1">
                        <div className="card-body shadow">
                            <h4 className="text-center">Novo contrato</h4>
                            <form onSubmit={this.save} onChange={this.handleChange}>

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="name"><b>Nome</b></label>
                                        <input 
                                            name="name" 
                                            type="text" 
                                            id="name" 
                                            className="form-control"
                                            placeholder="Informe o nome"
                                            onChange={this.handleInputChange}
                                            value={this.state.name.replace(/[^\w\s]/gi, "")}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div class="text-right">
                                        <button onClick={this.addEmail} className="btn btn-primary"><i class="fa fa-plus mr-2"></i>Adicionar Email</button>
                                    </div>
                                    {this.createEmail()}
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="cpf"><b>CPF</b></label>
                                        <InputMask
                                            name="cpf"
                                            type="text"
                                            id="value"
                                            className="form-control"
                                            placeholder="Informe o CPF"
                                            minLength={14}
                                            onChange={this.handleInputChange}
                                            mask="999.999.999-99"
                                            maskChar={null}
                                            value={this.state.cpf}
                                            required
                                        />
                                    </div>
                                </div>


                                <div >
                                    <div class="text-right">
                                        <button onClick={this.addPhone} className="btn btn-primary"><i class="fa fa-plus mr-2"></i>Adicionar Telefone</button>
                                    </div>
                                    {this.createPhone()}
                                </div>


                                <div >
                                    <div class="text-right">
                                        <button onClick={this.addAddress} className="btn btn-primary"><i class="fa fa-plus mr-2"></i>Adicionar Endereço</button>
                                    </div>
                                    {this.createAddress()}
                                </div>




                                <div className="col-12 mt-3">
                                    <div className="form-row align-content-end">
                                        <div className="btn-toolbar col">
                                            <div className="btn-group mr-2 col">
                                                <div className="col">
                                                    <button type="submit" className="col btn btn-success"
                                                    >
                                                        Salvar
                                                </button>
                                                </div>
                                            </div>
                                            <div className="btn-group mr-2 col">
                                                <ModalButton
                                                    buttonText="Cancelar"
                                                    color="danger"
                                                    buttonCol="12"
                                                    acceptButtonText="Sair"
                                                    text="Deseja realmente sair do registro?"
                                                    accept={() => this.props.routeProps.history.push("/")} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
