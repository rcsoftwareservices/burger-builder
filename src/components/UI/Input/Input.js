import React from 'react';

import classes from './Input.css';

const input = (props) => {

    let input_elemeent = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            input_elemeent = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}  onChange={props.change} />;
            break;
        case ('textarea'):
            input_elemeent = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}  onChange={props.change} />;
            break;
        case ('select'):
            input_elemeent = (
                <select
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value} onChange={props.change} >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value}
                                value={option.value} >
                            {option.displayValue}
                        </option>
                    ))};
                </select>
            );
            break;
        default:
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {input_elemeent}
        </div>
    );
};

export default input;