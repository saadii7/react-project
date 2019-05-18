import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CreateTeam from './Create-Team';
// import TeamProfile from './Team-Profile';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },

});

function PaperSheet(props) {
  const { classes } = props;

  return (
    <div>
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" component="h3">
            Create New Team
          <CreateTeam />
          </Typography>
          <Typography component="p" color='secondary'>
            On the time of submition the creator of team assume as captain of team.
        </Typography>
        </Paper>
      </div>
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" component="h3">
            My Teams
          </Typography>          
          <Typography component="p" color='secondary'>
            {/* <TeamProfile/> */}
        </Typography>
        </Paper>
      </div>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);