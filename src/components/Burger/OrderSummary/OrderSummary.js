import React, {Component} from 'react';

import Wrapper from '../../../hoc/Wrapper/Wrapper';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render () {
        const summary = Object.keys(this.props.ingredients)
            .map(key => {
                return (
                    <li key={key}>
                        <span style={{textTransform: 'capitalize'}} >{key}</span>: {this.props.ingredients[key]}
                    </li>);
            });
        return (
            <Wrapper>
                <h3>Your Order</h3>
                <p>A buger with the following ingredients:</p>
                <ul>
                    {summary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancelOrder}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continueOrder}>CONTINUE</Button>
            </Wrapper>
        )
    }
}

export default OrderSummary;