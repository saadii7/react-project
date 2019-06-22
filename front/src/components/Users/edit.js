// Register.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getUser } from '../../actions/user';
import UserForm from './form'

class EditProfile extends Component {

    constructor() {
        super();
        this.state = {
            user: {
                id: '',
                name: '',
                userName: '',
                image: '',
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
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile));
