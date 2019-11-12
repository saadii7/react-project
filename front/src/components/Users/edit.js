// Register.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getUser } from '../../actions/user';
import UserForm from './form'
import { updateUser } from '../../actions/user';

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
            // avatar: this.state.user.avatar,
        };
        // let props = this.props;
        // if (e.target && e.target.image && e.target.image.files.length > 0) {
        //     var file = e.target.image.files[0];
        //     var reader = new FileReader();
        //     reader.onloadend = function () {
        //         console.log('RESULT', reader.result)
        //         user.avatar = reader.result;
        //         // props.updateUser(team);
        //         props.onUpdateUser(this.state.user._id, user);
        //     }
        //     reader.readAsDataURL(file);

        // } else {
        //     // this.props.registerUser(user);
        //     props.onUpdateUser(this.state.user._id, user);
        // }
        // console.log(this.state.user);
            this.props.onUpdateUser(this.state.user._id, user);
        
        console.log('chalo', user)
    }

    componentDidMount() {
        this.props.onGetUser(this.props.auth.user.id);
    }
    UNSAFE_componentWillReceiveProps = (props) => {
        this.setState({ user: props.user })
    }
    render() {
        return (
            <div className="container" style={{ marginTop: '50px', width: '700px' }}>
                <h2 style={{ marginBottom: '40px' }}>Edit Profile</h2>
                <UserForm registration={false} user={this.state.user} inputChange={this.inputChange} onSubmit={this.onSubmit}></UserForm>
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
        onUpdateUser: (id, user) => {
            dispatch(updateUser(id, user));
        }

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile));
