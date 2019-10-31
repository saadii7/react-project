import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import EventListing from './listing';
import AddEvent from './Add-Events';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import ListSubheader from '@material-ui/core/ListSubheader';
import UserProfile from './user_bio';
import Trending from '../Home/Features';
import Container from '@material-ui/core/Container';

// import Map from '../Map/Map';
function getModalStyle() {
    const top = 10;
    const left = 15;

    return {
        top: `${top}%`,
        margin: 'auto',
        left: `${left}%`,
        // transform: `translate(-${top}%, -${left}%)`
    };
}

const styles = theme => ({
 
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),

    },
    sticky: {
        background: 'black',
        position: '-webkit-sticky',
        position: 'sticky',
        // top: 20,
        bottom: 20,
        // marginTop:'40px',
        // paddingTop: '40px',
        paddingBottom: '40px',
        // zIndex: 5,
    },
    fab: {
        margin: 0,
        top: 'auto',
        float: "right",
        position: 'left',
        backgroundColor: '#181C1F',
        '&:hover': {
            backgroundColor: ("#FB8122"),
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        overflow: 'auto',
        maxHeight: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
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
            <div>
                {console.log('EventIndex------',this.props.auth.user.id)}
                <Grid container direction='row' className={classes.root} spacing={6}>
                    <Grid item>
                    {/* <ListSubheader > */}
                         <UserProfile id={this.props.auth.user.id} user={this.props.auth.user}/>
                    {/* </ListSubheader> */}
                    </Grid>
                    <Grid item direction="column" md={6}>
                        <EventListing id={this.props.auth.user.id}/>
                    </Grid>
                    <Grid item direction="column" md={3}>
                        <Trending />
                    </Grid>
                </Grid>


                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.open}
                    onClose={this.closeModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.open}>
                        <div className={classes.paper}>
                            <Typography variant='h6' id='modal-title'>
                                {this.state.add && <p> Create Event</p>}
                                {this.state.add && <AddEvent />}
                            </Typography>
                        </div>
                    </Fade>
                </Modal>

            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(withRouter(EventIndex)));

// export default (withStyles(styles, { withTheme: true })(withRouter(EventIndex)));
