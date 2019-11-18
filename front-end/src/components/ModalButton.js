import React from 'react';

/**
 * @description This class returns a button with modal event trigger.
 */
export default class ModalButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false
        }
    }

    accept = () => {
        this.toggleModal();
        this.props.accept();
    }

    toggleModal = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    }
    
    /**
     * @description Renders modal with text sent by 'text' props. The modal is rendered only if 'modalVisible' state is true.
     */
    render() {
        var color = this.props.color ? `btn-${this.props.color}` : "btn-primary";
        var iconButton = this.props.buttonText ? "btn-icon-left" : "";
        var colValue = this.props.colValue ? `col-${this.props.colValue}` : "col";
        var buttonCol = this.props.buttonCol ? `col-${this.props.buttonCol}` : "";
        return (
            <div className={`${colValue}`}>
                <button type="button" className={`${buttonCol} btn ${iconButton} ${color}`} onClick={() => this.toggleModal()}>
                    {this.props.icon &&
                        <i className={this.props.icon}></i>}
                    {this.props.buttonText}
                </button>
                
                {this.state.modalVisible &&
                    <div className="modal" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="basicPercentModalTitle">Atenção!</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.toggleModal()}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>{this.props.text}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={() => this.accept()}>
                                        {this.props.acceptButtonText}
                                    </button>
                                    <button type="button" className="btn btn-light" onClick={() => this.toggleModal()}>
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
