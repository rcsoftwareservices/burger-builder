import React from 'react';

import classes from './NavMenu.css';
import MenuItem from './NavMenuItem/NavMenuItem';

const menu = (props) => (
    <ul className={classes.Menu}>
        <MenuItem link="/" exact>Burger Builder</MenuItem>
        { props.isAuthenticated
            ? <MenuItem link="/orders">Orders</MenuItem>
            : null }
        { props.isAuthenticated
            ? <MenuItem link="/logout">Logout</MenuItem>
            : <MenuItem link="/auth">Authenticate</MenuItem> }
    </ul>
);

export default menu;