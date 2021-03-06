import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser, forgotPassword } from '../../actions/auth';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from '@material-ui/core';

const CssTextField = withStyles({
    root: {
        '& label': {
            color: '#FB8122'
        },
        '& label.Mui-focused': {
            color: '#FB8122',
        },
        '& .MuiInput-underline:after': {
            // color: '#FB8122',
            borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                // color: '#FB8122',
                borderColor: '#FB8122',
                borderBlockWidth: 20,
                // backgroundColor:"white"
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                // color: '#FB8122',
                borderColor: 'white',
            },
        },
    },
})(TextField);

const styles = theme => ({
    button: {
        marginTop: theme.spacing.unit * 2,
        color: "#000",
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
        marginTop: 40,
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: '#181C1F',
        opacity: (0.75),
        boxShadow: theme.shadows[10],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        marginLeft: theme.spacing.unit * 50,
    },
    body: {
        align: 'center',
        width: "100%",
        height: 445,
        flex: 1,
        margin: 0
    },
    color: {
        color: "#FB8122"
    },
    input_color: {
        // color:"#FB8122"
        borderColor: "#FB8122"
    },

});



class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
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
        this.props.onLoginUser({
            email: this.state.email,
            password: this.state.password,
        });
    }
    forgotHandler = (e) => {
        e.preventDefault();
        this.props.onForgotPassword({
            email: this.state.email
        });
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('Next Props------->', nextProps)
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
            console.log('Next Props-errors------>', this.state.errors)
        }
    }
    render() {
        const { classes } = this.props;
        const { errors } = this.state;
        return (
            <div container className={classes.body}>
                <Paper className={classes.paper}>
                    <Typography variant='h3' align="center" className={classes.color}>Login</Typography>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <CssTextField
                                id="custom-css-outlined-input"
                                type="email"
                                name="email"
                                label="Email"
                                fullWidth
                                inputProps={{ style: { fontFamily: 'nunito', borderColor: "white",color: "white" } }}
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.email,
                                })}
                                onChange={this.handleInputChange}
                                value={this.state.email}
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                        </div>
                        <div className="form-group">
                            <CssTextField
                                id="custom-css-outlined-input"
                                type="password"
                                name="password"
                                label="Password"
                                fullWidth
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
                            <div>
                                <Link href="/reset">
                                <Button fullWidth className={classes.button} >
                                        forgot Password
                                </Button>
                                </Link>
                            </div>
                            <div>
                                <Button fullWidth className={classes.button} variant="outlined" type="submit">
                                    Login
                                </Button>
                            </div>
                        </div>
                    </form>
                </Paper>
            </div>
        )
    };
};

Login.propTypes = {
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
        onLoginUser: (credentials) => {
            dispatch(loginUser(credentials));
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withRouter(Login)));
