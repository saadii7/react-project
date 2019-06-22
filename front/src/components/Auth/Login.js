import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../actions/auth';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit,

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
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        marginLeft: theme.spacing.unit*45,
        marginRight: theme.spacing.unit,
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
        this.props.loginUser({
            email: this.state.email,
            password: this.state.password,
        });
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
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
    render() {
        const { classes } = this.props;
        const { errors } = this.state;
        return (
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Login</Typography>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <TextField
                                id="outlined-name"
                                type="email"
                                name="email"
                                label="Email"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.email
                                })}
                                onChange={this.handleInputChange}
                                value={this.state.email}
                                margin="normal"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start" >-</InputAdornment>,
                                }}
                            />
                            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                        </div>
                        <div className="form-group">
                            <TextField
                                id="outlined-name"
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
                                InputProps={{
                                    startAdornment: <InputAdornment position="start" >-</InputAdornment>,
                                }}
                            />
                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                        </div>
                        <div className="form-group">
                            <Button className={classes.button} color='primary' type="submit" variant="contained">
                                Login
                        </Button>
                        </div>
                    </form>
                </Paper>
        )
    };
};

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(withStyles(styles, { withTheme: true })(withRouter(Login)));

// export default connect(mapStateToProps, )(Login)
