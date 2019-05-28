import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import CreateEvent from './Create-Event';
import AllEventList from './Event-List';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}



const styles = theme => ({
    root: {
        width: '100%',
        // paddingTop: theme.spacing.unit * 2,
        // paddingBottom: theme.spacing.unit * 2
    },
    modal: {
        // ...theme.mixins.gutters(),
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },
    heading: {
        fontSize: theme.typography.pxToRem(23),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    fab: {
        margin: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none'
    }
});

class EditIndex extends Component {
    state = {
        open: false,
        add: true,
        expanded: null,
        event: {}
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
    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        return (

            <div className={classes.root}>
                <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Registered Events</Typography>
                        <Typography className={classes.secondaryHeading}>
                            Your Registered Events
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <AllEventList />
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>All Events</Typography>
                        <Typography className={classes.secondaryHeading}>
                            All upcoming Events are Enlisted Here
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Upcoming Events
                       </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

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
                        open={this.state.open}
                        onClose={this.closeModal}
                        center='true'>
                        <div style={getModalStyle()} className={classes.paper}>
                            <Typography variant='h6' id='modal-title'>
                                {this.state.add && <p>Add New Event</p>}
                                {this.state.add && <CreateEvent />}

                                {/* {!this.state.add && <p>Update Sport</p>}
                                {!this.state.add && (
                                    <EditSport sport={this.state.sport} />
                                )} */}
                            </Typography>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
};


export default withStyles(styles)(EditIndex);