import React, { Component } from 'react';
import { connect } from 'react-redux';
// import store from '../../store';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
import { fetchAllGrounds } from '../../actions/grounds';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Card } from 'reactstrap';
import { Paper } from '@material-ui/core';
import ProfileImg from '../../assets/profile.png';


import {
    Grid,
    CardContent,
    Typography,
    CardHeader
} from '@material-ui/core/';


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
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        width: '100%'

    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});
class GroundList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        this.props.onFetchAllGrounds();
        console.log('grounds============', this.props.ground)
    }

    listView(data, index) {
        const { classes } = this.props;
        let img;
        if (data._id !== this.props.auth.user.id) {
            if (data.avatar && data.avatar.length > 0) {
                img = data.avatar
                // img=ProfileImg
            } else {
                img = ProfileImg
            }

            return (
                <div key={index}>
                    {console.log('$$$$' + data.userName)}
                    <Grid item xs={9} >
                        <Paper className={classes.paper}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="140"
                                        image={img}
                                        title={data.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {data.name}
                                        </Typography>
                                        <Typography gutterBottom variant="h9" component="h4">
                                            {data.description}
                                        </Typography>
                                        <Typography gutterBottom variant="h9" component="h4">
                                            Location:{data.location}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        View Profile
                                </Button>
                                </CardActions>
                            </Card></Paper>
                    </Grid>
                    <br />
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
                    {this.props.ground.grounds.map((ground, i) => this.listView(ground, i))}

                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        ground: state.ground
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchAllGrounds: () => {
            dispatch(fetchAllGrounds());
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withRouter(GroundList)));