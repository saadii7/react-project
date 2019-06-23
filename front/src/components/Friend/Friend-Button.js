import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

import { checkFriendship, makeFriendRequest, endFriendship } from '../../actions/friend';

const styles = theme => ({
    button: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
});

class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.makeFriendRequest = this.makeFriendRequest.bind(this);
        this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
        this.endFriendship = this.endFriendship.bind(this);
    }

    checkFrienship = (e) => {
        this.props.onCheckFrienship(e)
        console.log('checkFriendship id-------->' + this.props.id)
    }

    makeFriendRequest = (e) => {
        this.props.onMakeFriendRequest(e);
    }

    acceptFriendRequest = (e) => {
        console.log('aceeptRequestId-------->' + e)
        this.checkFrienship(e)
        this.props.onAcceptFriendship(e);
    }

    endFriendship = (e) => {
        this.props.onEndFriendship(e);
    }

    render() {
        const { classes } = this.props;
        let friendButton;
        let props = this.props;
        if (this.state.noRelationship) {
            friendButton = (
                <Button id="friendbutton" onClick={() => this.makeFriendRequest(props.id)}>
                    Make friend request
                    <Icon className={classes.rightIcon}>send</Icon>
                </Button>
            );
        }
        if (!this.state.noRelationship) {
            if (!this.state.accepted) {
                if (this.state.sender === this.props.otherUserId) {
                    friendButton = (
                        <Button
                            variant="contained"
                            color="primary"
                            id="friendbutton"
                            align='right'
                            onClick={() => this.acceptFriendRequest(props.id)}
                        >
                            Accept Request
                        </Button>
                    );
                }
                if (this.state.sender !== this.props.otherUserId) {
                    friendButton = (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.endFriendship(props.id)} id="endfriendship">
                            Cancel friend request
                        </Button>
                    );
                }
            }
            if (this.state.accepted) {
                friendButton = (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.endFriendship(props.id)} id="endfriendship">
                        End friendship
                    </Button>
                );
            }
        }

        return <div className={classes.button}>{friendButton}</div>;
    }
}

const mapStateToProps = state => {
    return {
        sports: state.sports,
        users: state.users,
        auth: state.auth
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
        onAcceptFriendship: id => {
            dispatch((id));
        },
        onEndFriendship: id => {
            dispatch(endFriendship(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })((withRouter(FriendButton))))
