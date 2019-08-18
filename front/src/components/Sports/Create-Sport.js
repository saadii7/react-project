import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { createSport } from '../../actions/sports';

const styles = theme => ({
    button: {
        margin: theme.spacing()
    },
    input: {
        display: 'none'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing(),
        marginRight: theme.spacing()
    }
});

class CreateSport extends React.Component {
    state = {
        name: ''
    };

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.name.trim()) {
          
                const name=this.state.name

            this.props.onAddSport(name);
            this.handleReset();
        }
    };

    handleReset = () => {
        this.setState({
            name: ''
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <TextField
                        id='outlined-name'
                        type='text'
                        name='name'
                        label='Add Sports'
                        className={classes.textField}
                        onChange={this.handleInputChange}
                        value={this.state.name}
                        margin='normal'
                        variant='outlined'
                    />
                </div>
                <div className='form-group'>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={classes.button}>
                        Submit
                    </Button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors,
        user: state.user
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddSport: sport => {
            dispatch(createSport(sport));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(withRouter(CreateSport)));
