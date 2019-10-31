import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
// import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
// import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import { acceptFriendRequest } from '../../actions/friend';
import socket from '../../socket';
import { deleteNotification } from '../../actions/notifications';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
    width: 400,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  post: {
    width: 400,
  },
  root: {
    width: '100%',
    maxWidth: 360,

  },
  inline: {
    display: 'inline',
  },
  button: {
    marginLeft: theme.spacing(4),
  },

});

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      user: []
    }
  }
  friendRequestHandler = (id, friendId, notificationId) => {
    // console.log('idkjandjan-------->', id,friendId)
    this.props.onAcceptFriendRequest(id, friendId, notificationId);
    // window.location = window.location
  }
  deleteNotification = (id) => {
    // console.log('idkjandjan-------->', id,friendId)
    this.props.ondeleteNotification(id);
    // window.location = window.location
  }

  componentWillReceiveProps = props => {
    { console.log('NOtification data props------>', props) }
    this.setState({
      [this.state.notifications]: props.notifications
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>

        <List className={classes.root}>
          {
            this.props.notifications.map((notification) => {
              if (this.props.auth.user.id !== notification.from) {
                return (
                  <Paper>

                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="Profile Picture" src={notification.user.avatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={notification.user.name}
                        // secondary={this.props.auth.user.name}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              {/* {" — I'll be in your neighborhood doing errands this…"} */}
                              {this.props.auth.user.name}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <Button variant="contained" color="primary" className={classes.button} onClick={() => this.friendRequestHandler(this.props.auth.user.id, notification.from, notification._id)}>Accept</Button>
                      <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.deleteNotification(notification._id)}>Cancel</Button>

                    </ListItem>
                  </Paper>
                  // <Divider variant="inset" component="li" />
                );
              }
            })
          }
        </List>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  notifications: state.notifications,

});
const mapDispatchToProps = dispatch => {
  return {
    onAcceptFriendRequest: (id, friendId, notificationId) => {
      dispatch(acceptFriendRequest(id, friendId, notificationId));
    },
    ondeleteNotification: (id) => {
      dispatch(deleteNotification(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withRouter(Notifications)));
