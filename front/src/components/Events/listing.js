import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import store from '../../store';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { fetchEvents } from '../../actions/event';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import allSport from '../../assets/allsport.jpg';



const styles = theme => ({
    root: {
        flexGrow: 1
    },
    table: {
        minWidth: 550,
    },
    toolbar: theme.mixins.toolbar,
    // paper: {
    //     position: 'absolute',
    //     width: theme.spacing(50),
    //     backgroundColor: theme.palette.background.paper,
    //     boxShadow: theme.shadows[5],
    //     padding: theme.spacing(4),
    // },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 400
    },
    image: {
        width: 128,
        height: 128
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%'
    }
});

class EventListing extends Component {
    deleteSport(e, index) {
        e.preventDefault();
        this.props.onDelete(index);
    }

    listView(data, index) {
        const { classes } = this.props;
        return (
            <Grid container className={classes.root} justify='center'>
                <Grid item xs={3}>
                    <Card key={index} className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={allSport}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {data.eventName}
                                </Typography>
                                <Typography component="p">
                                    Explore latest exclusive updates on cricket all over the world.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            {/* <IconButton
                                className={classes.button}
                                aria-label='Edit'
                                component='a'
                                href={`/edit-vendor/${data._id}`}>
                                <EditIcon />
                            </IconButton> */}
                            <Link component="a" to={`/edit-vendor/${data._id}`}><EditIcon/></Link>
                            <Link component="button" to={`/edit-vendor/${data._id}`}>Event Info</Link>                            
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        );
    }
    componentDidMount() {
        this.props.onGetEvents(this.props.auth.user.id);
        // store.dispatch(fetchAllEvents(eventList))
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <main className={classes.root}>
                    <div className={classes.toolbar} />

                    <Paper className={classes.root}>

                        {this.props.event.map((event, i) =>
                            this.listView(event, i)
                        )}
                    </Paper>

                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        sports: state.sports,
        event: state.event,
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetEvents: (id) => {
            dispatch(fetchEvents([id], ['maker']));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(withRouter(EventListing)));
