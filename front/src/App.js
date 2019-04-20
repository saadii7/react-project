import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Switch,Redirect} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Navbar from './components/Header/Navbar';
import Register from './components/Registration/Register';
import Login from './components/Registration/Login';
import Home from './components/Home/Home';
import Profile from './components/user/Profile/Profile';
import CreateSport from './components/Sports/Create-Sport/Create-Sport';
import {Error404} from './Error404';
import editProfile from './components/user/editProfile/editProfile';
if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
          <div>
              <Navbar />
              <Switch>
                    <Route exact path="/" component={ Home } />
                    <Route exact path="/profile" component={ Profile } />
                    <Route exact path={"/users/id"+this.props.auth.user.id+"/edit"} component={ editProfile } />
                    <Route exact path={"/sports/add"} component={ CreateSport } />
                    <Route exact path="/register" component={ Register } />
                    <Route exact path="/login" component={ Login } />
                    <Route exact path="/Error404" component={ Error404 } />
                    <Redirect from='*' to="/Error404"/>
              </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(App);