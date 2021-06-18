import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {reduxForm, Field} from 'redux-form'
import {Prompt} from 'react-router-dom'
import { setPropsAsInitial } from '../helpers/setPropsAsInitial'
import CustomersActions from './../components/CustomersActions'
import { accessControl } from '../helpers/accessControl'
import { CUSTOMER_EDIT } from '../constants/permissions'

/*const isRequired = value => (
    !value && "Este campo es requerido"
)*/
const isNumber = value => (
    isNaN(Number(value)) && "Este campo debe ser numérico"
)

const validate =values => {
    const error = {};

    if(!values.name){
        error.name = "El campo nombre es Requerido"
    }

    if(!values.dni){
        error.dni = "El Dni es un campo obligatorio"
    }

    /*if(!values.age){
        error.age = "Debe colocar la Edad"
    }*/
    return error;
}

const toNumber = value => value && Number(value);
const toUpper = value => value && value.toUpperCase();
const toLower = value => value && value.toLowerCase();
const onlyGrow = (value, previousValue, values) =>
    value && (!previousValue ? value : ( value > previousValue ? value: previousValue));
//action=""
//<button type="submit" disabled={submitting}>Aceptar</button>
class CustomerEdit extends Component {
    componentDidMount(){
        if(this.txt){
            this.txt.focus();
        }
    }

    renderField = ({input, meta, type, label, name, withFocus}) => {
        const control = {...input , value:input["value"] || ""}
        return (<div>
            <label htmlFor={name}>{label}</label>
            <input {...input} 
                    type={!type ? "text" : type}
                    ref={withFocus && (txt => this.txt = txt)}/>
            {
                meta.touched && meta.error && <span>{meta.error}</span>
            }
        </div>
    );
        }
    render(){
    const {handleSubmit, submitting, onBack, pristine, SubmitSucceeded} = this.props;
            return (
                <div>
                    <h2>Edicion del cliente</h2>
                    <form onSubmit={handleSubmit}>
                        <Field 
                            withFocus
                            name="name" 
                            component={this.renderField} 
                            //type="text"
                            //validate= {isRequired}
                            label ="Nombre"
                            parse={toUpper}
                            format={toLower}></Field>
                        <Field 
                            name="dni" 
                            component={this.renderField} 
                            //validate= {[isNumber, isRequired]}
                            validate= {isNumber}
                            label ="Dni"></Field>
                        <Field 
                            name="age" 
                            component={this.renderField}
                            type="number"
                            validate={isNumber}
                            label ="Edad"
                            parse={toNumber}
                            normalize={onlyGrow}></Field>
                        <CustomersActions>
                            <button type="submit" disabled={pristine || submitting}>Aceptar</button>
                            <button type="button" disabled={submitting} onClick={onBack}>Cancelar</button>  
                        </CustomersActions>
                        
                    </form>
                </div>
            )
        }
        /*<Prompt
                            when={!pristine && !SubmitSucceeded}
                            message="¿Seguro que desea cancelar?"></Prompt>*/
    }

CustomerEdit.propTypes = {
    name:PropTypes.string,
    dni:PropTypes.string,
    age:PropTypes.number,
    onBack: PropTypes.func,
}

const customerEditForm = reduxForm(
    {
        form: 'CustomerEdit',
        validate
    })(CustomerEdit)

    export default accessControl([CUSTOMER_EDIT])(setPropsAsInitial(customerEditForm)); 