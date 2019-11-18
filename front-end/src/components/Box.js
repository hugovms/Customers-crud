import React, { Component } from "react";

import { Col, Row } from "./";

export default class Box extends Component {
    static defaultProps = {
        renderRow: true,
        padding: true
    }

    renderBox = () => {
        var padding = this.props.padding ? "" : "no-padding";

        return (
            <div className={`box ${padding}`}>
                {this.props.title &&
                    <div className="box-title">
                        {this.props.title}
                    </div>
                }

                {this.props.commands &&
                    <div className={"box-commands"}>
                        {this.props.commands}
                    </div>}

                <div className="box-content">
                    {this.props.children}
                </div>
                
                {this.props.footer &&
                    <div className={"box-footer"}>
                        {this.props.footer}
                    </div>}
            </div>
        );
    }

    render() {
        if(this.props.renderRow) {
            return (
                <Row>
                    <Col>
                        {this.renderBox()}
                    </Col>
                </Row>
            );
        } else {
            this.renderBox();
        }
    }

}