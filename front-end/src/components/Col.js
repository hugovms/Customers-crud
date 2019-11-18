import React, { Component } from "react";

export default class Col extends Component {
    render() {
        var size = this.props.size;
        var className = size ? `col-${size}` : "col";

        if(this.props.className)
            className += " " + this.props.className;
    
        return (
            <div className={className}>
                {this.props.children}
            </div>
        )
    }
}