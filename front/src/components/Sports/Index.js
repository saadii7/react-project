import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import CreateSport from './Create-Sport';
import SportsList from './Sports-List';
import Modal from '@material-ui/core/Modal';
import EditSport from './Edit-Sport';

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
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
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

class Index extends React.Component {
    state = {
        open: false,
        add: true,
        sport: {}
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
            <div className={classes.root}>
                <Paper className={classes.root}>
                    <Typography variant='h5' component='h3'>
                        Sports
                    </Typography>
                    <Typography component='h3'>
                        <SportsList
                            editModal={this.editModal}
                            closeModal={this.closeModal}
                        />
                    </Typography>
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
                            {this.state.add && <p>Add New Sport</p>}
                            {this.state.add && <CreateSport />}

                            {!this.state.add && <p>Update Sport</p>}
                            {!this.state.add && (
                                <EditSport sport={this.state.sport} />
                            )}
                        </Typography>
                    </div>
                </Modal>
            </div>
        );
    }
}
// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(Index);
export default SimpleModalWrapped;
