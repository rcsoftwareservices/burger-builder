import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

export const setIngredients = (unordered_ingredients) => {
    let ordered_ingredients = unordered_ingredients.sort((a, b) => {
        return a.order - b.order;
    });
    let ingredients = {};
    ordered_ingredients.map(ingredient => ingredients[ingredient.name] = ingredient.quantity);
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-ad905.firebaseio.com/ingredients.json')
            .then(response =>{
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            });
    };
};