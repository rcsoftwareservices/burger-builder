import React from 'react';

import classes from './NavMenu.css';
import MenuItem from './NavMenuItem/NavMenuItem';

const menu = () => (
    <ul className={classes.Menu}>
        <MenuItem link="/" active>Burger Builder</MenuItem>
        <MenuItem link="/">Checkout</MenuItem>
    </ul>
);

export default menu;