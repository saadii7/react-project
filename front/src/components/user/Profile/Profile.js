// Profile.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getUser} from '../../../actions/user';
import { Card, CardImg, CardBody,CardTitle, CardSubtitle,Alert} from 'reactstrap';
import './Profile.css';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user : {}
        }
    }
    componentDidMount() {
        // this.setState({
        //     user: this.props.auth.user
        //     }),
            this.props.onGetUser(this.props.auth.user.id)
    };
    render() {
        const {isAuthenticated} = this.props.auth;
        const authLinks = (
            <Card>
                    <CardImg top width="100%" height='350px' src={this.props.user.avatar} alt={this.props.user.name} title={this.props.user.name}/>
                    <CardBody>
                    <CardTitle>{this.props.user.name}</CardTitle>
                    <CardTitle>{this.props.user.userName}</CardTitle>
                    <CardTitle>{this.props.user.email}</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    </CardBody>
                </Card>
        );
        const guestLinks = (
            <Alert color="danger">
                Please Check Your login
            </Alert>
          )
        return (
            <div>
                {isAuthenticated ? authLinks : guestLinks}
                
            </div>
        );
    }
}
Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};
const mapStateToProps = (state) =>{
    return{
        auth: state.auth,
        user:state.user
    };
};
const mapDispatchToProps = dispatch => {
    return {
      onGetUser: id => {
        dispatch(getUser(id));
      }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Profile);