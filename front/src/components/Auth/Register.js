// Register.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { registerUser } from '../../actions/auth';
import UserForm from '../Users/form';
import Paper from '@material-ui/core/Paper';
const styles = theme => ({
    button: {
        margin: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        marginLeft: theme.spacing.unit * 45
    }
});

class Register extends Component {
    constructor() {
        super();
        this.state = {
            user: {
                name: '',
                userName: '',
                avatar:'',
                email: '',
                password: '',
                password_confirm: '',
                errors: {}
            },
            errors: {}
        };
    }

    handleInputChange = e => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        // console.log('asdasdasd')

        const user = {
            name: this.state.user.name,
            userName: this.state.user.userName,
            email: this.state.user.email,
            password: this.state.user.password,
            password_confirm: this.state.user.password_confirm
        };
        console.log(this.state.user);
        this.props.registerUser(user, this.props.history);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div
                className='container'
                style={{ marginTop: '50px', width: '700px' }}>
                <Paper className={classes.paper}>
                    <h2 style={{ marginBottom: '40px' }}>Registration</h2>
                    <UserForm
                        registration={true}
                        user={this.state.user}
                        inputChange={this.handleInputChange}
                        onSubmit={this.handleSubmit}
                    />
                </Paper>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withStyles(styles, { withTheme: true })(withRouter(Register)));
