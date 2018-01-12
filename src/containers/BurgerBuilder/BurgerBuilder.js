import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Wrapper from '../../hoc/Wrapper/Wrapper';

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
        order: false
    }

    addIngredientHandler = (type) => {
        const count = this.state.ingredients[type] + 1;
        const ingredients = {
            ...this.state.ingredients
        }
        ingredients[type] = count;
        const price = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice: price, ingredients: ingredients});
        this.updatePurchaseState(ingredients);
    }

    removeIngredientHandler = (type) => {
        const count = this.state.ingredients[type] - 1;
        if(count >= 0) {
            const ingredients = {
                ...this.state.ingredients
            }
            ingredients[type] = count;
            const price = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({totalPrice: price, ingredients: ingredients});
            this.updatePurchaseState(ingredients);
        }
    }

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
    }

    cancelOrderHandler = () => {
        this.setState({order: false});
    }

    continueOrderHandler = () => {
        alert('Continue');
    }

    render () {
        const disabled = {
            ...this.state.ingredients
        };
        for (let key in disabled) {
            disabled[key] = disabled[key] <= 0
        }
        return (
            <Wrapper>
                <Modal show={this.state.order} modalClosed={this.cancelOrderHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        cancelOrder={this.cancelOrderHandler}
                        continueOrder={this.continueOrderHandler} />
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

export default BurgerBuilder;
