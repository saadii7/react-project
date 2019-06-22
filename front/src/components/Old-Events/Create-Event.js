import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createEvent } from '../../actions/event';
import { fetchAllSports } from '../../actions/sports';

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
    },
    dense: {
        marginTop: 16
    },
    menu: {
        width: 200
    }
});

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: '',
            date: '',
            time: '',
            eventDuration: '',
            eventCatagory: '',
            selectedSport: '',
            Location: '',
            Contact: '',
            eventImage: '',
            Discription: '',
            validationError: ''
        };
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const team = {
            eventName: this.state.eventName,
            date: this.state.date,
            duration: this.state.time,
            location: this.state.Location,
            description: this.state.Discription,
            sport: this.state.selectedSport,
            maker: this.props.auth.user.id
        };
        console.log(team);
        this.props.onAddEvent(team);
        // let props = this.props;
        // if(e.target && e.target.image && e.target.image.files.length > 0){
        //     var file = e.target.image.files[0];
        //     var reader = new FileReader();
        //     reader.onloadend = function() {
        //         console.log('RESULT', reader.result)
        //         user.avatar  = reader.result;
        //         props.updateUser(team);
        //     }
        //     reader.readAsDataURL(file);

        // }else{
        //     this.props.registerUser(user);
        // }
    };
    componentDidMount() {
        this.props.onFetchAllSports();
    }
    render() {
        const { classes } = this.props;
        return (
            <form onSubmit={this.handleSubmit} className={classes.container}>
                <div className='form-group'>
                    <TextField
                        id='outlined-name'
                        type='text'
                        name='eventName'
                        label='Event Name'
                        className={classes.textField}
                        value={this.state.eventName}
                        onChange={this.handleInputChange}
                        margin='normal'
                        variant='outlined'
                    />
                </div>
                <div className='form-group'>
                    <TextField
                        id='outlined-name'
                        type='date'
                        name='date'
                        label='Event Date'
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={this.state.date}
                        onChange={this.handleInputChange}
                        margin='normal'
                        variant='outlined'
                    />
                </div>
                <div className='form-group'>
                    <TextField
                        id='outlined-name'
                        type='text'
                        name='time'
                        label='Event Duration'
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={this.state.time}
                        onChange={this.handleInputChange}
                        margin='normal'
                        variant='outlined'
                    />
                </div>
                <div className='form-group'>
                    <TextField
                        id='outlined-name'
                        type='file'
                        name='eventImage'
                        label='Event Image'
                        className={classes.textField}
                        value={this.state.eventImage}
                        onChange={this.handleInputChange}
                        margin='normal'
                        variant='outlined'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    -
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                <div className='form-group'>
                    <TextField
                        id='outlined-name'
                        type='text'
                        name='Location'
                        label='Location'
                        className={classes.textField}
                        value={this.state.Location}
                        onChange={this.handleInputChange}
                        margin='normal'
                        variant='outlined'
                    />
                </div>
                <div className='form-group'>
                    <TextField
                        id='outlined-name'
                        type='text'
                        name='Discription'
                        label='Discription'
                        className={classes.textField}
                        value={this.state.Discription}
                        onChange={this.handleInputChange}
                        margin='normal'
                        variant='outlined'
                    />
                </div>
                <div className='form-group'>
                    <div>
                        <TextField
                            id='outlined-select-currency-native'
                            select
                            label='Sports'
                            className={classes.textField}
                            value={this.state.selectedSport}
                            onChange={e =>
                                this.setState({
                                    selectedSport: e.target.value,
                                    validationError:
                                        e.target.value === ''
                                            ? 'You must select your favourite sport'
                                            : ''
                                })
                            }
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                    className: classes.menu
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        -
                                    </InputAdornment>
                                )
                            }}
                            helperText='Please select your favourite sport'
                            margin='normal'
                            variant='outlined'>
                            {this.props.sports.map(sport => (
                                <option key={sport._id} value={sport._id}>
                                    {sport.sportName}
                                </option>
                            ))}
                        </TextField>
                    </div>
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
        user: state.user,
        sports: state.sports
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddEvent: event => {
            dispatch(createEvent(event));
        },
        onFetchAllSports: () => {
            dispatch(fetchAllSports());
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(withRouter(Event)));
