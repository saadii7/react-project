// Register.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

class UserForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registration: props.registration,
            user: props.user,
            errors: {},
        }
        this.inputChange = props.inputChange;
        this.onSubmit = props.onSubmit;
    }
    inputChange = (e) => {}
    onSubmit = (e) => {}

    componentDidMount() {
        console.log(this.props);
        // this.props.onGetUser(this.props.auth.user.id);
    }
    componentWillReceiveProps = (props) => {
        this.setState({ user: props.user, registration: props.registration })
    }
    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.name
                        })}
                        name="name"
                        onChange={this.inputChange}
                        value={this.state.user.name}
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
                        onChange={this.inputChange}
                        value={this.state.user.userName}
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
                        onChange={this.inputChange}
                        value={this.state.user.email}
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                {
                    this.state.registration &&
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password
                            })}
                            name="password"
                            onChange={this.inputChange}
                            value={this.state.password}
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                }
                {
                    this.state.registration &&
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password_confirm
                            })}
                            name="password_confirm"
                            onChange={this.inputChange}
                            value={this.state.password_confirm}
                        />
                        {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                    </div>
                }

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </div>
            </form>
        )
    }
}

UserForm.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors,
    };
};

export default connect(mapStateToProps)(withRouter(UserForm));
