import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { createSport } from '../../actions/sports';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class CreateSport extends React.Component {
  state = {
    sportName: ''
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.sportName.trim()) {
      this.props.onAddSport(this.state);
      this.handleReset();
    }
  };

  handleReset = () => {
    this.setState({
      sportName: ''
    });
  };

  render() {
    const { classes } = this.props;

    return (
        <form className={classes.container} onSubmit={this.handleSubmit}>
          <div className="form-group">
            <TextField
              id="outlined-name"
              type="text"
              name='sportName'
              label="Add Sports"
              className={classes.textField}
              onChange={this.handleInputChange}
              value={this.state.sportName}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div className="form-group">
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              Submit
            </Button>
          </div>
        </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddSport: sport => {
      dispatch(createSport(sport));
    }
  };
};
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateSport));
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withRouter(CreateSport)));
