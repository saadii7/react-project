import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../store';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { fetchEventById, fetchAllEvents } from '../../actions/event';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Modal from '@material-ui/core/Modal';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import allSport from '../../assets/allsport.jpg';
import Event_Img from '../../assets/Mega_Event.jpg';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';
import { deleteSportSuccess } from '../../actions/sports';
import { fetchAllSports } from '../../actions/sports';
import { fetchMyTeams, fetchTeamPlayer } from '../../actions/team';
import TeamList from '../Teams/Team-List';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import { CheckTeamPlayers,deleteEvent} from '../../actions/event';
import { fetchAllUsers } from '../../actions/user';
import FullScreenDialog from './player_select';
import trophy from '../../assets/trophy.png';
import marker from '../../assets/map-marker.png';
import clock from '../../assets/clock.png';
import MapContainer from './FullEvent';
// import { mdiTrophy } from '@mdi/font';
function getModalStyle() {
    const top = 10;
    const left = 30;

    return {
        top: `${top}%`,
        margin: 'auto',
        left: `${left}%`,
        // transform: `translate(-${top}%, -${left}%)`
    };
}
const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingBottom: theme.spacing(2)
    },
    bottom_Navigation: {
        flexGrow: 1,
        outline: '20px',
        justifyContent: "space-between",
        // overflow: 'scroll',
    },
    myButtonClass: {
        justify: 'center',
        width: '100%',
        color: 'white',
        backgroundColor: "#FB8122",
        '&:hover': {
            backgroundColor: ('#ff9800'),
        },

    },
    paper: {
        maxHeight: 500,
        position: 'absolute',
        width: 700,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: 'none',
        overflow: 'scroll',
    },

    card: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        borderTop: '4px solid',
        borderColor: "#FB8122",
        boxShadow: theme.shadows[5],
    },
    image: {
        width: 128,
        height: 128
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%'
    },

});

class EventListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players_list: [],
            faulty_players: [],
            sportName: '',
            sportId: '',
            EventId: '',
            open: false,
            add: true,
            value: '',
            TeamType: ''
        };
    }

    openModal = () => {
        this.setState({ open: true });
    };
    editModal = event => {
        this.setState({ open: true, add: false, event });
    };
    closeModal = () => {
        this.setState({ open: false });
    };
    // componentDidMount(){
    //     this.props.onFetchAllSports();
    // }
    deleteSport(e, index) {
        e.preventDefault();
        this.props.onDelete(index);
    }
    teamList(data, index) {
        const { classes } = this.props;
        return (
            <TableRow key={index}>
                <TableCell component='th' scope='row'>
                    <Avatar
                        alt='Remy Sharp'
                        src={data.avatar}
                        className={classes.bigAvatar}
                    />{' '}
                </TableCell>
                <TableCell component='th' scope='row'>
                    {data.name}
                </TableCell>
                <TableCell component='th' scope='row'>
                    {data._id}
                    {/* <Typography gutterBottom variant="subtitle1">
                                                        Standard license
                                                    </Typography> */}
                </TableCell>
                <TableCell component='th' scope='row'>
                    {data.discription}
                </TableCell>
                <TableCell>
                    <FullScreenDialog type={this.state.TeamType} teamId={data._id} eventId={this.state.EventId} users={this.state.players_list} checkTeam={() => this.handleSubmit(data._id)} />
                    {/* <Button onClick={() => this.handleSubmit(data._id)} color='primary'>Select Players</Button> */}
                </TableCell>
            </TableRow>
        );
    }

    handleSubmit=(id)=>{
        // { console.log("Event Id------------->", this.state.EventId) }
        // this.props.onFetchTeamPlayer(id);
        let event = { eventId: this.state.EventId }
        this.props.onCheckTeamPlayers(id, event);
    }

    wraperFunction=(id, TeamType)=>{
        // console.log("-----TeamType---->", TeamType)
        this.setState({
            EventId: id,
            TeamType: TeamType
        }, () => console.log("Helloooooooo", this.state.EventId, this.state.TeamType));
        this.openModal()
    }
    deleteWraperFunction=(id)=>{
        this.props.onDeleteEvent(id)
        console.log("-----deleteWraperFunction---->",id)
        window.location.reload()
    }
    listView(data, index) {
        const { classes } = this.props;
        // const time = new Date(data.date);
        let current_datetime = new Date(data.date)
        let formatted_date = current_datetime.toLocaleString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
        let sportName;
        let img;
        let Team_Button;
        let Delete_Button;
        let sports = this.props.sports;
        if (data.avatar && data.avatar.length > 0) {
            img = data.avatar
        } else {
            img = Event_Img
        }
        if (data.maker === this.props.auth.user.id) {
            Delete_Button = (
                <IconButton onClick={() => this.deleteWraperFunction(data._id)} color='primary'>
                  <DeleteRoundedIcon />
                </IconButton>
                // <Button onClick={this.openModal} label="select team" icon={<GroupAddRoundedIcon/>}>select team</Button>
            );
            Team_Button = (
                <IconButton onClick={() => this.wraperFunction(data._id, 'host')} color='primary'>
                    <GroupAddRoundedIcon />
                </IconButton>
                // <Button onClick={this.openModal} label="select team" icon={<GroupAddRoundedIcon/>}>select team</Button>
            );
            // console.log('-----------------Bravo----------')
        } else {
            Delete_Button = (
                null
                // <Button size='small' color='primary' onClick={() => this.wraperFunction(data._id, 'opponent')}> Challange </Button>
            );
            Team_Button = (
                <Button size='small' color='primary' onClick={() => this.wraperFunction(data._id, 'opponent')}>Accept </Button>
            )
            // console.log('-----------------Bitvh----------')
        }
        for (let i = 0; i < sports.length; i++) {
            if (sports[i]._id === data.sport) {
                sportName = sports[i].name;
                break;
            }
        }
        let users = this.props.users
        let event_data = data;
        // console.log( 'chalo fi-------->',  event_data.maker)
        for (let i = 0; i < event_data.length; i++) {
            for (let j = 0; j < users.length; j++) {
                if (users[j]._id === event_data.host) {
                    event_data[i].host = users[j];
                    console.log('Host------>', event_data[i].host)
                    break;
                }
            }
        }
        // this.setState({ notifications: notifications })

        return (
            // <Grid container className={classes.root} justify='center'>
            <Card key={index} className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label={this.props.auth.user.name} src={this.props.auth.user.avatar} className={classes.avatar} />
                    }
                    title={`${this.props.auth.user.name}`}
                    subheader={`created at:${data.createdAt}`}
                />
                <Typography fontWeight="fontWeightMedium" fontSize={14} color="textSecondary">
                </Typography>
                <CardContent>
                    <Typography gutterBottom className={classes.title} variant="h5" component="h2">
                        {data.name}
                    </Typography>
                    <Typography component="p">{data.description}</Typography>
                </CardContent>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="180"
                        image={img}
                        title={data.name}
                    />
                </CardActionArea>

                <CardContent>

                    <Typography variant="h5" align='center' gutterBottom>
                        <img src={trophy} />
                        {sportName}  Match
                                        </Typography>
                    <Typography align='center' variant="h4">
                        Vs
                                            </Typography>

                    <Typography><img src={clock} />{`${formatted_date}`}</Typography>
                    <Typography><img src={marker} />{`${data.location}`}</Typography>
                </CardContent>
                <CardActions>
                    <BottomNavigation
                        value={this.state.value}
                        onChange={(e, newValue) => this.setState({
                            value: newValue
                        })}
                        showLabels
                        className={classes.bottom_Navigation}
                    >
                        {Team_Button}
                    </BottomNavigation>
                    <Button className={classes.myButtonClass} onClick={() => this.props.onFetchEventById(data._id)} component={Link} to={`/event/${data._id}/index`} variant='contained'>Event Info</Button>
                    {Delete_Button}
                </CardActions>
            </Card>
            //  </Grid>
        );
    }

    componentDidMount() {
        this.props.onGetEvents(this.props.match.params.id);
        this.props.onFetchAllSports();
        this.props.onFetchMyTeams(this.props.auth.user.id, ['captain']);
        store.dispatch(fetchAllUsers());
    }
    render() {
        const { classes } = this.props;
        return (

            <div className={classes.root}>
                {/* <Grid container> */}
                {this.props.event.events.map((event, i) =>
                    this.listView(event, i)
                )}
                {/* </Grid> */}
                <Modal
                    aria-labelledby='simple-modal-title'
                    aria-describedby='simple-modal-description'
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                    open={this.state.open}
                    onClose={this.closeModal}
                    center='true'>
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant='h6' id='modal-title'>
                            {this.state.add && <p>Select Team</p>}
                            {this.props.teams.teams.map((team, i) =>
                                this.teamList(team, i)
                            )}
                        </Typography>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        sports: state.sports,
        event: state.event,
        auth: state.auth,
        teams: state.teams,
        players: state.players
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchMyTeams: (id) => {
            dispatch(fetchMyTeams((id), ['captain']));
        },
        onFetchTeamPlayer: (id) => {
            dispatch(fetchTeamPlayer(id));
        },
        onGetEvents: (id) => {
            dispatch(fetchAllEvents([id], ['maker']));
        },
        onFetchAllSports: () => {
            dispatch(fetchAllSports());
        },
        onCheckTeamPlayers: (id, event) => {
            dispatch(CheckTeamPlayers(id, event))
        },
        onFetchEventById: (id) => {
            dispatch(fetchEventById(id))
        },
        onDeleteEvent: (id) => {
        dispatch(deleteEvent(id))
        },
        

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(withRouter(EventListing)));
