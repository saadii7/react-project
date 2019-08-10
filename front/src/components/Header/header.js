import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';
import { withRouter, Link } from 'react-router-dom';
import store from '../../store';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import socket from '../../socket';
import Notifications from '../Header/notifications';
import { checkNotifications, CheckSocketNotifications, deleteNotificationSuccess } from '../../actions/notifications';
import { fetchAllUsers } from '../../actions/user';
import Profile from '../Users/Profile';
import notifications from '../Header/notifications';


const drawerWidth = 240;
const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto'
        }
    },
    searchIcon: {
        width: theme.spacing(9),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        paddingTop: theme.spacing(),
        paddingRight: theme.spacing(),
        paddingBottom: theme.spacing(),
        paddingLeft: theme.spacing(10),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200
        }
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex'
        }
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60
    },
    button: {
        marginRight: theme.spacing(3)
    },
    root: {
        position: 'relative'
    },
    paper: {
        position: 'absolute',
        top: 36,
        right: 0,
        left: 0
    },
});

class Navbar extends React.Component {
    state = {
        notifications: [],
        anchorEl: null,
        NotificationMenuAnchorEl: null,
        mobileMoreAnchorEl: null,
        open: false,
        search: '',
        filterUsersList: {}
    };

    handleClick = () => {
        this.setState(state => ({
            open: !state.open
        }));
    };

    handleClickAway = () => {
        this.setState({
            open: false
        });
    };
    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };
    handleNotificationMenuOpen = event => {
        this.setState({ NotificationMenuAnchorEl: event.currentTarget });
    };
    handleNotificationMenuClose = event => {
        this.setState({ NotificationMenuAnchorEl: null });
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    onLogout = e => {
        e.preventDefault();
        this.props.onLogoutUser(this.props.history);
    };

    onChange = e => {
        this.setState({ search: e.target.value });
    };
    clickDrawer = () => {
        if (this.state.open) {
            this.props.handleDrawerClose();
        } else {
            this.props.handleDrawerOpen();
        }
    };
    // handlerFunc = (dispatch) => (order) => {
    //     store.dispatch(deleteNotificationSuccess(order));
    //   }
    componentDidMount() {
        let notifications = this.props.notifications;
        console.log('notifications' + notifications);
        console.log('Listening to notifications_for_' + this.props.auth.user.id);
        store.dispatch(checkNotifications([this.props.auth.user.id], ['to']));
        store.dispatch(fetchAllUsers());
        // console.log('------------0-0-0-0---noti-----', this.props.notifications)
        socket.on('notifications_for_' + this.props.auth.user.id, (data) => {
            console.log('data-------notification------added', data)
            switch (data.action) {
                case 'new':
                    for (let j = 0; j < this.props.users.length; j++) {
                        if (this.props.users[j]._id === data.data.from) {
                            data.data.user = this.props.users[j];
                            // let notifications = this.props.notifications;
                            // notifications.push(data.data);
                            this.props.onCheckSocketNotifications(data.data);
                            // this.setState({ notifications: notifications })
                            console.log('------------0-0-0-0--------', data.data)

                            //set store notification to this array "notifications"
                            break;
                        }
                    }
                    break;
                case 'delete':
                        this.props.onDeleteNotificationSuccess(data.data);
                        window.location.reload();
                    break;

                default:
                    break;
            }
        });
        this.setState({ open: this.props.open });
    }

    componentWillReceiveProps = props => {
        this.setState({
            open: props.open,
            [this.state.notifications]: props.notifications
        });
        this.userFilter(props)
        console.log('--------351531531->', props)
    };

    userFilter = (props) => {
        // console.log('Header----State-----Notifications-----Data>', this.state.notifications)
        // console.log('chalo User Filter-------->', props.users, 'AND', props.notifications)
        let users = props.users
        let notifications = props.notifications;
        for (let i = 0; i < notifications.length; i++) {
            for (let j = 0; j < users.length; j++) {
                // console.log(users[j]._id, 'chalo fi-------->', notifications)
                if (users[j]._id === notifications[i].from) {
                    notifications[i].user = users[j];
                    // console.log('chalo User--101010110------>', notifications[i].user)
                    break;
                }
            }
        }
        this.setState({ notifications: notifications })
    }
    render() {
        const { isAuthenticated } = this.props.auth;
        const { anchorEl, mobileMoreAnchorEl, NotificationMenuAnchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
        const isRenderNotificationMenuOpen = Boolean(NotificationMenuAnchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}>
                <MenuItem
                    component={Link}
                    to='/profile'
                    onClick={this.handleMenuClose}>
                    Profile
                </MenuItem>
                <MenuItem
                    component={Link}
                    to={'/user/' + this.props.auth.user.id + '/edit'}
                    onClick={this.handleMenuClose}>
                    Update Profile
                </MenuItem>
                <MenuItem component={Link}
                    to={'/users/' + this.props.auth.user.id + '/friends'}
                    onClick={this.handleMenuClose}>
                    Friends
                </MenuItem>
                <MenuItem
                    component={Link}
                    to='/logout'
                    onClick={this.onLogout.bind(this)}>
                    Logout
                </MenuItem>
            </Menu>
        );
        const renderNotificationMenu = (
            <Menu
                anchorEl={NotificationMenuAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isRenderNotificationMenuOpen}
                onClose={this.handleNotificationMenuClose}>
                <MenuItem onClick={this.handleMenuClose} >
                    <Notifications notifications={this.state.notifications} user={this.props.auth.user} />
                </MenuItem>
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMenuClose}>
                <MenuItem onClick={this.handleMobileMenuClose}>
                    <IconButton color='inherit'>
                        <Badge badgeContent={4} color='secondary'>
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
                <MenuItem onClick={this.handleMobileMenuClose}>
                    <IconButton
                        aria-owns={isRenderNotificationMenuOpen ? 'material-appbar' : undefined}
                        aria-haspopup='true'
                        color='inherit'
                        onClick={this.handleNotificationMenuOpen}
                    >
                        <Badge badgeContent={17} color='secondary'>
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </MenuItem>
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color='inherit'>
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );
        const authLinks = (
            <React.Fragment>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    <IconButton color='inherit'>
                        <Badge badgeContent={4} color='secondary'>
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <IconButton
                        aria-owns={isRenderNotificationMenuOpen ? 'material-appbar' : undefined}
                        aria-haspopup='true'
                        color='inherit'
                        onClick={this.handleNotificationMenuOpen}
                    >
                        <Badge badgeContent={this.state.notifications.length} color='secondary'>
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton
                        aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                        aria-haspopup='true'
                        onClick={this.handleProfileMenuOpen}
                        color='inherit'>
                        <AccountCircle />
                    </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton
                        aria-haspopup='true'
                        onClick={this.handleMobileMenuOpen}
                        color='inherit'>
                        <MoreIcon />
                    </IconButton>
                </div>
                {renderMenu}
                {renderMobileMenu}
                {renderNotificationMenu}
            </React.Fragment>
        );
        const guestLinks = (
            <React.Fragment>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    <Button
                        className={classes.button}
                        component={Link}
                        to='/register'
                        variant='contained'
                        color='primary'>
                        {' '}
                        Signup{' '}
                    </Button>
                    <Button
                        className={classes.button}
                        component={Link}
                        to='/login'
                        variant='contained'
                        color='primary'>
                        {' '}
                        Login{' '}
                    </Button>
                </div>
            </React.Fragment>
        );
        return (
            <div>
                <AppBar
                    position='fixed'
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open
                    })}>
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                            color='inherit'
                            aria-label='Open drawer'
                            onClick={this.clickDrawer}
                            className={classNames(classes.menuButton, {
                                [classes.hide]: this.state.open
                            })}>
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component={Link}
                            to='/'
                            className={classes.title}
                            variant='h6'
                            color='inherit'
                            noWrap>
                            Game On
                        </Typography>
                        {/* <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                onChange={this.onChange}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div> */}
                        {isAuthenticated ? authLinks : guestLinks}

                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
    // logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    notifications: state.notifications,
    users: state.users
});
const mapDispatchToProps = dispatch => {
    return {
        onCheckSocketNotifications: (notification) => {
            dispatch(CheckSocketNotifications(notification));
        },
        onDeleteNotificationSuccess: (notification) => {
            dispatch(deleteNotificationSuccess(notification));
        },
        onCheckNotifications: (id) => {
            dispatch(checkNotifications([id], ['to']));
        },
        onLogoutUser: id => {
            dispatch(logoutUser(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withRouter(Navbar)));