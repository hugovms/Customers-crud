import React, { Component } from "react";

export default class Button extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }

    onClick = async (e) => {
        e.preventDefault();

        if(this.props.usesLoading)
            await this.setState({ loading: true });

        await this.props.onClick();

        if(this.props.usesLoading)
            await this.setState({ loading: false });
    }

    render() {
        var block = this.props.block ? " btn-block" : "";

        return (
            <button className={"btn btn-" + this.props.type + block} onClick={this.onClick} disabled={this.state.loading} id={this.props.name}>
                {
                    !this.state.loading &&
                     this.props.children
                }

                {
                    this.state.loading &&
                    <i className="fas fa-spinner fa-pulse"></i>
                }
            </button>
        );
    }

}