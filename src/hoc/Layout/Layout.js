import React, {Component} from 'react';
import { connect } from 'react-redux';

import Wrapper from '../Wrapper/Wrapper';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import Sidedrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        })
    };

    render() {
        return (
            <Wrapper>
                <Toolbar
                    isAuth={this.props.isAuthenicated}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                <Sidedrawer
                    isAuth={this.props.isAuthenicated}
                    open={this.state.showSideDrawer}
                    close={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Wrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenicated: state.auth.token !== null
    }
};

export default connect(mapStateToProps)(Layout);