import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import store from './store';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Navbar from './components/Header/header';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Home from './components/Home/Home';
import Profile from './components/user/Profile';
import editProfile from './components/user/edit';
import { setCurrentUser, logoutUser } from './actions/auth';
import { Error404 } from './404';
import Sidebar from './components/Drawer/drawer';
// import CreateSport from './components/Sports/Create-Sport/Create-Sport';
import TeamIndex from './components/Team/Index';
import SportsIndex from './components/Sports/Index';
import EventIndex from './components/Event/index';
import UsersList from './components/user/list';

if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
    }
}
const styles = theme => ({
    root: {
        display: 'flex'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    }
});

class App extends Component {
    state = {
        open: false
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };
    render() {
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route
                {...rest}
                render={props =>
                    this.props.auth.isAuthenticated === true ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to='/login' />
                    )
                }
            />
        );
        const { classes } = this.props;
        return (
            <Router>
                <div className={classes.root}>
                    <CssBaseline />
                    <Navbar
                        open={this.state.open}
                        handleDrawerOpen={this.handleDrawerOpen}
                        handleDrawerClose={this.handleDrawerClose}
                    />
                    <Sidebar open={this.state.open} />
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/login' component={Login} />
                            <Route
                                exact
                                path='/register'
                                component={Register}
                            />
                            <Route
                                exact
                                path='/Error404'
                                component={Error404}
                            />

                            <PrivateRoute path='/profile' component={Profile} />
                            <PrivateRoute
                                path={
                                    '/user/' + this.props.auth.user.id + '/edit'
                                }
                                component={editProfile}
                            />
                            <PrivateRoute
                                path={'/teams'}
                                component={TeamIndex}
                            />
                            <PrivateRoute
                                path={'/sports'}
                                component={SportsIndex}
                            />
                            <PrivateRoute
                                path={'/events'}
                                component={EventIndex}
                            />
                            <PrivateRoute
                                path={'/users'}
                                component={UsersList}
                            />

                            <Redirect from='*' to='/Error404' />
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(
    withStyles(styles, { withTheme: true })(App)
);
