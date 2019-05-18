import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { updateSport } from '../../actions/sports';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
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
});

class EditSport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sport: {    
                sportName: ''
            }
        }

    }

    handleInputChange = e => {
        this.setState({
            sport: {
                ...this.state.sport,
                [e.target.name]: e.target.value
            }
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.onUpdateSport(this.state.sport);
        console.log(this.props.sports._id);
    };
    componentDidMount() {
        let props = this.props;
        this.setState({ sport: props.sport })
    }
    componentWillReceiveProps = (props) => {
        this.setState({ sport: props.sport })
    }
    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <TextField
                        id="outlined-name"
                        type="text"
                        name='sportName'
                        label="Add Sports"
                        className={classes.textField}
                        onChange={this.handleInputChange}
                        value={this.state.sport.sportName}
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <div className="form-group">
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Update
                    </Button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors,
        user: state.user,
        sports: state.sports
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onUpdateSport: (sport) => {
            dispatch(updateSport(sport));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withRouter(EditSport)));
