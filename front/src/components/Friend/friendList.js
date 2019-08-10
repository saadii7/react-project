import React, { Component } from 'react';
import { connect } from 'react-redux';
// import store from '../../store';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import {
    Grid,
    CardContent,
    Typography,
    CardHeader
} from '@material-ui/core/';
import Profile from '../Users/Profile';
import {fetchAllFriends} from '../../actions/friend';


const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    paper: {
        height: 250,
        width: 280,
        // padding: theme.spacing(24)
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60
    },
    card: {
        height: 250,
        width: 280,
        maxWidth: 385,
        // padding: theme.spacing(2)
    }, media: {
        height: 140,
    },
});
class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        this.props.onfetchAllFriends(this.props.auth.user.id);
        }
    refreshPage = () => {
        window.location.reload();
    };
    viewProfile=(id)=>{
        console.log('--------Frnd Profile----->');
        return(<Profile id={id}/>);
    }
    listView(data, index) {
        const { classes } = this.props;
        if (data._id !== this.props.auth.user.id) {
            return (
                <div key={index}>
                    {console.log('$$$$' + data.userName)}
                    <div>
                        <Grid item key={index} >
                            <CardActionArea >
                                <CardHeader
                                    title={data.userName}
                                    subheader={data.email}
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={data.avatar}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {data.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" onClick={()=>this.viewProfile(data._id)} variant='contained' color="primary">
                                    View Profile
                                    {console.log("Key---id--->",data._id)}
                                </Button>
                            </CardActions>
                        </Grid>
                    </div>
                </div>
            );
        }
    }
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    {this.props.friends.map((user, i) => this.listView(user, i))}

                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        friends:state.friends
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onfetchAllFriends: id => {
            dispatch(fetchAllFriends(id));
        },
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles, { withTheme: true })(withRouter(FriendList)));

