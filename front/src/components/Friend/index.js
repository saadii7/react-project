import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Friends from './Friends';

// function rand() {
//     return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
    const top = 10;
    const left = 30;

    return {
        top: `${top}%`,
        margin:'auto',
        left: `${left}%`,
        // transform: `translate(-${top}%, -${left}%)`
    };
}

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
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing.unit * (1,1,1,5),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 300,
        },
    },
    fab: {
        margin: theme.spacing.unit*1,
      },
      extendedIcon: {
        marginRight: theme.spacing.unit*1,
      },
    paper: {
    maxHeight:500,
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    overflow:'scroll',
  },
  modalStyle1:{
    position:'absolute',
    top:'10%',
    left:'10%',
    overflow:'scroll',
    height:'100%',
    display:'block'
  }
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
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'Search' }}
                />
               <div className={classes.root}>
                    <Paper className={classes.modal}>
                        <div>
                            <Tooltip title='Add' aria-label='Add'>
                                <Fab
                                    color='primary'
                                    onClick={this.openModal}
                                    className={classes.absolute}>
                                    <AddIcon />
                                </Fab>
                            </Tooltip>
                        </div>
                    </Paper>
                    <Modal
                        aria-labelledby='simple-modal-title'
                        aria-describedby='simple-modal-description'
                        style={{alignItems:'center',justifyContent:'center'}}
                        // className={classes.modalStyle1}
                        open={this.state.open}
                        onClose={this.closeModal}
                        center='true'>
                        <div style={getModalStyle()} className={classes.paper}>
                            <Typography variant='h6' id='modal-title'>
                                {this.state.add && <p>Players</p>}
                                {this.state.add && <Friends/>}
                            </Typography>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}
export default (withStyles(styles, { withTheme: true })(withRouter(FriendIndex)));
