// Register.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { registerUser } from '../../actions/auth';
import UserForm from '../Users/form';
import Paper from '@material-ui/core/Paper';
// import Background from '../../assets/Background.jpg';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 25,
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
        opacity:(0.75),
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
        let props = this.props;
        if (e.target && e.target.image && e.target.image.files.length > 0) {
            var file = e.target.image.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                console.log('RESULT', reader.result)
                user.avatar = reader.result;
                // props.updateUser(team);
                props.registerUser(user,props.history);
            }
            reader.readAsDataURL(file);

        } else {
            // this.props.registerUser(user);
            this.props.registerUser(user, this.props.history);
        }
        
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
                className={'container'}
                className={classes.body}
                // style={{ marginTop: '50px', width: '700px' }}
                >
                <Paper className={classes.paper}>
                    <h2 className={classes.color} style={{ marginBottom: '40px' }}>Registration</h2>
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
