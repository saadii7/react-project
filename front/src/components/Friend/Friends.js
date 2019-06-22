import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { fetchAllUsers, deleteUser } from '../../actions/user';
import { createFriendRequest } from '../../actions/friend';
import FriendButton from './Friend-Button';

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
    },
    card: {
        maxWidth: 345
    }
});
class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            spacing: '24'
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
        // this.props.onGetUsers();
        store.dispatch(fetchAllUsers());
        this.setState({
            users: this.props.users,
            authId: this.props.auth.user._id
        });
        console.log('------state users----->' + this.state.users);
        console.log('------ user ID----->' + this.props.auth.user.id);
    }
    refreshPage = () => {
        window.location.reload();
    };

    // renderUser=(user)=>{
    //     const {search}=this.state.search;
    //     var code = user.code.toLowerCase()
    //     if(search !== "" && user.name.indexOf(search)=== -1 ){
    //         return null
    //     }
    // }
    onSubmit = e => {
        e.preventDefault();
        console.log('chalo' + e);
    };

    listView(data, index) {
        const { classes } = this.props;
        return (
            <div key={index}>
                {console.log('$$$$' + data.userName)}
                <div>
                    <Grid
                        container
                        className={classes.root}
                        justify='center'
                        spacing={24}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        component='img'
                                        alt={data.userName}
                                        height='140'
                                        src={data.avatar}
                                        title={data.userName}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant='h5'
                                            component='h2'>
                                            {data.userName}
                                        </Typography>
                                        <Typography component='p'>
                                            Explore latest exclusive updates on
                                            cricket all over the world.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button variant='contained' color='primary'>
                                        Message
                                    </Button>
                                    <FriendButton onClick={data._id} />
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
    render() {
        // const { classes } = this.props;

        return (
            <div>
                {this.props.users.map((user, i) => this.listView(user, i))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        sports: state.sports,
        users: state.users,
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDelete: id => {
            dispatch(deleteUser(id));
        },
        onRequest: id => {
            dispatch(createFriendRequest(id));
        }
    };
};

const SimpleModalWrapped = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(withRouter(Friends)));
export default SimpleModalWrapped;
