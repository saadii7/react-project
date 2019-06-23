import React, { Component } from 'react';
import { connect } from 'react-redux';
// import store from '../../store';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { fetchEvents } from '../../actions/event';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    table: {
        minWidth: 550,
    },
    toolbar: theme.mixins.toolbar,
    // paper: {
    //     position: 'absolute',
    //     width: theme.spacing(50),
    //     backgroundColor: theme.palette.background.paper,
    //     boxShadow: theme.shadows[5],
    //     padding: theme.spacing(4),
    // },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 400
    },
    image: {
        width: 128,
        height: 128
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%'
    }
});

class EventListing extends Component {
    deleteSport(e, index) {
        e.preventDefault();
        this.props.onDelete(index);
    }

    listView(data, index) {
        const { classes } = this.props;
        return (
            <Paper className={classes.tableRoot}>
                <Table className={classes.table}>
                    <TableHead>
                        Events
                </TableHead>
                    <TableBody>
                        <TableRow key={index}>
                            <TableCell component='th' scope='row'>
                                {data.eventName}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                {data._id}
                            </TableCell>
                            <TableCell align='right'>
                                <IconButton
                                    className={classes.button}
                                    aria-label='Edit'
                                    component='a'
                                    href={`/edit-vendor/${data._id}`}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    className={classes.button}
                                    aria-label='Delete'
                                    onClick={e => this.deleteSport(e, data._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>

        );
    }
    componentDidMount() {
        this.props.onGetEvents(this.props.auth.user.id);
        // store.dispatch(fetchAllEvents(eventList))
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <main className={classes.root}>
                    <div className={classes.toolbar} />

                    <Paper className={classes.root}>

                        {this.props.event.map((event, i) =>
                            this.listView(event, i)
                        )}
                    </Paper>

                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        sports: state.sports,
        event: state.event,
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetEvents: (id) => {
            dispatch(fetchEvents([id], ['maker']));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(withRouter(EventListing)));
