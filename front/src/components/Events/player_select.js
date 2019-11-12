import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import { Paper } from '@material-ui/core';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import ProfileImg from '../../assets/profile.png';
import Icon from '@material-ui/core/Icon';
import {addPlayers} from '../../actions/event';
// import { shadows } from '@material-ui/system';
import {
    Grid,
    CardContent,
    CardHeader
} from '@material-ui/core/';
const styles = theme => ({
    appBar: {
        backgroundColor: '#FB8122',
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    paper: {
        padding: theme.spacing(2),
    }
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class FullScreenDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players_list: [],
            selected_Players: [],
            open: false,
            eventId: props.eventId,
            TeamId:props.teamId,
            TeamType:props.type,
            add: false,
            CheckButton: false
        };
        this.checkTeam = props.checkTeam;
    }
    // const [open, setOpen] = React.useState(false);
    checkTeam = () => { }

    handleClickOpen = () => {
        this.setState({ open: true });
        this.checkTeam();
    }

    handleClose = () => {
        this.setState({ open: false });
    }
    handleSave = () => {
        this.setState({ open: false });
        const team={
            teamType:this.state.TeamType,
            teamId:this.state.TeamId,
            playerIds:this.state.selected_Players
        }
        this.props.onAddPlayers(this.state.eventId,team)
    }

    UNSAFE_componentWillReceiveProps(props) {
        // this.userFilter(props)
        // console.log("--------------ndsfkjbsdfhkjsb kjrhkfs,jgkjs-------->", props.players.Non_faulty_players)
        this.setState({ players_list: props.players.Non_faulty_players });
    }
    componentWillUpdate(props){
        console.log("--------------update-------->", props)
    }
    playersSelection = (id) => {
        console.log('selected players--------->', id);
        // for (let i = 0; i < players.length; i++){}
        this.setState(previousState => ({
            selected_Players: [...previousState.selected_Players,id],
            CheckButton:true
        }),()=>{console.log('selected players--------->', this.state.selected_Players)}
        );
        // this.setState({ selected_Players: id },()=>{console.log('selected players--------->', this.state.selected_Players)}
        // )
    }
    listView(data, index) {
        // { console.log('twstingx', data, "----", index) };
        const { classes } = this.props;
        let props = this.props;
        let players = this.state.players_list;
        let PlayerButton;
        let img;
        if (data._id !== this.props.auth.user.id) {
            if (data.avatar && data.avatar.length > 0) {
                // img = data.avatar
                img = ProfileImg
            } else {
                img = ProfileImg
            }
        }
        // if (friends.length > 0) {
        for (let i = 0; i < players.length; i++) {
            if (data._id === this.state.selected_Players[i] || this.state.selected_Players[i] > 0) {
                PlayerButton = (
                    <Button id="friendbutton" size="small" color="secondary">
                        Delete
                        </Button>
                );
            } else {
                PlayerButton = (
                    <Button id="friendbutton" size="small" color="primary" onClick={() => this.playersSelection(data._id)} disabled={this.state.CheckButton}>
                        Select
                        </Button>
                );
            }
        }
        // }
        return (
            <div key={index} className={classes.paper}>
                <Grid item xs={9}>
                    <Paper >
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
                                    src={img}
                                    image={img}
                                    title={data.userName}
                                />
                            </CardActionArea>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {data.userName}
                                    </Typography>
                                    <Typography gutterBottom variant="h9" component="h4">
                                        Name:{data.name}
                                    </Typography>
                                    <Typography gutterBottom variant="h9" component="h4">
                                        Email:{data.email}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                            <Button id="friendbutton" size="small" color="primary" onClick={() => this.playersSelection(data._id)} >
                        Select
                        </Button>
                                {/* {PlayerButton} */}
                                {/* <Button onClick={()=>this.playersSelection(data._id)} size="small" color="primary">
                                        Select
                                    </Button> */}
                            </CardActions>
                        </Card></Paper>
                </Grid>
                <br />
                {/* {console.log('$$$$' + data.userName)} */}
            </div>
        );
    }


    render() {
        const { classes } = this.props;

        return (
            <div>
                {/* {this.userFilter()} */}
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Select Players
                </Button>
                <Dialog fullScreen open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Players
                            </Typography>
                            <Button color="inherit" onClick={this.handleSave}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Grid container>
                        {this.state.players_list.map((user, i) => this.listView(user, i))}
                    </Grid>
                </Dialog>
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
        onAddPlayers: (id,players) => {
            dispatch(addPlayers(id,players));
        },
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(withRouter(FullScreenDialog)));
