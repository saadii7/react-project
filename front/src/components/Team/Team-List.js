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
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { fetchAllTeams, deleteTeam } from '../../actions/team';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar,
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  }
});
class UsersList extends Component {
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

  deleteUser(e, index) {
    e.preventDefault();
    this.props.onDelete(index);
  }
  componentDidMount() {
    // store.dispatch(fetchAllTeams());
    this.props.onFetchAllTeams();
  }
  refreshPage = () => {
    window.location.reload();
  };

  listView(data, index) {
    const { classes } = this.props;
    return (
      <TableRow key={index}>
        <TableCell component='th' scope='row'>
          <Avatar
            alt='Remy Sharp'
            src={data.avatar}
            className={classes.bigAvatar}
          />{' '}
        </TableCell>
        <TableCell component='th' scope='row'>
          {data.teamName}
        </TableCell>
        <TableCell component='th' scope='row'>
          {data._id}
        </TableCell>
        <TableCell component='th' scope='row'>
          {data.discription}
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
            onClick={e => {
              this.deleteUser(e, data._id);
              this.refreshPage();
            }}>
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
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Id</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.team.map((team, i) => this.listView(team, i))}
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
    sports: state.sports,
    users: state.users,
    team: state.team
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => {
      dispatch(deleteTeam(id));
    },
    onFetchAllTeams: () => {
      dispatch(fetchAllTeams());
    }
  };
};

const SimpleModalWrapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(withRouter(UsersList)));
export default SimpleModalWrapped;
