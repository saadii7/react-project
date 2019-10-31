import React, { Component } from 'react';
// import SearchIcon from '@material-ui/icons/Search';
// import InputBase from '@material-ui/core/InputBase';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Friends from './findFriends';

const styles = theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 1),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.60),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 7,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
class FriendIndex extends Component {
    state = {
        events: [],
        open: false,
        add: true,
    };
    openModal = () => {
        this.setState({ open: true });
    };
    editModal = sport => {
        this.setState({ open: true, add: false, sport });
    };
    closeModal = () => {
        this.setState({ open: false });
    };
    render() {
        const { classes } = this.props;
        return (
            <div >
                <div className={classes.root}>
                    <Typography variant='h6' id='title'>
                        {this.state.add && <p>Players</p>}
                        {this.state.add && <Friends />}
                    </Typography>
                </div>
            </div>
        );
    }
}
export default (withStyles(styles, { withTheme: true })(withRouter(FriendIndex)));
