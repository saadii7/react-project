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

import CreateTeam from './Create-Team';
import TeamList from './Team-List';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

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
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(23),
        flexBasis: '33.33%',
        flexShrink: 0
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    },
    fab: {
        margin: theme.spacing(2),
        right: theme.spacing(3)
    },
    absolute: {
        top: theme.spacing(3),
        left: theme.spacing(3),
    },
    paper: {
        maxWidth: 500,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
        // position: 'absolute',
        // width: theme.spacing(110),
        backgroundColor: theme.palette.background.paper,
        // boxShadow: theme.shadows[5],
        // // overflow: 'scroll',
        // padding: theme.spacing(4),
        // outline: 'none'
    },
    modal: {
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        display: 'flex',
        flexWrap: 'wrap'
    }
});

class TeamIndex extends Component {
    state = {
        open: false,
        add: true,
        list: true,
        expanded: null,
        team: {}
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
            expanded: expanded ? panel : false
        });
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false
        });
    };
    componentDidMount() {}
    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        return (
            <div className={classes.root}>
                <ExpansionPanel
                    expanded={expanded === 'panel2'}
                    onChange={this.handleChange('panel2')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            Registered Teams
                        </Typography>
                        <Typography className={classes.secondaryHeading}>
                            Your Registered Teams
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <TeamList />
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel
                    expanded={expanded === 'panel3'}
                    onChange={this.handleChange('panel3')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            All Teams
                        </Typography>
                        <Typography className={classes.secondaryHeading}>
                            All upcoming Teams are Enlisted Here
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>Upcoming Teams</Typography>
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
                                {this.state.add && <p>Add New Team</p>}
                                {this.state.add && <CreateTeam />}
                            </Typography>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(TeamIndex);
