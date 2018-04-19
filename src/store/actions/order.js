import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const orderBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.ORDER_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const orderBurgerFailed = (error) => {
    return {
        type: actionTypes.ORDER_BURGER_FAILED,
        error: error
    }
};

export const orderBurgerStart = () => {
    return {
        type: actionTypes.ORDER_BURGER_START
    }
};

export const orderBurger = (orderData) => {
    return dispatch => {
        dispatch(orderBurgerStart());
        axios.post('/orders.json', orderData)
        .then(response => {
            console.log(response.data);
            dispatch(orderBurgerSuccess(response.data, orderData));
        })
        .catch(error => {
            dispatch(orderBurgerFailed(error));
        });
    }
};