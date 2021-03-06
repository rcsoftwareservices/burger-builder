import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from "../../axios-orders";

export class BurgerBuilder extends Component {

    state = {
        order: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    };

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    orderHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({order: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    cancelOrderHandler = () => {
        this.setState({order: false});
    };

    continueOrderHandler = () => {
        this.props.onInitOrdered();
        this.props.history.push('/checkout');
    };

    render () {
        const disabled = {
            ...this.props.ingredients
        };
        for (let key in disabled) {
            disabled[key] = disabled[key] <= 0
        }
        let order_summary = null;
        let burger = this.props.error ? <p>ERROR: Ingredients can't be loaded!</p> : <Spinner />;
        if(this.props.ingredients) {
            burger = (
                <Wrapper>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        addIngredient={this.props.onAddIngredient}
                        removeIngredient={this.props.onRemoveIngredient}
                        disabled={disabled}
                        purchase={this.updatePurchaseState(this.props.ingredients)}
                        order={this.orderHandler}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.price}/>
                </Wrapper>
            );
            order_summary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.price}
                cancelOrder={this.cancelOrderHandler}
                continueOrder={this.continueOrderHandler} />;
        }
        return (
            <Wrapper>
                <Modal show={this.state.order} modalClosed={this.cancelOrderHandler}>
                    {order_summary}
                </Modal>
                {burger}
            </Wrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onRemoveIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitOrdered: () => dispatch(actions.orderInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
