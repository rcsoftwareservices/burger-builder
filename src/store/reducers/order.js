import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    };
    switch (action.type) {
        case actionTypes.ORDER_BURGER_START:
            return {
                ...state,
                loading: true,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.ORDER_BURGER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.ORDER_BURGER_FAILED:
            return {
                ...state,
                loading: false,

            };
        default:
            return state;
    }
};

export default reducer;