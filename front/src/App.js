import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import store from './store';
import socket from './socket';

import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Navbar from './components/Header/header';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Home from './components/Home/Home';
import Profile from './components/Users/Profile';
import editProfile from './components/Users/edit';
import { setCurrentUser, logoutUser } from './actions/auth';
import { Error404 } from './404';
import Sidebar from './components/Drawer/drawer';
// import CreateSport from './components/Sports/Create-Sport/Create-Sport';
import TeamIndex from './components/Teams/Index';
import SportsIndex from './components/Sports/Index';
// import EventIndex from './components/Old-Events/index';
import UsersList from './components/Users/list';
import EventIndex from './components/Events';
import FiendIndex from './components/Friend/index';
import FriendList from './components/Friend/friendList';
// import ChatSidebar from './components/Drawer/chatDrawer';
import TeamProfile from './components/Teams/profile';
import EventList from './components/Events/listing';
import Facebook from './components/News/news';
import VideoPlayer from './components/News/video_player';
import MapContainer from './components/Events/FullEvent';
import User_Profile from './components/Users/User_Profile';
import GroundIndex from './components/Grounds/Index';
import GroundList from './components/Grounds/Gorunds_List';


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
        // padding: '0 8px',
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(0)

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
                    {/* <ChatSidebar open={this.state.open} /> */}
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/login' component={Login} />
                            <Route
                                exact
                                path='/video'
                                component={VideoPlayer}
                            />
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
                            <Route
                                exact
                                path='/news'
                                component={Facebook}
                            />

                            <PrivateRoute path='/:id/profile' component={Profile} />
                            <PrivateRoute
                                exact
                                path={
                                    '/user/:id/profile'
                                }
                                component={User_Profile}
                            />
                            <PrivateRoute
                                path={
                                    '/users/:id/edit'
                                }
                                component={editProfile}
                            />
                            <PrivateRoute
                                path={
                                    '/event/:id/index'
                                }
                                component={MapContainer}
                            />
                            <PrivateRoute
                                path={'/users/:id/friends'}
                                component={FriendList}
                            />
                            <PrivateRoute
                                exact
                                path={'/teams'}
                                component={TeamIndex}
                            />
                            <PrivateRoute
                                exact
                                path={'/grounds'}
                                // component={GroundIndex}
                                component={() => (
                                    <GroundIndex
                                        isAdmin={this.props.auth.user.isAdmin}
                                    />
                                )}
                            />
                            <PrivateRoute
                                exact
                                path={'/groundList'}
                                component={GroundList}
                            />
                            <PrivateRoute
                                path={'/sports'}
                                component={SportsIndex}
                            />

                            <PrivateRoute
                                path={'/events'}
                                component={() => (
                                    <EventIndex
                                        isAdmin={this.props.auth.user.isAdmin}
                                    />
                                )}
                            />
                            {/* <Route
                                path={'/events'}
                                component={() => (
                                    <EventList/>
                                )}
                            /> */}
                            <PrivateRoute
                                path={'/users'}
                                component={UsersList}
                            />
                            <PrivateRoute
                                path={'/friends'}
                                component={FiendIndex}
                            />
                            <Route
                                exact
                                path='/teams/:id/profile'
                                component={TeamProfile}
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
