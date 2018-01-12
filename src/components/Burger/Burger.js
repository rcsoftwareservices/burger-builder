import React from 'react';

import classes from './Burger.css';
import Ingredient from './BuildIngredient/BuildIngredient';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
        .map(key => {
            return [...Array(props.ingredients[key])].map((_, i) => {
                return <Ingredient key={key + i } type={key}/>
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top" />
            {transformedIngredients}
            <Ingredient type="bread-bottom" />

        </div>
    );
};

export default burger;