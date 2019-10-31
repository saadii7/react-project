import React from 'react';
import { Link } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '../Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
// import './Home_Card.css';
import highlights from '../../assets/highlights.jpg';
import news from '../../assets/news.jpg';
import grounds from '../../assets/grounds.png';


const styles = theme => ({
    root: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4),
    },
    images: {
        marginTop: theme.spacing(8),
        display: 'flex',
    },
    flexWrap: 'wrap',
    card: {
        maxWidth: 345,
    },
    imageWrapper: {
        position: 'relative',
        display: 'block',
        padding: 0,
        borderRadius: 0,
        height: '40vh',
        [theme.breakpoints.down('sm')]: {
            width: '100% !important',
            height: 100,
        },
        '&:hover': {
            zIndex: 1,
        },
        '&:hover $imageBackdrop': {
            opacity: 0.15,
        },
        '&:hover $imageMarked': {
            opacity: 0,
        },
        '&:hover $imageTitle': {
            border: '4px solid currentColor',
        },
    },
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: theme.palette.common.black,
        opacity: 0.5,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        background: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
});

function ProductCategories(props) {
    const { classes } = props;

    const images = [
        {
            url:
                'https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&w=400&q=80',
            title: 'News',
        },
        {
            url:
                'https://images.unsplash.com/photo-1531299204812-e6d44d9a185c?auto=format&fit=crop&w=400&q=80',
            title: 'Highlights',
        },
        {
            url:
                'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400&q=80',
            title: 'Blogs',
        },

    ];

    return (
        <Container className={classes.root} component="section">
            <Typography variant="h4" marked="center" align="center" component="h2">
                For all tastes and all desires
      </Typography>

            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={10}>
                            <Grid item>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt={'Highlights'}
                                            height="140"
                                            image={highlights}
                                            title={'Highlights'}
                                        />
                                    </CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" color={'secondary'} component="h2">
                                                {'Highlights'}
                                            </Typography>
                                            <Typography gutterBottom variant="h6" component="p">
                                                One man practicing sportsmanship is far better than 50 preaching it.
                                            </Typography>
                                        </CardContent>
                                    <CardActions>
                                        {/* <Link to='/news'>
                                        </Link> */}
                                        <Button size="small" component={Link} href='/news' color="primary">
                                        More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt={'Highlights'}
                                            height="140"
                                            image={news}
                                            title={'Highlights'}
                                        />
                                    </CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" color={'secondary'} component="h2">
                                                {'News'}
                                            </Typography>
                                            <Typography gutterBottom variant="h6" component="p">
                                            The difference between the impossible and the possible lies in a person's determination.
                                            </Typography>
                                        </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt={'Highlights'}
                                            height="140"
                                            image={grounds}
                                            title={'Highlights'}
                                        />
                                    </CardActionArea>
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" color={'secondary'} component="h2">
                                                {'Grounds'}
                                            </Typography>
                                            <Typography gutterBottom variant="h6" component="p">
                                            What makes something special is not just what you have to gain, but what you feel there is to lose. 
                                            </Typography>
                                        </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

ProductCategories.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);
