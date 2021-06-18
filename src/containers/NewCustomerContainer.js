import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppFrame from './../components/AppFrame'
import CustomerEdit from '../components/CustomerEdit'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { insertCustomer } from '../actions/insertCustomer'
import { SubmissionError } from 'redux-form'

class NewCustomerContainer extends Component {
    handleSubmit = values => {
        return this.props.insertCustomer(values)/*.then(r => {
            if (r.payload &&  r.payload.error){
                throw new SubmissionError(r.payload.error);
            }
        });*/
    }
    handleOnSubmitSuccess = () => {
        this.props.history.goBack();
    }
    handleOnBack = () => {
        this.props.history.goBack();
    }
    renderBody = () => {
        return <CustomerEdit 
            onSubmit={this.handleSubmit}
            onSubmitSuccess={this.handleOnSubmitSuccess}
            onBack={this.handleOnBack} />
    }
    
    render() {
        return (
            <div>
                <AppFrame
                header='Creación de Cliente Nuevo'
                body={this.renderBody()}></AppFrame>
            </div>
        )
    }
}

NewCustomerContainer.propTypes = {
    insertCustomer: PropTypes.func.isRequired,
}

export default withRouter(connect(null, {insertCustomer})(NewCustomerContainer))
