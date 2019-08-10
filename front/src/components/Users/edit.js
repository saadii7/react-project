// Register.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getUser } from '../../actions/user';
import UserForm from './form'
import {updateUser} from '../../actions/user';

class EditProfile extends Component {

    constructor() {
        super();
        this.state = {
            user: {
                id: '',
                name: '',
                userName: '',
                avatar: '',
                sports: [],
                email: '',
            },
            errors: {},
        }
    }

    inputChange = (e) => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const user = {
            name: this.state.user.name,
            userName: this.state.user.userName,
            email: this.state.user.email,
        };
        // console.log(this.state.user);
        this.props.onUpdateUser(this.state.user._id,user);
        console.log('chalo')
    }

    componentDidMount() {
        this.props.onGetUser(this.props.auth.user.id);
    }
    componentWillReceiveProps = (props) => {
        this.setState({ user: props.user })
    }
    render() {
        return (
            <div className="container" style={{ marginTop: '50px', width: '700px' }}>
                <h2 style={{ marginBottom: '40px' }}>Edit Profile</h2>
                <UserForm registration = {false} user = {this.state.user} inputChange = {this.inputChange} onSubmit = {this.onSubmit}></UserForm>
            </div>
        )
    }
}

EditProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors,
        user: state.user
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onGetUser: id => {
            dispatch(getUser(id));
        },
        onUpdateUser: (id,user) => {
            dispatch(updateUser(id,user));
        }

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile));
