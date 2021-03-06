import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    ordered: false
};

const orderInit = (state, action) => {
    return updateObject(state, {ordered: false});
};

const orderBurgerStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const orderBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId});
    return updateObject(state,
        {
            loading: false,
            ordered: true,
            orders: state.orders.concat(newOrder)
        });
};

const orderBurgerFailed = (state, action) => {
    return updateObject(state, {loading: false});
};

const fetchOrdersStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state,
        {
            orders: action.orders,
            loading: false
        });
};

const fetchOrdersFailed = (state, action) => {
    return updateObject(state, {loading: false});
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_INIT:
            return orderInit(state, action);
        case actionTypes.ORDER_BURGER_START:
            return orderBurgerStart(state, action);
        case actionTypes.ORDER_BURGER_SUCCESS:
            return orderBurgerSuccess(state, action);
        case actionTypes.ORDER_BURGER_FAILED:
            return orderBurgerFailed(state, action);
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAILED:
            return fetchOrdersFailed(state, action);
        default:
            return state;
    }
};

export default reducer;