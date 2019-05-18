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
        this.props.onGetUser(this.props.auth.user.id)
    };
    render() {
        // const teamList = this.props.user.team
        // .map((tea) =>
        // <li key={tea.team}>{tea.team}</li> 
    // );
        return (
            <Card>
                <CardImg top width="100%" height='350px' src={this.props.user.avatar} alt={this.props.user.name} title={this.props.user.name} />
                <CardBody>
                    {/* <CardTitle>{teamList}</CardTitle> */}
                    <CardTitle>{this.props.user._id}</CardTitle>                    
                    <CardTitle>{this.props.user.name}</CardTitle>
                    <CardTitle>{this.props.user.userName}</CardTitle>
                    <CardTitle>{this.props.user.email}</CardTitle>
                </CardBody>
            </Card>
        );
    }
}
Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
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