import React from "react";

import { Button, TextBox, ErrorPanel } from "../../components";

import packageJson from '../../../package.json';
import { UserLoginService } from '../../service/user-login-service';
import axios from "axios";

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.fieldList = [];
        this.errors = [];

        this.state = {
            email: "admin",
            password: "123456",
            errors: []
        }
    }

    login = async () => {
        await this.cleanErrors();

        for (var i = 0; i < this.fieldList.length; i++) {
            var field = this.fieldList[i];
            field.validate();

            if (field.hasErrors)
                await this.addError(field.erros);
        }

        if (this.state.errors.length === 0) {
            var result = await UserLoginService.Login(this.state.email, this.state.password);

            if (result) {
                await localStorage.setItem('admin', result.admin);
                await localStorage.setItem('token', result.token);
               
                window.location.reload();
            } else {
                await this.addError('Usuário ou senha incorretos');
            }
        }
    }

    cleanErrors = async () => {
        this.errors = [];
        await this.setState({ errors: this.errors });
    }

    addError = async (error) => {
        this.errors.push(error);
        await this.setState({ errors: this.errors });
    }

    render() {
        return (
            <div className="card shadow rounded-1">
                <div className="card-body mt-2 ">
                    <h1 className="text-center">SurittecCrud</h1>
                    <TextBox context={this} type={"text"} name={"email"} placeholder={"E-mail"} value={this.state.email} />
                    <TextBox context={this} type={"password"} name={"password"} placeholder={"Senha"} value={this.state.password} />

                    <div className="form-group">
                        <Button name={"submit"} onClick={this.login} block={true} type={"primary"} usesLoading={true}>Entrar</Button>
                    </div>

                    <ErrorPanel errors={this.state.errors} />

                    <div className="form-group text-center">
                        Versão {packageJson.version}
                    </div>
                </div>
            </div>
        );
    }
}