import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {createSport} from '../../../actions/sports';
import SportsList from '../Sports-List/Sports-List';

class CreateSport extends React.Component {
  state = {
    sportName:''
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
      sportName:''
    });
  };

  render() {

const stylesApp = {
  marginTop: 40
}

    return (
      <div>
          <form onSubmit={ this.handleSubmit }>
          <div className="form-group" style={stylesApp}>
              <input
              type="text"
              placeholder="Sport"
              className="form-control"
              name="sportName"
              onChange={ this.handleInputChange }
              value={ this.state.sportName }
            />
          </div>
          
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Add Sport</button>
            <button type="button" className="btn btn-warning" onClick={ this.handleReset }>
              Reset
            </button>
          </div>
          <SportsList/>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
    auth: state.auth,
    errors: state.errors,
    user:state.user
    };   
};
const mapDispatchToProps = dispatch => {
    return {
      onAddSport: sport => {
        dispatch(createSport(sport));
      }
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CreateSport));