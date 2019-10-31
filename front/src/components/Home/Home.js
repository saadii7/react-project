import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import EventListing from './listing';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Modal from '@material-ui/core/Modal';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import AddEvent from '../Events/Add-Events';
import { fetchAllEvents } from '../../actions/event';
import Listing from '../Events/listing';
import Facebook from '../News/news';
import UserProfile from '../Events/user_bio';
// import SwipeableTextMobileStepper from '../News/Slider';
// import Headlines from './Headlines';
import { Jumbotron, Container } from 'reactstrap';
// import './Home_Card.css';
import ProductValues from './Product_Values';
import Footer from './Footer';
import Trending from './Features';
import pic from '../../assets/poster.jpg';
import ProductCategories from './News_Cards';


const styles = theme => ({
    button: {
        float: "right", marginRight: 20, marginTop: 0, backgroundColor: '#181C1F',
        '&:hover': {
            backgroundColor: ("#FB8122"),
        },
    },
    card: {
        marginBottom: theme.spacing(2),
    },


    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),

    },
    fab: {
        margin: 0,
        top: 'auto',
        float: "right",
        position: 'left',
        backgroundColor: '#181C1F',
        '&:hover': {
            backgroundColor: ("#FB8122"),
        },
    },
    color: {
        color: "white",
    },
    avatar: {
        // backgroundColor: red[500],
        backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 50%,rgb(233,64,87) 90%)',
    },
    bio_avatar: {
        height: 100,
        width: 100
    },

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        // flexGrow: 1,
        overflow: 'auto',
        width: '70%', /* Width in proportion to its parent container*/
        maxWidth: '640px', /* Max width where it stops expanding */
        height: '70%', /* Height in proportion to its parent container */
        margin: 'auto', /* Auto margin according to the element width */
        padding: '10px',
        // maxHeight: '500',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        borderRadius: '10px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    Button: {
        backgroundColor: "#FB8122"
    },
    sticky: {
        background: 'white',
        position: '-webkit-sticky',
        position: 'sticky',
        top: 20,
        bottom: 20,
        paddingTop: '40px',
        paddingBottom: '40px',
        zIndex: 5,
    },
    space: {
        marginBottom: 20
    },
    aligntext: {
        alignItems: 'center',
        justifyContent: 'center',
    },


});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            open: false,
            add: true,
            event: {}
        };

    }
    openModal = () => {
        this.setState({ open: true });
    };
    editModal = event => {
        this.setState({ open: true, add: false, event });
    };
    closeModal = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        this.props.onGetEvents();
    }

    render() {
        const { classes } = this.props;
        const { isAuthenticated } = this.props.auth;
        const authLinks = (
            <Grid container direction='row' className={classes.root} spacing={6}>
                <Grid item>
                    <UserProfile id={this.props.auth.user.id} user={this.props.auth.user}/>
                </Grid>
                <Grid item direction="column" md={6}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Avatar aria-label="Add" className={classes.avatar} />
                            <Typography variant="h5" color="textSecondary" component="h2">
                                Create new event
                                     <Button className={classes.button} onClick={this.openModal} variant={"contained"}>
                                    <Icon className={classes.color}>add_circle</Icon>
                                </Button>
                            </Typography>
                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                    <Listing />
                </Grid>
                <Grid item direction="column" md={3}>
                    <Trending />
                </Grid>
            </Grid>
        );
        const guestLinks = (
            <React.Fragment>
                <div>
                    <img src={pic} width='100%' height='400' />
                </div>
                <ProductCategories />
                <ProductValues />
                {/* <Headlines/> */}
                <Footer />
            </React.Fragment>
            // <Facebook />
        );
        return (

            <div>
                {isAuthenticated ? authLinks : guestLinks}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.open}
                    onClose={this.closeModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.open}>
                        <div className={classes.paper}>
                            <Typography variant='h6' id='modal-title'>
                                {this.state.add && <p> Create Event</p>}
                                {this.state.add && <AddEvent />}
                            </Typography>
                        </div>
                    </Fade>
                </Modal>
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
        onGetEvents: () => {
            dispatch(fetchAllEvents('', []))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(withRouter(Home)));
