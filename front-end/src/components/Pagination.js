import React from 'react'

import { Row, Col } from ".";

export default class Pagination extends React.Component {

    handlePreviousPage = () => this.props.onClickPagination(this.props.currentPage - 1);
    handleNextPage = () => this.props.onClickPagination(this.props.currentPage + 1);

    render() {
        var backDisabled = this.props.currentPage === 1;
        var nextDisabled = this.props.currentPage === this.props.totalPages;

        return (
            <Row>
                <Col>
                    <button type="button" className="btn btn-sm btn-icon-left btn-secondary mr-2" disabled={backDisabled} 
                            onClick={this.handlePreviousPage}>
                        <i className="fas fa-chevron-left mr-2"></i> 
                        Anterior
                    </button>
                    
                    <button type="button" className="btn btn-sm btn-icon-right btn-secondary mr-2" disabled={nextDisabled} 
                            onClick={this.handleNextPage}>
                        Próxima 
                        <i className="fas fa-chevron-right"></i>
                    </button>
                    
                    <small>
                        Página {this.props.currentPage} de {this.props.totalPages}
                    </small>
                </Col>
            </Row>
        );
    }
    
}