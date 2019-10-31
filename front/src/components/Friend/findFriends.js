import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';

// import { shadows } from '@material-ui/system';
import {Grid,CardContent,Typography} from '@material-ui/core/';
import { fetchAllUsers, deleteUser } from '../../actions/user';
import { fetchAllFriends } from '../../actions/friend';
import ProfileImg from '../../assets/profile.png';
import Icon from '@material-ui/core/Icon';
import { checkFriendship, makeFriendRequest, endFriendship } from '../../actions/notifications';
import {deleteFriend} from '../../actions/friend';
const styles = theme => ({
    card: {
        maxWidth: 345,
        margin: 20
    },
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),

    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color:"#181C1F",
    },
});
class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            CheckButton: false

        };
        this.editModal = props.editModal;
        this.closeModal = props.closeModal;
    }
    editModal = e => { };
    closeModal = e => { };

    deleteUser(e, index) {
        e.preventDefault();
        this.props.onDelete(index);
    }
    componentDidMount() {
        // this.props.onGetUsers();
        store.dispatch(fetchAllFriends());
        this.props.onfetchAllFriends(this.props.auth.user.id);
        this.setState({
            users: this.props.users,
            authId: this.props.auth.user._id
        });
        // console.log('------state users----->' + this.state.users);
        // console.log('------ user ID----->' + this.props.auth.user.id);
    }
    refreshPage = () => {
        window.location.reload();
    };

    // renderUser=(user)=>{
    //     const {search}=this.state.search;
    //     var code = user.code.toLowerCase()
    //     if(search !== "" && user.name.indexOf(search)=== -1 ){
    //         return null
    //     }
    // }
    onSubmit = e => {
        e.preventDefault();
        console.log('chalo' + e);
    };
    makeFriendRequest = (e) => {
        const id = {
            to: e,
            from: this.props.auth.user.id,
            status: 'pending',
            type: 'friendship',
            content: 'friendship applied'
        }
        // console.log('makeFrinendRequestId-------->' + id)
        this.props.onMakeFriendRequest(id);
        this.state.CheckButton = true
    }

    listView(data, index) {
        // { console.log('twstingx', data, "----", index) };
        const { classes } = this.props;
        let props = this.props;
        let friendButton;
        let friends = this.props.friends;
        // console.log(friends);
        if (friends.length > 0) {
            for (let i = 0; i < friends.length; i++) {
                if (data._id === friends[i]._id) {
                    friendButton = (
                        <Button id="friendbutton" size="small" color="secondary" onClick={()=>this.props.onDeleteFriend(friends[i]._id)}>
                            Unfriend
                                {/* <Icon className={classes.rightIcon}>send</Icon> */}
                        </Button>
                    );
                } else {
                    friendButton = (
                        <Button id="friendbutton" size="small" color="primary" disabled={this.state.CheckButton} onClick={() => this.makeFriendRequest(data._id)}>
                            Add Friend
                            {/* <Icon className={classes.rightIcon}>send</Icon> */}
                        </Button>
                    );
                }
            }
        }
        else {
            friendButton = (
                <Button id="friendbutton" size="small" color="primary" variant='contained' disabled={this.state.CheckButton} onClick={() => this.makeFriendRequest(data._id)}>
                    Add Friend
                    <Icon className={classes.rightIcon}>send</Icon>
                </Button>
            );
        }
        let img;
        if (data._id !== this.props.auth.user.id) {
            if(data.avatar && data.avatar.length>0){
                // img = data.avatar
                img=ProfileImg
            }else{
                img=ProfileImg
            }
            return (
                <div key={index}>
                    <Grid item xs={9} >
                        <Paper className={classes.paper}> <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
                                    image={img}
                                    title={data.userName}
                                />
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
                                    {/* <Typography variant="body2" color="textSecondary" component="p">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                        across all continents except Antarctica
                            </Typography> */}
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                            <Button size="small" href={`/user/${data._id}/profile`} color="primary">
                                View Profile
                                </Button>
                            {/* <FriendButton id={data._id} users={this.props.users} /> */}
                            {friendButton}
                            </CardActions>
                        </Card></Paper>
                    </Grid>
                    <br />
                    {/* {console.log('$$$$' + data.userName)} */}
                </div>
            );
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container>
                    {this.props.users.map((user, i) => this.listView(user, i))}
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        sports: state.sports,
        users: state.users,
        auth: state.auth,
        friends: state.friends
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDelete: id => {
            dispatch(deleteUser(id));
        },
        onfetchAllFriends: id => {
            dispatch(fetchAllFriends(id));
        },
        onMakeFriendRequest: id => {
            dispatch(makeFriendRequest(id));
        }, 
        onDeleteFriend: id => {
            dispatch(deleteFriend(id));
        },
    };
};

const SimpleModalWrapped = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(withRouter(Friends)));
export default SimpleModalWrapped;
