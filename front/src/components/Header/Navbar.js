import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Navbar extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }
    
      toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }
    
    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, users} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
            {/* <a href="#" className="nav-link" onClick={this.onLogout.bind(this)}> */}
                <ButtonDropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret color="warning">
                    <img src={users.avatar} alt={users.name} title={users.name}
                        className="rounded-circle"
                        style={{ width: '40px',height:'40px', marginRight: '5px'}} />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem tag={Link} href="/profile" to="/profile">My Profile</DropdownItem>
                        <DropdownItem tag={Link} href="/editProfile" to="editProfile">Edit Profile</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.onLogout.bind(this)}>Logout</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </ul>
        )
      const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Sign In</Link>
            </li>
        </ul>
      )
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-warning">
                <Link className="navbar-brand" to="/">Game On</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    direction: PropTypes.oneOf(['left']),
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));