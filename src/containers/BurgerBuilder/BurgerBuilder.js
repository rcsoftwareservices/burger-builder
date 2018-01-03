import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';

import Auxiliary from '../../hoc/Auxilary';

class BurgerBuilder extends Component {
    render () {
        return (
            <Auxiliary>
                <div>
                    <Burger/>
                    <div>Build Controls</div>
                </div>

            </Auxiliary>
        );
    }
}

export default BurgerBuilder;
