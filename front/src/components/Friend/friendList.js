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
import {Card} from 'reactstrap';
import { Paper } from '@material-ui/core';
import ProfileImg from '../../assets/profile.png';


import {
    Grid,
    CardContent,
    Typography,
    CardHeader
} from '@material-ui/core/';
import Profile from '../Users/Profile';
import {fetchAllFriends} from '../../actions/friend';


const styles = theme => ({
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
        maxWidth: 345,
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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
        let img;
        if (data._id !== this.props.auth.user.id) {
                if(data.avatar && data.avatar.length>0){
                    img = data.avatar
                }else{
                    img=ProfileImg
                }
    
            return (
                <div key={index}>
                    {console.log('$$$$' + data.userName)}
                    <Grid item xs={9} >
                        <Paper className={classes.paper}> <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
                                    image={img}
                                    title={data.userName}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {data.userName}
                                    </Typography>
                                    <Typography gutterBottom variant="h9" component="h4">
                                        Name:{data.name}
                                    </Typography>
                                    <Typography gutterBottom variant="h9" component="h4">
                                        Email:{data.email}
                                    </Typography>
                                    {/* <Typography variant="body2" color="textSecondary" component="p">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                        across all continents except Antarctica
                            </Typography> */}
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                            <Button size="small" color="primary">
                                View Profile
                                </Button>
                            {/* <FriendButton id={data._id} users={this.props.users} /> */}
                            </CardActions>
                        </Card></Paper>
                    </Grid>
                    <br />                        {/* <Grid item key={index} >
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
                        </Grid> */}
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

