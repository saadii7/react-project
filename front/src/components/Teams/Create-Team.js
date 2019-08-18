import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles, responsiveFontSizes } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createTeam } from '../../actions/team';
import { fetchAllSports } from '../../actions/sports';
import store from '../../store';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { fetchAllUsers } from '../../actions/user';


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
        overflow: 'auto',

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
    },
    root: {
        overflowY: 'auto',
        // width: '100%',
        // maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
        left: theme.spacing(6),
        // boxShadow: theme.shadows[1],
        // outline: 'none'


    },
});

class CreateTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamImage: '',
            name: '',
            Discription: '',
            sport: '',
            sports: [],
            captain: '',
            selectedSport: '',
            validationError: '',
            checked: [],
            setChecked: [],
            selectedPlayer: [],
            count: null,
            open: false,
            add: true,
        };
    }

    openModal = () => {
        this.setState({ open: true });
    };
    editModal = sport => {
        this.setState({ open: true, add: false, sport });
    };
    closeModal = () => {
        this.setState({ open: false });
    };

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    
    handleSubmit = e => {
        e.preventDefault();
        const team = {
            name: this.state.name,
            Discription: this.state.Discription,
            sport: this.state.selectedSport,
            captain: this.props.auth.user.id
        };
        this.props.onAddTeam(team);
        this.playerHandler()
        // this.playerHandler()
        // let props = this.props;
        // if(e.target && e.target.image && e.target.image.files.length > 0){
        //     var file = e.target.image.files[0];
        //     var reader = new FileReader();
        //     reader.onloadend = function() {
        //         console.log('RESULT', reader.result)
        //         this.state.teamImage = reader.result;
        //         props.onAddTeam(team);;
        //     }
        //     reader.readAsDataURL(file);
        //     console.log(team);
        // }else{
        //     this.props.onAddTeam(team);
        // }
    };
    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }
    componentDidMount() {
        this.props.onFetchAllSports();
        store.dispatch(fetchAllUsers());
    }
    render() {
        const { classes } = this.props;

        return (
            <form onSubmit={this.handleSubmit} className={classes.container}>
                <Grid item xs={6}>
                    <div className='form-group'>
                        <TextField
                            id='outlined-name'
                            type='text'
                            name='name'
                            label='Team Name'
                            className={classes.textField}
                            value={this.state.name}
                            onChange={this.handleInputChange}
                            margin='normal'
                            variant='outlined'
                        />
                    </div>
                    <div className='form-group'>
                        <TextField
                            id='outlined-name'
                            type='file'
                            name='teamImage'
                            label='Image'
                            className={classes.textField}
                            value={this.state.teamImage}
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
                            name='Discription'
                            label='Discription'
                            className={classes.textField}
                            value={this.state.Discription}
                            onChange={this.handleInputChange}
                            margin='normal'
                            variant='outlined'
                        />
                    </div>
                    {/* //////// */}
                    {/* <div className='form-group'>
                        <Typography>Players Selected  {this.state.selectedPlayer.length}</Typography>
                    </div> */}

                    {/* //////// */}

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
                </Grid>
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
        users: state.users

    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddTeam: team => {
            dispatch(createTeam(team, (response) => {
                console.log('---------->>-----------', response);

            }
            ));
        },
        onFetchAllSports: () => {
            dispatch(fetchAllSports());
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(withRouter(CreateTeam)));
