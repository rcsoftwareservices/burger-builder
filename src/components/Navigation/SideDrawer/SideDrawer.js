import React from 'react';

import Logo from '../../Logo/Logo';
import NavMenu from '../../Navigation/NavMenu/NavMenu';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Wrapper from '../../../hoc/Wrapper/Wrapper';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Wrapper>
            <Backdrop show={props.open} clicked={props.close} />
            <div className={attachedClasses.join(' ')} onClick={props.close}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavMenu isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Wrapper>
    );

};

export default sideDrawer;