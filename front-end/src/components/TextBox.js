import React, { Component } from "react";
import { handleFieldChange } from "../service/react";

var InputMask = require('react-input-mask');

export default class CampoTexto extends Component {

	constructor(props) {
		super(props);

		this.errors = [];
		this.isValid = true;
	}

	validar = () => {
		this.isValid = true;
		this.errors = [];

		if(this.props.required)
		{
			if(this.props.value === "")
				this.errors.push(`Campo "${this.props.label || this.props.placeholder}" obrigatório.`);
		}

		this.isValid = this.errors.length < 0;
	}

	render() {
		var col = "col-lg-2";

		if(this.props.col)
			col = this.props.col;

		return (
			<div className="form-group row">
				
				{this.props.label &&
					<div className={col + " col-md-12 text-lg-right col-form-label"}>
						<b><label htmlFor={this.props.name}>
							{this.props.label}
							{this.props.required && " *"}
						</label></b>
					</div>
				}

				<div className="col">
					<InputMask mask={this.props.mask} name={this.props.name} value={this.props.value} maxLength={this.props.max} className="form-control"
							   type={this.props.type} placeholder={this.props.placeholder} id={this.props.name} disabled={this.props.disabled}
							   onChange={(e) => handleFieldChange(this.props.context, e, this.props.parent)} />
				</div>

			</div>
		);
	}

}