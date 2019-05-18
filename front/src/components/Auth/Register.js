// Register.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/auth';
import UserForm from '../user/form'
class Register extends Component {

    constructor() {
        super();
        this.state = {
            user: {
                name: '',
                userName: '',
                email: '',
                password: '',
                password_confirm: '',
                errors: {}
            },
            errors: {}
        }
    }

    handleInputChange = (e) => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log('asdasdasd')

        const user = {
            name: this.state.user.name,
            userName: this.state.user.userName,
            email: this.state.user.email,
            password: this.state.user.password,
            password_confirm: this.state.user.password_confirm
        }
        console.log(this.state.user);
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="container" style={{ marginTop: '50px', width: '700px' }}>
                <h2 style={{ marginBottom: '40px' }}>Registration</h2>
                <UserForm registration = {true} user = {this.state.user} inputChange = {this.handleInputChange} onSubmit = {this.handleSubmit}></UserForm>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register))
