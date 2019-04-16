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
            id:'',
            name: '',
            userName:'',
            image:'',
            sports:{},
            email: '',
            password: '',
            password_confirm: '',
            errors: {},
            user:[]
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

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated){
            this.props.onGetUser(this.props.auth.users.id);
            console.log('userId Api Hit',this.props.auth.users.id);

    }
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
                    value={ this.state.name }
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
                    value={ this.state.userName }
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
                    value={ this.state.email }
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
                    value={ this.state.password }
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
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state,ownProps) => {
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
