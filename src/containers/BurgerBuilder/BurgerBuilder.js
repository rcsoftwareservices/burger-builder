import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        order: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        console.log(this.props);
        // axios.get('https://react-my-burger-ad905.firebaseio.com/ingredients.json')
        //     .then(response =>{
        //         let ordered_ingredients = response.data.sort((a, b) => {
        //             return a.order - b.order;
        //         });
        //         let ingredients = {};
        //         ordered_ingredients.map(ingredient => ingredients[ingredient.name] = ingredient.quantity);
        //         this.setState({ingredients: ingredients})
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
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
        this.setState({order: true});
    };

    cancelOrderHandler = () => {
        this.setState({order: false});
    };

    continueOrderHandler = () => {
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
        let burger = this.state.error ? <p>ERROR: Ingredients can't be loaded!</p> : <Spinner />;
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
                        price={this.props.price}/>
                </Wrapper>
            );
            order_summary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.price}
                cancelOrder={this.cancelOrderHandler}
                continueOrder={this.continueOrderHandler} />;
        }
        if(this.state.loading) {
            order_summary = <Spinner />;
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
        ingredients: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName}),
        onRemoveIngredient: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
