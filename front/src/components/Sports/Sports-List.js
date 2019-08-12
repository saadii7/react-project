import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { deleteSport, fetchAllSports } from '../../actions/sports';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    toolbar: theme.mixins.toolbar,
    paper: {
        position: 'absolute',
        width: theme.spacing(50),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: 'none'
    }
});
class SportsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sports: []
        };
        this.editModal = props.editModal;
        this.closeModal = props.closeModal;
    }
    editModal = e => {};
    closeModal = e => {};

    deleteSport(e, index) {
        e.preventDefault();
        this.props.onDelete(index);
    }
    componentDidMount() {
        this.props.onFetchAllSports();
    }
    listView(data, index) {
        const { classes } = this.props;
        return (
            <TableRow key={index}>
                <TableCell component='th' scope='row'>
                    {data.name}
                </TableCell>
                <TableCell>
                    <IconButton
                        className={classes.button}
                        key={index}
                        onClick={() => this.editModal(data)}
                        aria-label='Edit'>
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
        );
    }
    render() {
        const { classes } = this.props;

        return (
            <div>
                <main className={classes.root}>
                    <div className={classes.toolbar} />
                    <Grid container spacing={24}>
                        <Grid item xs={6} />
                        <Grid item xs={3} container justify='flex-end' />
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
                                    {this.props.sports.map((sport, i) =>
                                        this.listView(sport, i)
                                    )}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        sports: state.sports
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDelete: id => {
            dispatch(deleteSport(id));
        },
        onFetchAllSports: () => {
            dispatch(fetchAllSports());
        }
    };
};

const SimpleModalWrapped = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(withRouter(SportsList)));
export default SimpleModalWrapped;
