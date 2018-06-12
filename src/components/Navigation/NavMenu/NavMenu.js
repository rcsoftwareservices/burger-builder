import React from 'react';

import classes from './NavMenu.css';
import NavMenuItem from './NavMenuItem/NavMenuItem';

const menu = (props) => (
    <ul className={classes.Menu}>
        <NavMenuItem link="/" exact>Burger Builder</NavMenuItem>
        { props.isAuthenticated
            ? <NavMenuItem link="/orders">Orders</NavMenuItem>
            : null }
        { props.isAuthenticated
            ? <NavMenuItem link="/logout">Logout</NavMenuItem>
            : <NavMenuItem link="/auth">Authenticate</NavMenuItem> }
    </ul>
);

export default menu;