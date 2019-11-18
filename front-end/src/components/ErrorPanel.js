import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ErrorPanel extends Component {
    static propTypes = {
        errors: PropTypes.array
    }

    render() {
        if(this.props.errors.length > 0)
            return (    
                <div className="alert alert-danger" role="alert" 
                    dangerouslySetInnerHTML={{__html: this.props.errors.join("<br/>") }}>
                </div>
            );
        else
            return "";
    }
}
