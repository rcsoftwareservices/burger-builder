import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Menu from '../NavMenu/NavMenu';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';


const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <Menu/>
        </nav>
    </header>
);

export default toolbar;