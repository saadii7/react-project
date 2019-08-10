import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// import { Home, AccountCircle, ZoomOutTwoTone } from '@material-ui/icons';
import { MenuList, MenuItem } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import TeamIndex from '../Teams/Index';
import SportsIndex from '../Sports/Index';
import EventIndex from '../Old-Events/index';
import UsersList from '../Users/list';
// import Friends from '../Friend/Friends.js';
import FriendIndex from '../Friend/index';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: '100%'
        // justifyContent: 'space-around',
        // alignItems: 'flex-end',
    },
    icon: {
        margin: theme.spacing(2)
    },
    iconHover: {
        margin: theme.spacing(2),
        '&:hover': {
            color: red[800]
        }
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1
        }
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    }
});

const guestRoutes = [
    {
        link: '/teams/add',
        title: 'Add team',
        icon: 'toys',
        component: TeamIndex
    },
    {
        link: '/teams/profile',
        title: 'Profile',
        icon: 'toys',
        component: TeamIndex
    }
];

const adminRoutes = [
    {
        link: '/teams',
        title: 'Teams',
        icon: 'toll',
        component: TeamIndex
    },
    {
        link: '/sports',
        title: 'Sports',
        icon: 'videogame_asset',
        component: SportsIndex
    },
    {
        link: '/event',
        title: 'Events',
        icon: 'videogame_asset',
        component: EventIndex
    },
    {
        link: '/users',
        title: 'Users',
        icon: 'videogame_asset',
        component: UsersList
    }
];
const userRoutes = [
    {
        link: '/teams',
        title: 'Teams',
        icon: 'toll',
        component: TeamIndex
    },
    {
        link: '/events',
        title: 'Events',
        icon: 'videogame_asset',
        component: EventIndex
    },
    {
        link: '/friends',
        title: 'Find Friends',
        icon: 'videogame_asset',
        component: FriendIndex
    }
];
class ChatSidebar extends React.Component {
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
    componentWillReceiveProps = props => {
        this.setState({ open: props.open });
    };
    render() {
        const { classes } = this.props;
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
                        <ListItemIcon title={route.title}>
                            <Icon>{route.icon}</Icon>
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
                        <ListItemIcon title={route.title}>
                            <Icon>{route.icon}</Icon>
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
                <MenuItem button key={route}>
                    <ListItemIcon>
                        <Icon>{route.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={route.text} />
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
                </div>
                <Divider />

                <MenuList>{isAuthenticated ? authLinks : guestLinks}</MenuList>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(
    withStyles(styles, { withTheme: true })(withRouter(ChatSidebar  ))
);
