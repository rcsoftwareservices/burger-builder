import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavMenuItem.css';

const menuItem = (props) => (
    <li className={classes.MenuItem}>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}>{props.children}</NavLink>
    </li>
);

export default menuItem;