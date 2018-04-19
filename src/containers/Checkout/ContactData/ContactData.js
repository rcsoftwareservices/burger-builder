import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from "../../../store/actions/index";

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            }
        },
        validForm: false
    };

    validate (value, rules) {
        let is_valid = true;
        if (rules.required) {
            is_valid = value.trim() !== '' && is_valid;
        }
        if (rules.minLength) {
            is_valid = value.length >= rules.minLength && is_valid;
        }
        if (rules.maxLength) {
            is_valid = value.length <= rules.maxLength && is_valid;
        }
        return is_valid;
    };

    orderHandler = (event) => {
        event.preventDefault();
        const form_data = {};
        for (let element in this.state.orderForm) {
            form_data[element] = this.state.orderForm[element].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: form_data
        };
        this.props.onOrderBurger(order);
    };

    inputChangeHandler = (event, inputIdentifier) => {
        const order_form = {
            ...this.state.orderForm
        };
        const form_element = {
            ...order_form[inputIdentifier]
        };
        form_element.value = event.target.value;
        form_element.valid = this.validate(form_element.value, form_element.validation);
        form_element.touched = true;
        order_form[inputIdentifier] = form_element;
        let valid_form = true;
        for (let input_element in order_form) {
            valid_form = order_form[input_element].valid && valid_form;
        }
        this.setState({orderForm: order_form, validForm: valid_form});
    };

    render () {
        const form_elements = [];
        for (let key in this.state.orderForm) {
            form_elements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                <Input elementType="..." elementConfig="..." value="..." />
                {form_elements.map(form_element => (
                    <Input
                        key={form_element.id}
                        elementType={form_element.config.elementType}
                        elementConfig={form_element.config.elementConfig}
                        value={form_element.config.value}
                        invalid={!form_element.config.valid}
                        shouldValidate={form_element.config.validation}
                        touched={form_element.config.touched}
                        change={(event) => this.inputChangeHandler(event, form_element.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.validForm}>ORDER</Button>
            </form>
        );
        if(this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Information</h4>
                {form}
            </div>
        );
    }
}

const mapSateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice,
        loading: state.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.orderBurger(orderData))
    }
};

export default connect(mapSateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));