import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createGround } from '../../actions/grounds';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { fetchAllSports } from '../../actions/sports';
import ground from '../../assets/ground2.jpg';


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

class AddGrounds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: '',
            location: '',
            description: '',
            lat: '',
            lng: '',
            selectedSport: '',
            image: '',
        };

    }


    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const ground = {
            name: this.state.name,
            date: this.state.date,
            lat: this.state.lat,
            lng: this.state.lng,
            location: this.state.location,
            description: this.state.description,
            sport: this.state.selectedSport,
            avatar: this.state.image,
        };
        console.log(ground);
        let props = this.props;
        if (e.target && e.target.image && e.target.image.files.length > 0) {
            var file = e.target.image.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                console.log('RESULT', reader.result)
                ground.avatar = reader.result;
                props.onAddGround(ground);
            }
            reader.readAsDataURL(file);

        } else {
            this.props.onAddGround(ground);
            // this.props.registerUser(user);
        }
    };

    componentDidMount() {
        this.props.onFetchAllSports();
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
                <div className='form-group'>
                    <TextField
                        id='outlined-name'
                        type='text'
                        name='name'
                        label='Ground Name'
                        fullWidth
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        margin='normal'
                        variant='outlined'
                    />
                </div>
                {/* <div className='form-group'>
                    <TextField
                        id='outlined-name'
                        type='datetime-local'
                        name='date'
                        label=' Date'
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={this.state.date}
                        onChange={this.handleInputChange}
                        margin='normal'
                        variant='outlined'
                    />
                </div> */}
                <div className='form-group'>
                    <TextField
                        id='outlined-name'
                        type='file'
                        name='image'
                        label='Ground Image'
                        fullWidth
                        className={classes.textField}
                        value={this.state.image}
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
                        name='description'
                        label='Description'
                        fullWidth
                        className={classes.textField}
                        value={this.state.Description}
                        onChange={this.handleInputChange}
                        margin='normal'
                        variant='outlined'
                    />
                </div>
                <div className='form-group'>
                    <GooglePlacesAutocomplete
                        className={classes.textField}
                        loader={<img src={ground} />}
                        inputStyle={{ variant: "outlined", width: "100%", height: 50,  borderColor: '#181C1F',borderWidth: 5 }}
                        onSelect={console.log}
                        onSelect={({ description }) => (
                            this.location_address(description),
                            this.setState({ location: description })
                        )}
                    />
                </div>
                < div className='form-group'>
                    <div>
                        <TextField
                            // id=''
                            select
                            label='Sports'
                            fullWidth
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
                                <option key={sport._id} value={sport.name}>
                                    {sport.name}
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
                            color='primary'
                            className={classes.button}>
                            Submit
                                    </Button>
                    </div>
                </Grid>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        sports: state.sports,
        ground: state.ground
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddGround: (ground) => {
            dispatch(createGround(ground));
        },
        // onFetchAllGrounds: () => {
        //     dispatch(fetchAllGrounds());
        // },
        onFetchAllSports: () => {
            dispatch(fetchAllSports());
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withRouter(AddGrounds)));

