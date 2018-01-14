import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHander from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.25,
    meat: 1.25,
    bacon: 0.75,
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchase: false,
        order: false,
        loading: false
    };

    addIngredientHandler = (type) => {
        const count = this.state.ingredients[type] + 1;
        const ingredients = {
            ...this.state.ingredients
        };
        ingredients[type] = count;
        const price = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice: price, ingredients: ingredients});
        this.updatePurchaseState(ingredients);
    };

    removeIngredientHandler = (type) => {
        const count = this.state.ingredients[type] - 1;
        if(count >= 0) {
            const ingredients = {
                ...this.state.ingredients
            };
            ingredients[type] = count;
            const price = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({totalPrice: price, ingredients: ingredients});
            this.updatePurchaseState(ingredients);
        }
    };

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchase: sum > 0});
    }

    orderHandler = () => {
        this.setState({order: true});
    };

    cancelOrderHandler = () => {
        this.setState({order: false});
    };

    continueOrderHandler = () => {
        this.setState( { loading: true } );
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'First Last',
                address: {
                    street: 'Test 123',
                    zip: '12345',
                    country: 'United States'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, order: false});
            })
            .catch(error => {
                this.setState({loading: false, order: false});
            });
    };

    render () {
        const disabled = {
            ...this.state.ingredients
        };
        for (let key in disabled) {
            disabled[key] = disabled[key] <= 0
        }
        let order_summary = <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            cancelOrder={this.cancelOrderHandler}
            continueOrder={this.continueOrderHandler} />;
        if(this.state.loading) {
            order_summary = <Spinner />;
        }
        return (
            <Wrapper>
                <Modal show={this.state.order} modalClosed={this.cancelOrderHandler}>
                    {order_summary}
                </Modal>
                <div>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        disabled={disabled}
                        purchase={this.state.purchase}
                        order={this.orderHandler}
                        price={this.state.totalPrice} />
                </div>
            </Wrapper>
        );
    }
}

export default withErrorHander(BurgerBuilder, axios);
