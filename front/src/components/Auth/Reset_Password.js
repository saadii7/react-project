import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser, forgotPassword,PasswordReset } from '../../actions/auth';
import classnames from 'classnames';
import { fade, withStyles, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import messi from '../../assets/messi.jpg';
import { Link } from '@material-ui/core';
// import Background from '../../assets/Background.jpg';

// var sectionStyle = {
//     width: "100%",
//     height: "400px",
//     backgroundImage: "url(" + { Background } + ")"
//   };
const CssTextField = withStyles({
    root: {
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
        margin: theme.spacing.unit * 2,
        // marginLeft: theme.spacing.unit * 25,
        color: "#FB8122"
    },
    input: {
        display: 'none',

    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    paper: {
        marginTop: 80,
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: '#181C1F',
        opacity: (0.75),
        // backgroundColor: 'transparent',
        boxShadow: theme.shadows[10],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        marginLeft: theme.spacing.unit * 50,
        marginRight: theme.spacing.unit,
        // backgroundImage: `url(${messi})`,
        // backgroundSize: 'cover',

    },
    body: {
        // backgroundImage: `url(${Background})`,
        // marginTop: 20,
        width: "100%",
        height: 445,
        flex: 1,
        margin: 0

        // height:502
    },
    color: {
        color: "#FB8122"
    },
    input_color: {
        // color:"#FB8122"
        borderColor: "#FB8122"
    },

});



class ResetPassword extends Component {

    constructor() {
        super();
        this.state = {
            password: '',
            password_confirm: '',
            errors: {}
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onPasswordReset({
            token:this.props.match.params.token,
            password:{
                password: this.state.password,
                confirm: this.state.password_confirm,
            }
        });
    }
    // forgotHandler = (e) => {
    //     e.preventDefault();
    //     this.props.onForgotPassword({
    //         email: this.state.email
    //     });
    // }

    // componentDidMount() {
    //     if (this.props.auth.isAuthenticated) {
    //         this.props.history.push('/');
    //     }
    // }
    // componentWillReceiveProps(nextProps) {
    //     console.log('Next Props------->', nextProps)
    //     if (nextProps.auth.isAuthenticated) {
    //         this.props.history.push('/')
    //     }
    //     if (nextProps.errors) {
    //         this.setState({
    //             errors: nextProps.errors
    //         });
    //         console.log('Next Props-errors------>', this.state.errors)
    //     }
    // }
    render() {
        const { classes } = this.props;
        const { errors } = this.state;
        return (
            <div className={classes.body}>
                <Paper className={classes.paper}>
                    <Typography variant='h6' align='center' className={classes.color}>Reset Password</Typography>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <CssTextField
                                id="custom-css-outlined-input"
                                type="password"
                                name="password"
                                label="Password"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.password
                                })}
                                onChange={this.handleInputChange}
                                value={this.state.password}
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                        </div>
                        <div className="form-group">
                            <CssTextField
                                id="outlined-name"
                                type="password"
                                name='password_confirm'
                                label="Confirm Password"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.password_confirm,
                                })}
                                onChange={this.handleInputChange}
                                value={this.state.password_confirm}
                                margin="normal"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start" >-</InputAdornment>,
                                }}
                            />
                            {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}

                        </div>
                        <div className="form-group">
                            <div>
                                <Button className={classes.button} variant="outlined" type="submit">
                                    Save
                                </Button>
                            </div>
                        </div>
                    </form>
                </Paper>
            </div>
        )
    };
};

ResetPassword.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onForgotPassword: (email) => {
            dispatch(forgotPassword(email));
        },
        onPasswordReset: (token,credentials) => {
            dispatch(PasswordReset(token,credentials));
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withRouter(ResetPassword)));
