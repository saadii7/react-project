import React, { Component } from 'react';
// import SearchIcon from '@material-ui/icons/Search';
// import InputBase from '@material-ui/core/InputBase';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import EventListing from './listing';
import AddEvent from './Add-Events';
// import Map from '../Map/Map'
function getModalStyle() {
    const top = 10;
    const left = 30;

    return {
        top: `${top}%`,
        margin: 'auto',
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
        padding: theme.spacing.unit * (1, 1, 1, 5),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 300,
        },
    },
    fab: {
        margin: theme.spacing.unit * 1,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit * 1,
    },
    paper: {
        maxHeight: 500,
        position: 'absolute',
        width: 700,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: 'none',
        overflow: 'scroll',
    },
    modalStyle1: {
        position: 'absolute',
        top: '10%',
        left: '10%',
        overflow: 'scroll',
        height: '100%',
        display: 'block'
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3)
    },
});
class EventIndex extends Component {
    state = {
        events: [],
        open: false,
        add: true,
        event: {}
    };
    openModal = () => {
        this.setState({ open: true });
    };
    editModal = event => {
        this.setState({ open: true, add: false, event });
    };
    closeModal = () => {
        this.setState({ open: false });
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
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
                <EventListing events={this.state.events} />
                {/* <Map
                            location={this.state.Location}
                            google={this.props.google}
                            center={{ lat: 31.5204, lng: 74.3587 }}
                            height='300px'
                            zoom={15}
                        /> */}
                <Modal
                    aria-labelledby='simple-modal-title'
                    aria-describedby='simple-modal-description'
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                    // className={classes.modalStyle1}
                    open={this.state.open}
                    onClose={this.closeModal}
                    center='true'>
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant='h6' id='modal-title'>
                            {this.state.add && <p> Create Event</p>}
                            {this.state.add && <AddEvent />}

                            {!this.state.add && <p>Update Sport</p>}
                            {/* {!this.state.add && (
                                <EditSport sport={this.state.sport} />
                            )} */}

                        </Typography>
                    </div>
                </Modal>
            </div>
        );
    }
}
export default (withStyles(styles, { withTheme: true })(withRouter(EventIndex)));
