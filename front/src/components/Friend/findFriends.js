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
// import { shadows } from '@material-ui/system';
import {
    Grid,
    CardContent,
    Typography,
    CardHeader
} from '@material-ui/core/';

import { fetchAllUsers, deleteUser } from '../../actions/user';
import { fetchAllFriends } from '../../actions/friend';
import Icon from '@material-ui/core/Icon';
import { checkFriendship, makeFriendRequest, endFriendship } from '../../actions/notifications';


// import FriendButton from './Friend-Button';

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    paper: {
        height: 250,
        width: 280,
        // padding: theme.spacing(24)
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60
    },
    card: {
        height: 250,
        width: 280,
        maxWidth: 385,
        // padding: theme.spacing(2)
    }, media: {
        height: 140,
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
        // { console.log('twstingx', data._id, "----", index) };
        const { classes } = this.props;
        let props = this.props;
        let friendButton;
        let friends = this.props.friends;
        // console.log(friends);
        if (friends.length > 0) {
            for (let i = 0; i < friends.length; i++) {
                if (data._id === friends[i]._id) {
                    friendButton = (
                        <Button id="friendbutton" size="small" color="primary" variant='contained' disabled >
                            Friends
                                {/* <Icon className={classes.rightIcon}>send</Icon> */}
                        </Button>
                    );
                } else {
                    friendButton = (
                        <Button id="friendbutton" size="small" color="primary" variant='contained' disabled={this.state.CheckButton} onClick={() => this.makeFriendRequest(data._id)}>
                            Add Friend
                            <Icon className={classes.rightIcon}>send</Icon>
                        </Button>
                    );
                }
            }
        } 
        // else {
        //     friendButton = (
        //         <Button id="friendbutton" size="small" color="primary" variant='contained' disabled={this.state.CheckButton} onClick={() => this.makeFriendRequest(data._id)}>
        //             Add Friend
        //             <Icon className={classes.rightIcon}>send</Icon>
        //         </Button>
        //     );
        // }
        if (data._id !== this.props.auth.user.id) {
            return (
                <div key={index}>
                    {/* {console.log('$$$$' + data.userName)} */}
                    <div>
                        <Grid item key={index} >
                            <CardActionArea >
                                <CardHeader
                                    title={data.userName}
                                    subheader={data.email}
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={data.avatar}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {data.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" variant='contained' color="primary">
                                    View Profile
                                </Button>
                                {/* <FriendButton id={data._id} users={this.props.users} /> */}
                                {friendButton}
                            </CardActions>
                        </Grid>
                    </div>
                </div>
            );
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
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
    };
};

const SimpleModalWrapped = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(withRouter(Friends)));
export default SimpleModalWrapped;
