import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createEvent } from '../../actions/event';
import { fetchAllSports } from '../../actions/sports';
import { fetchMyTeams, fetchTeamPlayer } from '../../actions/team';
import Grid from '@material-ui/core/Grid';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

const styles = theme => ({
    button: {
        margin: theme.spacing()
    },
    input: {
        display: 'none'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
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

class AddEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: '',
            date: '',
            time: '',
            eventDuration: '',
            selectedSport: '',
            location: '',
            latitude: '',
            longitude: '',
            eventImage: '',
            Discription: '',
            validationError: '',
            place: null,
        };

    }


    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const event = {
            name: this.state.eventName,
            date: this.state.date,
            duration: this.state.time,
            lat: this.state.latitude,
            lng: this.state.longitude,
            location: this.state.location,
            description: this.state.Discription,
            sport: this.state.selectedSport,
            maker: this.props.auth.user.id,
            host: this.props.auth.user.id
        };
        console.log(event);
        let props = this.props;
        if (e.target && e.target.image && e.target.image.files.length > 0) {
            var file = e.target.image.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                console.log('RESULT', reader.result)
                event.avatar = reader.result;
                // props.updateUser(team);
                props.onAddEvent(event);
            }
            reader.readAsDataURL(file);

        } else {
            this.props.onAddEvent(event);
            // this.props.registerUser(user);
        }
    };

    componentDidMount() {
        this.props.onFetchAllSports();
        this.props.onFetchMyTeams([this.props.auth.user.id], ['captain'])

    }
    reloadHandler(){
        window.location.reload();   
    }
    location_address = (location) => {
        console.log('Successfully got latitude and longitude-----###', location)
        geocodeByAddress(location)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) =>
                this.setState({
                    location: location,
                    latitude: lat,
                    longitude: lng
                })
                // console.log('Successfully got latitude and longitude', { lat, lng }),
            );
    }

    render() {
        const { classes } = this.props;
        // console.log('---GOoogle Api---->',this.state.place)
        return (
            <form onSubmit={this.handleSubmit} >
                {/* <Grid container>
                    <Grid item> */}
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
                        type='datetime-local'
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
                <GooglePlacesAutocomplete
                    onSelect={console.log}
                    onSelect={({ description }) => (
                        this.location_address(description),
                        this.setState({ location: description })
                    )}
                />
                {/* <div className='form-group'>
                        <GoogleComponent
                        apiKey={API_KEY}
                        language={'en'}
                        // name='place'
                        country={'country:pk'}
                        coordinates={true}
                        locationBoxStyle={'custom-style'}
                        locationListStyle={'custom-style-list'}
                        onChange={(e) => { this.setState({ place: e }) }} 
                        />
                    </div> */}
                < div className='form-group'>
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
                <Grid item>
                    <div className='form-group'>
                        <Button
                            type='submit'
                            variant='contained'
                            // onClick={this.reloadHandler()}
                            color='primary'
                            className={classes.button}>
                            Submit
                                    </Button>
                    </div>
                </Grid>
                {/* </Grid>
                </Grid> */}
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors,
        user: state.user,
        sports: state.sports,
        teams: state.teams,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddEvent: event => {
            dispatch(createEvent(event));
        },
        onFetchAllSports: () => {
            dispatch(fetchAllSports());
        },
        onFetchMyTeams: (id) => {
            dispatch(fetchMyTeams((id), ['captain']));
        },
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(withRouter(AddEvent)));

// AIzaSyDk3yd_KZu1VMBojiq8egFb2Jvxcx2O73c
