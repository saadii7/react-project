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

class TeamProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: []
        };
    };
    listView(data, index) {
        return (
            <TableRow key={index}>
                <TableCell component="th" scope="row">
                    {data.sportName}
                </TableCell>
                <TableCell component="th" scope="row">
                    {data._id}
                </TableCell>
            </TableRow>
        )
    };
    render() {
        const { classes } = this.props;
        return (
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
                                    {this.props.sports.map((sport, i) => this.listView(sport, i))}
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
        user: state.user
    };
};

// export default connect(mapStateToProps, mapDispatchToProps)(SportsList);
export default connect(mapStateToProps)(withStyles({ withTheme: true })(withRouter(TeamProfile)));
