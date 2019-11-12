// Register.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import classnames from 'classnames';

const CssTextField = withStyles({
    root: {
        '& label': {
            color: '#FB8122'
        },
        '& label.Mui-focused': {
            color: '#FB8122'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#FB8122',
                borderBlockWidth: 20
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
        },
    },
})(TextField);
const styles = theme => ({
    button: {
        marginTop: theme.spacing.unit * 2,
        // color: "#000",
        backgroundColor: "#FB8122"

    },
    input: {
        display: 'none',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit * 10,
        marginRight: theme.spacing.unit,
    },
});

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
    inputChange = (e) => { }
    onSubmit = (e) => { }

    componentDidMount() {
        console.log(this.props);
        // this.props.onGetUser(this.props.auth.user.id);
    }
    UNSAFE_componentWillReceiveProps = (props) => {
        this.setState({ user: props.user, registration: props.registration })
    }
    render() {
        const { classes } = this.props;
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <CssTextField
                        id="outlined-name"
                        type="text"
                        name="name"
                        label="Name"
                        fullWidth
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.name,
                        })}
                        onChange={this.inputChange}
                        value={this.state.user.name}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start" >-</InputAdornment>,
                            style: { fontFamily: 'nunito', borderColor: "white", color: "white"}
                        }}
                    />
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                    <CssTextField
                        id="outlined-name"
                        type="text"
                        name="userName"
                        label="Username"
                        fullWidth
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.userName,
                        })}
                        onChange={this.inputChange}
                        value={this.state.user.userName}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start" >-</InputAdornment>,
                            style: { fontFamily: 'nunito', borderColor: "white", color: "white" }
                        }}
                    />
                    {errors.userName && (<div className="invalid-feedback">{errors.userName}</div>)}
                </div>
                <div className='form-group'>
                    <CssTextField
                        id="outlined-name"
                        type="file"
                        name="image"
                        label="image"
                        fullWidth
                        onChange={this.inputChange}
                        value={this.state.user.avatar}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start" >-</InputAdornment>,
                            style: { fontFamily: 'nunito', borderColor: "white", color: "white" }
                        }}
                    />
                </div>
                <div className="form-group">
                    <CssTextField
                        id="outlined-name"
                        type="email"
                        name="email"
                        label="Email"
                        fullWidth
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.email,
                        })}
                        onChange={this.inputChange}
                        value={this.state.user.email}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start" >-</InputAdornment>,
                            style: { fontFamily: 'nunito', borderColor: "white", color: "white" }
                        }}
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                {
                    this.state.registration &&
                    <div className="form-group">
                        <CssTextField
                            id="outlined-name"
                            type="password"
                            name="password"
                            label="Password"
                            fullWidth
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password,
                            })}
                            onChange={this.inputChange}
                            value={this.state.user.password}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start" >-</InputAdornment>,
                                style: { fontFamily: 'nunito', borderColor: "white", color: "white" }
                            }}
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                }
                {
                    this.state.registration &&
                    <div className="form-group">
                        <CssTextField
                            id="outlined-name"
                            type="password"
                            name='password_confirm'
                            label="Confirm Password"
                            fullWidth
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password_confirm,
                            })}
                            onChange={this.inputChange}
                            value={this.state.user.password_confirm}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start" >-</InputAdornment>,
                                style: { fontFamily: 'nunito', borderColor: "white", color: "white" }
                            }}
                        />
                        {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                    </div>
                }

                <div className="form-group">
                    <Button fullWidth className={classes.button} type="submit" variant="outlined">
                        Save
                    </Button>
                    {/* <Button className={classes.button} variant="outlined">
                        Reset Password
                    </Button> */}
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
export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(withRouter(UserForm)));