import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// import { Home, AccountCircle, ZoomOutTwoTone } from '@material-ui/icons';
import { MenuList, MenuItem, IconButton } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import TeamIndex from '../Teams/Index';
import SportsIndex from '../Sports/Index';
import EventIndex from '../Old-Events/index';
import UsersList from '../Users/list';
// import Friends from '../Friend/Friends.js';
import FriendIndex from '../Friend/index';
import Facebook from '../News/news';
import GroundIndex from '../Grounds/Index';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';


export const TeamIcon = () => (
    <div>
        Team Icon: <i className="fal fa-users-crown"></i>
    </div>
)

const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: '100%',
        color: "disable"
    },
    icon: {
        margin: theme.spacing(2),
        color: '#FB8122'
    },
    iconHover: {
        '&:hover': {
            color: "#ffffff",
        },
        color: "#FB8122",
    },
    drawer: {

        // paddingTop:56,
        // backgroundColor:'#FB8122',
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap'
    },
    drawerOpen: {
        backgroundColor: '#181C1F',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        backgroundColor: '#181C1F',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(8) + 1
        }
    },
    toolbar: {
        // toolbar: theme.mixins.toolbar,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 75,
        ...theme.mixins.toolbar
    },
    root: {
        color: "#FB8122",
        '&$selected': {
            color: '#ffffff',
        },
        '&:hover': {
            color: "#ffffff",
        },
    },
    selected: {},
});

const guestRoutes = [
    {
        link: '/news',
        title: 'Match Highlights',
        icon: "fab fa-youtube",
        component: Facebook,

    },
    {
        link: '/teams/profile',
        title: 'Profile',
        icon: "fas fa-newspaper",
        component: TeamIndex
    }
];

const adminRoutes = [
    {
        link: '/teams',
        title: 'Teams',
        icon: "fas fa-users",
        component: TeamIndex
    },
    {
        link: '/sports',
        title: 'Sports',
        icon: "fas fa-volleyball-ball",
        component: SportsIndex
    },
    {
        link: '/friends',
        title: 'Find Friends',
        icon: "fas fa-user-friends",
        component: FriendIndex
    },
    {
        link: '/events',
        title: 'Events',
        icon: "far fa-calendar-alt",
        component: EventIndex,
    },
    {
        link: '/users',
        title: 'Users',
        icon: "fas fa-users",
        component: UsersList
    },
    {
        link: '/news',
        title: 'Match Highlights',
        icon: "fab fa-youtube",
        component: Facebook,

    },
    {
        link: '/grounds',
        title: 'Play Grounds',
        icon: "fas fa-map-marked-alt",
        component: GroundIndex,
    },
];
const userRoutes = [
    {
        link: '/teams',
        title: 'Teams',
        icon: "fas fa-users",
        component: TeamIndex
    },
    // {
    //     link: '/sports',
    //     title: 'Sports',
    //     icon: "fas fa-volleyball-ball",
    //     component: SportsIndex
    // },
    {
        link: '/friends',
        title: 'Find Friends',
        icon: "fas fa-user-friends",
        component: FriendIndex
    },
    {
        link: '/events',
        title: 'Events',
        icon: "far fa-calendar-alt",
        component: EventIndex,
    },
    // {
    //     link: '/users',
    //     title: 'Users',
    //     icon: "fas fa-users",
    //     component: UsersList
    // },
    {
        link: '/news',
        title: 'Match Highlights',
        icon: "fab fa-youtube",
        component: Facebook,

    },
    {
        link: '/grounds',
        title: 'Play Grounds',
        icon: "fas fa-map-marked-alt",
        component: GroundIndex,
    },

];
class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        // this.activeRoute = this.activeRoute.bind(this);
    }

    activeRoute = routeName => {
        return this.props.location.pathname.indexOf(routeName) > -1
            ? true
            : false;
    };
    componentDidMount() {
        this.setState({ open: this.props.open });
    }
    UNSAFE_componentWillReceiveProps = props => {
        this.setState({ open: props.open });
    };
    render() {
        const { classes } = this.props;
        const actionClasses = this.props.classes;
        const { isAuthenticated, user } = this.props.auth;
        let { isAdmin } = user;
        let authLinks = null;
        if (isAdmin) {
            authLinks = adminRoutes.map((route, index) => (
                <Link
                    className={classes.root}
                    to={route.link}
                    style={{ textDecoration: 'none' }}
                    key={index}>
                    <MenuItem button key={route}>
                        <ListItemIcon title={route.title} classes={actionClasses}>
                        <i className={route.icon}/>                            
                        </ListItemIcon>
                        <ListItemText primary={route.title} />
                    </MenuItem>
                </Link>
            ));
        } else {
            authLinks = userRoutes.map((route, index) => (
                <Link
                    className={classes.root}
                    to={route.link}
                    style={{ textDecoration: 'none' }}
                    key={index}>
                    <MenuItem button key={index}>
                        <ListItemIcon title={route.title} classes={actionClasses}>
                        <i className={route.icon}/>
                        </ListItemIcon>
                        <ListItemText primary={route.title} />
                    </MenuItem>
                </Link>
            ));
        }
        const guestLinks = guestRoutes.map((route, index) => (
            <Link
                className={classes.root}
                to={route.link}
                style={{ textDecoration: 'none' }}
                key={index}>
                <MenuItem button key={index}>
                    <ListItemIcon title={route.title} classes={actionClasses}>
                        <i className={route.icon}/>
                    </ListItemIcon>
                    <ListItemText primary={route.title} />
                </MenuItem>
            </Link>
        ));
        return (
            <Drawer
                variant='permanent'
                className={classNames(classes.drawer, {
                    [classes.drawerOpen]: this.state.open,
                    [classes.drawerClose]: !this.state.open
                })}
                classes={{
                    paper: classNames({
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open
                    })
                }}
                open={this.state.open}>
                <div className={classes.toolbar}>
                    {/* type something here */}
                    {/* <Typography>Bash</Typography> */}
                </div>
                <Divider />

                <MenuList>{isAuthenticated ? authLinks : guestLinks}</MenuList>
                <Divider />
            </Drawer>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(
    withStyles(styles, { withTheme: true })(withRouter(Sidebar))
);
