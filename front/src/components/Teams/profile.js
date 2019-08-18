
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUser } from '../../actions/user';
import EditProfile from '../Users/edit';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import Avatar from '@material-ui/core/Avatar';
import { Divider, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Modal from '@material-ui/core/Modal';

import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { fetchAllUsers } from '../../actions/user';
import store from '../../store';

const GREY = "#9E9E9E";
function getModalStyle() {
    const top = 10;
    const left = 30;

    return {
        top: `${top}%`,
        margin: 'auto',
        left: `${left}%`,
        // transform: `translate(-${top}%, -${left}%)`
    };
}

const styles = theme => ({
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

class TeamProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        // this.setState({
        //     user: this.props.auth.user
        //     }),
        console.log("Key---Props--state---->", this.state)
        this.props.onfetchAllUsers();
    };
    listView = (user, i) => {
        const { classes } = this.props;
        console.log("-------$$$$$$$$$$$---->", user)
        return (
            <div>
                {/* <Grid item xs={3}> */}
                {/* <Grid container spacing={3}> */}
                        <Grid item spacing={3} xs={9} > 
                <Paper className={classes.paper}> <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image={user.avatar}
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
                 <br/>
                   {/* </Grid> */}
                {/* </Grid> */}
            </div>
        );
    }
    render() {
        const { classes } = this.props;
        // const teamList = this.props.user.team
        // .map((tea) =>
        // <li key={tea.team}>{tea.team}</li> 
        // );
        return (
            <div>
                <Grid container spacing={3}>
                    {/* <Grid item xs={12}> */}
                        {this.props.users.map((user, i) =>
                            this.listView(user, i)
                        )}
                    {/* </Grid> */}
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
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onfetchAllUsers: () => {
            dispatch(fetchAllUsers());
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withRouter(TeamProfile)));