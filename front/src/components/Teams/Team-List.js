import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { fetchAllTeams, deleteTeam, addTeamPlayer, fetchTeamPlayer } from '../../actions/team';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SvgIcon from '@material-ui/core/SvgIcon';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Typography, Button } from '@material-ui/core';

import socket from '../../socket';
import { checkNotifications, CheckSocketNotifications, deleteNotificationSuccess } from '../../actions/notifications';
import { fetchAllUsers } from '../../actions/user';
import store from '../../store';
import TeamProfile from './profile';
import MaterialTable from 'material-table';
import Drawer from '@material-ui/core/Drawer';
import { MenuItem } from '@material-ui/core';


function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}
function getModalStyle() {
    const top = 10;
    const left = 35;

    return {
        top: `${top}%`,
        margin: 'auto',
        left: `${left}%`,
        // transform: `translate(-${top}%, -${left}%)`
    };
}

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    toolbar: theme.mixins.toolbar,
    paper: {
        maxWidth: 500,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
        // position: 'absolute',
        // width: theme.spacing(110),
        backgroundColor: theme.palette.background.paper,
        // boxShadow: theme.shadows[5],
        overflowY: 'auto',
        // padding: theme.spacing(4),
        // outline: 'none'
        display: 'flex',
        flexWrap: 'wrap',
    },
    Button: {
        left: 200,
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60
    }
});
class TeamList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sports: [],
            selectedPlayer: [],
            count: null,
            open: false,
            add: true,
            isChecked: false,
            teamId: '',
            players: [],
            open: false,
            checkedValues: [],
            list: [],
            setState: []
        };
        this.editModal = props.editModal;
        // this.closeModal = props.closeModal;
    }
    editModal = e => { };
    // closeModal = e => { };
    openModal = () => {
        this.setState({ open: true });
    };

    closeModal = () => {
        this.setState({ open: false });
    };
    deleteTeam(e, index) {
        e.preventDefault();
        this.props.onDelete(index);
        console.log('-----delete Team---->', index)
    }
    componentDidMount() {
        // store.dispatch(fetchAllTeams());
        store.dispatch(fetchAllTeams([this.props.auth.user.id], ['captain']));
        this.setState({
            list: this.props.teams,
        })
        console.log('-------List-------->', this.state.list)
        console.log('-------Players-------->', this.state.players)

    }

    refreshPage = () => {
        window.location.reload();
    };
    wrapperFunction = (id) => {
        //do something
        console.log('-------Wrapper Function-------->')
        this.props.onFetchTeamPlayer(id)
        this.openModal();
        //do something
        this.setState({
            teamId: id,
        });
        // console.log('-------TeamId---00000----->', this.state.teamId)
        // console.log('-------Player---00000----->', this.state.players)

    }
    PlayerViewHandler = (id) => {
        console.log('-------TeamId-------->', id)
        this.setState({
            teamId: id,
        });
    }
    listView(data, index) {
        // console.log('--------listView------->')
        const { classes } = this.props;
        return (
            <div>
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
                        {/* {data.users}
                    {data._id} */}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                        <Fab size="small" color="primary" aria-label="add" className={classes.margin}>
                            <AddIcon
                                key={index}
                                onClick={() => this.wrapperFunction(data._id)}
                                aria-label='Add' />
                        </Fab>
                        <Icon color="primary" />
                    </TableCell>
                    <TableCell component='th' scope='row'>
                        {/* <HomeIcon key={index}  className={classes.icon}> */}
                        <Link to={`/teams/${data._id}/profile`}>
                            <Fab size="small" color="primary" className={classes.margin}>
                                <HomeIcon title={"Add"}>
                                    <Icon color="primary" />
                                </HomeIcon>
                            </Fab>
                        </Link>
                    </TableCell>
                    <TableCell component='th' scope='row'>
                        {data.discription}
                    </TableCell>
                    <TableCell>
                        <IconButton
                            className={classes.button}
                            key={index}
                            onClick={() => this.editModal(data)}
                            aria-label='Edit'>
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            className={classes.button}
                            aria-label='Delete'
                            onClick={e => {
                                this.deleteTeam(e, data._id);
                                this.refreshPage();
                            }}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            </div>
        );
    }
    onSubmit = (id) => {
        console.log("user----------ID-----Team---->", id);
        const teamPlayers = {
            teamId: this.state.teamId,
            userId: id
        }
        this.props.onAddTeamPlayers(teamPlayers)
    }
    
    AddTeamPlayerHandler = (user, index) => {
        console.log('meo----@@@')
        const { classes } = this.props;
        let playerButton;
        let players = 10;
        // Player Button for team selection 
        if (players.length > 0) {
            for (let i = 0; i < players.length; i++) {
                if (user._id === players[i]._id) {
                    playerButton = (
                        <Button id="friendbutton" size="small" onClick={() => this.onSubmit(user._id)} className={classes.Button} color='secondary' variant="contained">
                            Unfriend
                        </Button>
                    );
                } else {
                    playerButton = (
                        <Button id="friendbutton" size="small" onClick={() => this.onSubmit(user._id)} className={classes.Button} color='primary' variant="contained">
                            Add
                        </Button>
                    );
                }
            }
        }
        else {
            playerButton = (
                <Button id="friendbutton" size="small" onClick={() => this.onSubmit(user._id)} className={classes.Button} color='primary' variant="contained">
                    Add
                </Button>
            );
        }
        /////
        return (
            <Grid className={classes.container} wrap="nowrap" spacing={2} sm={6}>
                <Grid item>
                    <List dense key={user._id}>
                        <ListItem key={user._id}>
                            <ListItemAvatar>
                                <Avatar
                                    alt={user.name}
                                    src={user.avatar}
                                />
                            </ListItemAvatar>
                            <ListItemText id={user._id} primary={user.name} />
                            <ListItemSecondaryAction>
                            </ListItemSecondaryAction>
                            <Grid item>
                                {playerButton}
                                {/* <Button onClick={() => this.onSubmit(user._id)} className={classes.Button} color='primary' variant="contained">Add</Button> */}
                            </Grid>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        );
        // }
    }
    render() {
        const { classes } = this.props;

        return (
            <div>
                <main className={classes.root}>
                    <div className={classes.toolbar} />
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Add Players</TableCell>
                                <TableCell>Profile</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.teams.teams.map((team, i) =>
                                this.listView(team, i)
                            )}
                        </TableBody>
                    </Table>
                </main>
                <Modal
                    aria-labelledby='simple-modal-title'
                    aria-describedby='simple-modal-description'
                    open={this.state.open}
                    onClose={this.closeModal}
                    center='true'>
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant='h6' id='modal-title'>
                            {this.state.add && <p>Add New Team</p>}
                            {this.state.add && this.props.users.map((users, index) =>
                                this.AddTeamPlayerHandler(users, index)
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
        auth: state.auth,
        sports: state.sports,
        users: state.users,
        teams: state.teams,
        notifications: state.notifications,
        palyers: state.players

    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDelete: id => {
            dispatch(deleteTeam(id));
        },
        onFetchAllTeams: (id) => {
            dispatch(fetchAllTeams((id), ['captain']));
        },
        onAddTeamPlayers: (player) => {
            dispatch(addTeamPlayer(player));
        },
        onFetchTeamPlayer: (id) => {
            dispatch(fetchTeamPlayer(id));
        },
        onCheckSocketNotifications: (notification) => {
            dispatch(CheckSocketNotifications(notification));
        },
        onDeleteNotificationSuccess: (notification) => {
            dispatch(deleteNotificationSuccess(notification));
        },
        onCheckNotifications: (id) => {
            dispatch(checkNotifications([id], ['to']));
        },

    };
};

const SimpleModalWrapped = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(withRouter(TeamList)));
export default SimpleModalWrapped;
