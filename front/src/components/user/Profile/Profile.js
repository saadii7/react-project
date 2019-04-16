// Profile.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        this.setState({
            user: this.props.auth.users
            },
        function() {
            console.log('------------',this.props);
            console.log('------------',this.props.user);
        });
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/profile');

        }
    }
    render() {
        const {isAuthenticated} = this.props.auth;
        const authLinks = (
            <Card>
                    <CardImg top width="100%" height='350px' src={this.state.user.avatar} alt={this.state.user.name} title={this.state.user.name}/>
                    <CardBody>
                    <CardTitle>{this.state.user.name}</CardTitle>
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

const mapStateToProps = (state) => ({
    auth: state.auth,
    user:state.user
})
export default connect(mapStateToProps)(Profile);