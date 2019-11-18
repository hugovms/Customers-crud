import React, {Component} from "react";


import {ModalButton} from '../components';

export default class FormButtons extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }

    save () {
        alert('123');
    }
    render() {
        console.log(this.props)
        return

    }

}