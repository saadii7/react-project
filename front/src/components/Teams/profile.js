
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Card } from 'reactstrap';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import store from '../../store';
import { fetchTeamPlayer } from '../../actions/team';


const styles = theme => ({
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

class TeamProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamId: this.props.match.params.id,
            players:null
        }
    }

    componentDidMount() {
        this.props.onFetchTeamPlayer(this.props.match.params.id)
        console.log("------Team---Profile------>", this.props.match.params.id)
    }   
    listView = (user, i) => {
        const { classes } = this.props;
        console.log("-------$$$$$$$$$$$---->", user)
        return (
            <div>
                <Grid item spacing={3} xs={9} >
                    <Paper className={classes.paper}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
                                    // image={user.avatar}
                                    title={user.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {user.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                        across all continents except Antarctica
                            </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                        </Button>
                                <Button size="small" color="primary">
                                    Learn More
                        </Button>
                            </CardActions>
                        </Card></Paper>
                </Grid>
                <br />
            </div>
        );
    }
    // setTimeout(function() {

    // }, 1000);
    
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>            
                <Grid container spacing={3}>
                    {this.props.players.team_players.map((user, i) =>
                        this.listView(user, i)
                    )}
                </Grid>
            </div>    
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        users: state.users,
        teams: state.teams,
        players: state.players
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchTeamPlayer: (id) => {
            dispatch(fetchTeamPlayer(id));
        },

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withRouter(TeamProfile)));