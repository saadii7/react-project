import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Global from '../News/Shared/Global';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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
    link: {
        decoration: 'none',
    }
});
class Headlines extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spacing: '24',
            sportNews: []
        };

    }
    componentDidMount() {
        var urlPath = Global.NewsUrl + "v2/top-headlines?country=in&category=sports&page=1&pageSize=3&apiKey=" + Global.NewsApiKey;

        axios.get(urlPath)
            .then(res => {
                const sportNews = res.data.articles;
                this.setState({ sportNews });
            })
    }
    render() {
        const { classes } = this.props;
        
        return (
            <div>
                <div>
                    <Typography>
                        Top Headlines
                    </Typography>
                    <Link to="/sports-news" component='button' className="btn btn-secondary btn-block">View All</Link>
                </div>
                        <Grid container className={classes.root} justify="center" spacing={24}>
                            {
                                this.state.sportNews.map((sn, i) => {
                                    return (
                                        <Card key={i} className={classes.card}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    image={sn.urlToImage}
                                                    title="Contemplative Reptile"
                                                    href={sn.url}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {sn.title}
                                                    </Typography>
                                                    <Typography component="p">
                                                        {sn.description}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Link component="button" to="/cricket">Explore More</Link>
                                            </CardActions>
                                        </Card>

                                    )
                                })
                            }
                        {/* </Grid>
                    </Grid> */}
                    </Grid>
            </div>

                );
            }
        }
        export default withStyles(styles)(Headlines);
