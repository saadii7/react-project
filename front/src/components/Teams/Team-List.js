import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
import Checkbox from '@material-ui/core/Checkbox';
import CheckboxListSecondary from './Checkbox';
import socket from '../../socket';
import { checkNotifications, CheckSocketNotifications, deleteNotificationSuccess } from '../../actions/notifications';
import { fetchAllUsers } from '../../actions/user';
import store from '../../store';



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
        position: 'absolute',
        width: theme.spacing(50),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: 'none'
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
            setChecked: [],
            teamId: '',
            open: false,
            checkedValues: []
        };
        this.editModal = props.editModal;
        this.closeModal = props.closeModal;
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
        let notifications = this.props.notifications;
        console.log('notifications' + notifications);
        console.log('Listening to notifications_for_' + this.props.auth.user.id);
        store.dispatch(checkNotifications([this.props.auth.user.id], ['to']));
        store.dispatch(fetchAllUsers());
        // console.log('------------0-0-0-0---noti-----', this.props.notifications)
        socket.on('notifications_for_' + this.props.auth.user.id, (data) => {
            console.log('data-------notification------added', data)
            switch (data.action) {
                case 'new':
                    for (let j = 0; j < this.props.users.length; j++) {
                        if (this.props.users[j]._id === data.data.from) {
                            data.data.user = this.props.users[j];
                            // let notifications = this.props.notifications;
                            // notifications.push(data.data);
                            this.props.onCheckSocketNotifications(data.data);
                            // this.setState({ notifications: notifications })
                            console.log('------------0-0-0-0--------', data.data)

                            //set store notification to this array "notifications"
                            break;
                        }
                    }
                    break;
                case 'delete':
                        this.props.onDeleteNotificationSuccess(data.data);
                        window.location.reload();
                    break;

                default:
                    break;
            }
        });
        this.setState({ open: this.props.open });
    }
    
    refreshPage = () => {
        window.location.reload();
    };
    wrapperFunction = (id) => {
        //do something
        this.openModal();
        //do something
        this.setState({
            teamId: id
        });
    }
    PlayerViewHandler = (id) => {
        console.log('-------TeamId-------->', id)
        this.props.onFetchTeamPlayer(id)
    }
    listView(data, index) {
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
                    {/* {data.users}
                    {data._id} */}
                </TableCell>
                <TableCell component='th' scope='row'>
                    <Fab size="small" color="primary" aria-label="add" className={classes.margin}>
                        <AddIcon
                            key={index}
                            onClick={() => this.wrapperFunction(data._id)}
                            aria-label='Edit' />
                    </Fab><Icon color="primary" />
                </TableCell>
                <TableCell component='th' scope='row'>
                    {/* {data._id} */}
                    <Fab size="small" color="primary" aria-label="add" className={classes.margin}>
                        <HomeIcon onClick={() => this.PlayerViewHandler(data._id)} className={classes.icon} />
                    </Fab><Icon color="primary" />
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
        );
    }
    handleCheck = (element, index) => {
        console.log('---------isChecked-------->', element, '==========>', this.state.checkedValues)
        const values = this.state.checkedValues.filter(e => e.id === element).length > 0
            ? this.state.checkedValues.splice(this.state.checkedValues.findIndex(e => e.id === element), 1)
            : this.state.checkedValues.push(element);
        for (let i = 0; i < this.state.checkedValues.length; i++) {
            this.setState({
                [this.state.checkedValues[i]]: values
            });
        }
        console.log('---------isChecked------>>>>>-->>>>', this.state.checkedValues)
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
        const { classes } = this.props;
        let friendButton;
        let Team_Member = this.props.teams.teams;
        console.log("Friends--------->", index, '-------------', user);
        // for (let i = 0; i < Team_Member.length; i++) {
        // for (let k = 0; k < Team_Member.user.length; k++) {
        // }

        // if (Team_Member[i].users.length > 0) {
        //     for (let j = 0; j < Team_Member[i].users.length;j++) {
        //         if (user._id === Team_Member[i].users[i]) {
        //             friendButton = (
        //                 <Button id="friendbutton" size="small" color="primary" variant='contained' >
        //                     Cancel
        //                         {/* <Icon className={classes.rightIcon}>send</Icon> */}
        //                 </Button>
        //             );
        //         } else {
        //             friendButton = (
        //                 <Button id="friendbutton" size="small" color="secondry" variant='contained' disabled={this.state.CheckButton} onClick={() => this.onSubmit(user._id)}>
        //                     Add
        //                     <Icon className={classes.rightIcon}>send</Icon>
        //                 </Button>
        //             );
        //         }
        //     }
        // }
        return (
            <div>
                <List dense key={user._id} className={classes.root}>
                    <ListItem key={user._id} button>
                        <ListItemAvatar>
                            <Avatar
                                alt={user.name}
                                src={user.avatar}
                            />
                        </ListItemAvatar>
                        <ListItemText id={user._id} primary={user.name} />
                        <ListItemSecondaryAction>
                        </ListItemSecondaryAction>
                        {/* {friendButton} */}
                        <Button onClick={()=>this.onSubmit(user._id)} color='primary' variant="contained">Add</Button>
                    </ListItem>
                </List>
            </div>
        );
        // }
    }
    render() {
        const { classes } = this.props;

        return (
            <div>
                <main className={classes.root}>
                    <div className={classes.toolbar} />
                    <Grid container spacing={24}>
                        <Grid item xs={6} />
                        <Grid item xs={3} container justify='flex-end' />
                    </Grid>
                    <Grid container spacing={24}>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Add Players</TableCell>
                                        <TableCell>Profile</TableCell>
                                        <TableCell>.      .</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.teams.teams.map((team, i) =>
                                        this.listView(team, i)
                                    )}
                                </TableBody>
                            </Table>
                            <Modal
                                aria-labelledby='simple-modal-title'
                                aria-describedby='simple-modal-description'
                                open={this.state.open}
                                onClose={this.closeModal}
                                center='true'>
                                <div style={getModalStyle()} className={classes.paper}>
                                    <Typography variant='h6' id='modal-title'>
                                        {/* <Button width="24" height="24" onClick={this.closeModal} variant="contained" color="secondary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM9.41 15.95L12 13.36l2.59 2.59L16 14.54l-2.59-2.59L16 9.36l-1.41-1.41L12 10.54 9.41 7.95 8 9.36l2.59 2.59L8 14.54z" /></svg>
                                        </Button> */}
                                        {<p>Add Team Members</p>}
                                        {this.props.users.map((users, index) => this.AddTeamPlayerHandler(users, index))}
                                    </Typography>
                                </div>
                            </Modal>
                        </Paper>
                    </Grid>
                </main>
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
