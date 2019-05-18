import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import cricket from '../../assets/cricket.jpeg';
import football from '../../assets/football.jpeg';
import basketball from '../../assets/basketball.jpg';
import allSport from '../../assets/allsport.jpg';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    
    card: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
    link:{
        decoration: 'none',
    }
});

class Features extends Component {
    state = {
        spacing: '24',
    };
    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.root} justify='center' spacing={24}>
                <Grid item xs={3}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={cricket}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Cricket
                                </Typography>
                                <Typography component="p">
                                    Explore latest exclusive updates on cricket all over the world.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Link component="button" to="/cricket">Explore More</Link>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={3}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={football}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Football
                                </Typography>
                                <Typography component="p">
                                    Explore latest exclusive updates on football all over the world.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                        <Link component="button" to="/football">Explore More</Link>
                        </CardActions>
                    </Card>

                </Grid>
                <Grid item xs={3}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={basketball}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Basketball
                                </Typography>
                                <Typography component="p">
                                Explore latest exclusive updates on Basketball all over the world.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                        <Link component="button" to="/sports-news">Explore More</Link>
                        </CardActions>
                    </Card>

                </Grid>
                <Grid item xs={3}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={allSport}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Latest Sports News
                                </Typography>
                                <Typography component="p">
                                Explore news of sports all around the world in a minute.                                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                        <Link component="button" to="/sports-news">Explore More</Link>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        );
    }
};
export default withStyles(styles)(Features);
