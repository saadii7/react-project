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
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { fetchAllEvents } from '../../actions/event';
import cricket from "../../assets/cricket.jpeg";

const styles = theme => ({

    root: {
        flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    // paper: {
    //     position: 'absolute',
    //     width: theme.spacing.unit * 50,
    //     backgroundColor: theme.palette.background.paper,
    //     boxShadow: theme.shadows[5],
    //     padding: theme.spacing.unit * 4,
    // },
     paper: {
        padding: theme.spacing.unit * 2,
        margin: 'auto',
        maxWidth: 500,
      },
      image: {
        width: 128,
        height: 128,
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
});

class EventList extends Component {


    deleteSport(e, index) {
        e.preventDefault();
        this.props.onDelete(index);
    }

    listView(data, index) {
        const { classes } = this.props;
        return (
            <TableRow key={index}>
                <TableCell component="th" scope="row">
                    {data.eventName}
                </TableCell>
                <TableCell component="th" scope="row">
                    {data._id}
                </TableCell>
                <TableCell>
                    <IconButton className={classes.button} aria-label="Edit" component='a' href={`/edit-vendor/${data._id}`}>
                        <EditIcon />
                    </IconButton>
                    <IconButton className={classes.button} aria-label="Delete" onClick={(e) => this.deleteSport(e, data._id)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        )
    };
    componentDidMount() {
        this.props.onGetEvents(this.props.auth.user.id)
        // store.dispatch(fetchAllEvents(eventList)) 
    };
    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <main className={classes.root}>
                        <div className={classes.toolbar} />
                        <Grid container spacing={24}>
                            <Grid item xs={6}>
                            </Grid>
                            <Grid item xs={3} container justify="flex-end">
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Paper className={classes.root}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.props.event.map((event, i) => this.listView(event, i))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </main>
                </div>
                <br/>
                <div>
                    <div className={classes.root}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={16}>
                                <Grid item>
                                    <ButtonBase className={classes.image}>
                                        <img className={classes.img} alt="complex" src={cricket} />
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={16}>
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1">
                                                Standard license
                                            </Typography>
                                            <Typography variant="title" gutterBottom align="center">VS</Typography>
                                            
                                            <Typography color="textSecondary">ID: 1030114</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography style={{ cursor: 'pointer' }}>Remove</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                    <ButtonBase className={classes.image}>
                                        <img className={classes.img} alt="complex" src={cricket} />
                                    </ButtonBase>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </div>
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
        onGetEvents: id => {
            dispatch(fetchAllEvents([id],['maker']))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withRouter(EventList)));
