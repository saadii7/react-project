// Profile.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../actions/user';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';


class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: {}
        }
    }
    componentDidMount() {
        // this.setState({
        //     user: this.props.auth.user
        //     }),
        this.props.onGetUser(this.props.auth.user.id);
        console.log('------->'+this.props.auth.user._id);
    };
    render() {   
        return (
            <Card>
                <CardImg top width="100%" height='350px' src={this.props.auth.user.avatar} alt={this.props.auth.user.name} title={this.props.auth.user.name} />
                <CardBody>
                    <CardTitle>{this.props.auth.user._id}</CardTitle>                    
                    <CardTitle>{this.props.auth.user.name}</CardTitle>
                    <CardTitle>{this.props.auth.user.userName}</CardTitle>
                    <CardTitle>{this.props.auth.user.email}</CardTitle>
                </CardBody>
            </Card>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        user: state.user
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onGetUser: id => {
            dispatch(getUser(id));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);