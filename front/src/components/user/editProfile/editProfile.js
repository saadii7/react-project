// Register.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import {getUser} from '../../../actions/user';

class EditProfile extends Component {

   constructor() {
        super();
        this.state = {
            user:{
            id:'',
            name: '',
            userName:'',
            image:'',
            sports:{},
            email: '',
            password: '',
            password_confirm: '',
            },
            errors: {},
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        }

    // componentWillReceiveProps(nextProps) {
    //     console.log('hey next props'+nextProps);
    //     if(nextProps.auth.isAuthenticated) {
    //     }
    //     if(nextProps.errors) {
    //         this.setState({
    //             errors: nextProps.errors
    //         });
    //     }
    // }

    componentDidMount() {
            this.props.onGetUser(this.props.auth.user.id);
            console.log('userId Api Hit',this.props.auth.user.id);
            console.log('user CAll',this.props.user);
            // this.setState({
            //     user:{
            //         ...this.state.user,
            //         name: this.props.user.name
            //     }
            // });
        }
    render() {
        const { errors } = this.state;
        return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Edit Profile</h2>
            <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Name"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.name
                    })}
                    name="name"
                    onChange={ this.handleInputChange }
                    value={ this.state.user.name }
                    />
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Username"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.userName
                    })}
                    name="userName"
                    onChange={ this.handleInputChange }
                    value={ this.state.user.userName }
                    />
                    {errors.userName && (<div className="invalid-feedback">{errors.userName}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="email"
                    placeholder="Email"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                    })}
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.user.email }
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                    })}
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.user.password }
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password_confirm
                    })}
                    name="password_confirm"
                    onChange={ this.handleInputChange }
                    value={ this.state.password_confirm }
                    />
                    {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </div>
            </form>
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
    user:state.user
    };   
};
const mapDispatchToProps = dispatch => {
    return {
      onGetUser: id => {
        dispatch(getUser(id));
      }
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(EditProfile));
