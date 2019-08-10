import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import { checkFriendship, makeFriendRequest, endFriendship } from '../../actions/notifications';
import {fetchAllFriends} from '../../actions/friend';


const styles = theme => ({
    button: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
});

class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CheckButton:false
        };
    }

    makeFriendRequest = (e) => {
        const id = {
            to: e,
            from: this.props.auth.user.id,
            status: 'pending',
            type: 'friendship',
            content: 'friendship applied'
        }
        console.log('makeFrinendRequestId-------->' + id)
        this.props.onMakeFriendRequest(id);
        this.state.CheckButton=true
    }

    // acceptFriendRequest = (e) => {
    //     console.log('aceeptRequestId-------->' + e)
    //     this.checkFrienship(e)
    //     this.props.onAcceptFriendship(e);
    // }
    componentWillReceiveProps(props){
        // console.log('-------FrndButton-----Props->',props)
    }
    componentDidMount() {
        this.props.onfetchAllFriends(this.props.auth.user.id);
        }
    endFriendship = (e) => {
        this.props.onEndFriendship(e);
    }
    render() {
        const { classes } = this.props;
        let friendButton;
        let props = this.props;
        let friends=this.props.friends;
        let users=this.props.users;

        // friendButton = (
        //     <Button id="friendbutton" size="small" color="primary" variant='contained' disabled={this.state.CheckButton} onClick={() => this.makeFriendRequest(props.id)}>
        //         Add Friend
        //                 <Icon className={classes.rightIcon}>send</Icon>
        //     </Button>
        // );
        // console.log(friends);
        // for (let i = 0; i <  friends.length; i++) {
            
        //     for (let j = 0; j < users.length; j++) {
        //         // console.log(users[j]._id, 'chalo fi-------->', notifications)
        //         if (users[j]._id === friends[i]._id) {
        //             // friends[i].user = users[j];
        //             console.log('chalo User--101010110------>',friends[i]._id, users[j]._id)
        //             // friendButton = (
        //             //     <Button id="friendbutton" size="small" color="primary" variant='contained' disabled >
        //             //         Friends
        //             //                 {/* <Icon className={classes.rightIcon}>send</Icon> */}
        //             //     </Button>
        //             // );                
        //         }else
        //         {
        //             console.log('nooooooo');
        //             // friendButton = (
        //             //     <Button id="friendbutton" size="small" color="primary" variant='contained' disabled={this.state.CheckButton} onClick={() => this.makeFriendRequest(props.id)}>
        //             //     Add Friend
        //             //             <Icon className={classes.rightIcon}>send</Icon>
        //             // </Button>
        //             // );              
        //         }
        //     }
        // }
        // this.setState({ notifications: notifications })
    // }
        // if (props.notifications.content === 'friendship applied') {
        //     if (props.notifications.status === 'pending') {
        //         // if (this.state.sender === this.props.otherUserId) {
        //             friendButton = (
        //                 <Button
        //                     variant="contained"
        //                     color="primary"
        //                     id="friendbutton"
        //                     align='right'
        //                     onClick={() => this.acceptFriendRequest(props.id)}
        //                 >
        //                     Accept Request
        //                 </Button>
        //             );
        //         // }
        //     }
        // }
        //         if (this.state.sender !== this.props.otherUserId) {
        //             friendButton = (
        //                 <Button
        //                     variant="contained"
        //                     color="primary"
        //                     onClick={() => this.endFriendship(props.id)} id="endfriendship">
        //                     Cancel friend request
        //                 </Button>
        //             );
        //         }
        //     }
        //     if (this.state.status===!'pending') {
        //         friendButton = (
        //             <Button
        //                 variant="contained"
        //                 color="primary"
        //                 onClick={() => this.endFriendship(props.id)} id="endfriendship">
        //                 End friendship
        //             </Button>
        //         );
        //     }
        // }

        return <div className={classes.button}>{friendButton}</div>

    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        auth: state.auth,
        notifications: state.notifications,
        friends:state.friends
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCheckFrienship: id => {
            dispatch(checkFriendship(id));
        },
        onMakeFriendRequest: id => {
            dispatch(makeFriendRequest(id));
        },
        onEndFriendship: id => {
            dispatch(endFriendship(id));
        },
        onfetchAllFriends: id => {
            dispatch(fetchAllFriends(id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })((withRouter(FriendButton))))
