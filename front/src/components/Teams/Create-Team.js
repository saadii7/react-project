import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createTeam } from '../../actions/team';
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

class CreateTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamImage: '',
            teamName: '',
            Discription: '',
            sportName: '',
            sports: [],
            captain: 'ALiCH',
            selectedSport: '',
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
            teamName: this.state.teamName,
            Discription: this.state.Discription,
            sportName: this.state.selectedSport,
            captain: this.props.auth.user.id
        };
        this.props.onAddTeam(team);
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
                        name='teamName'
                        label='Team Name'
                        className={classes.textField}
                        value={this.state.teamName}
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
                                <option key={sport._id} value={sport.value}>
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
        onAddTeam: team => {
            dispatch(createTeam(team));
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
