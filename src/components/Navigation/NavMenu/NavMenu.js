import React from 'react';

import classes from './NavMenu.css';
import MenuItem from './NavMenuItem/NavMenuItem';

const menu = () => (
    <ul className={classes.Menu}>
        <MenuItem link="/" exact>Burger Builder</MenuItem>
        <MenuItem link="/orders">Orders</MenuItem>
        <MenuItem link="/auth">Authenticate</MenuItem>
    </ul>
);

export default menu;