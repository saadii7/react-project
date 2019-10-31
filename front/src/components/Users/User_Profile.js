// Profile.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUser } from '../../actions/user';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Profile from './Profile';
import EventList from '../Events/listing';
import Teams from '../Teams/Team-List';

const a11yProps = (index) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
};
const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
};
const styles = theme => ({
    // root: {
    //     // flexGrow: 1,
    //     justify: 'center'
    // },
    appBar: {
        backgroundColor: '#181C1F',
        position: '-webkit-sticky',
        position: 'sticky',
        marginLeft: 2,
        width: (window.screen.width - 85),
        marginTop: 5,
    },
    sticky: {
        position: '-webkit-sticky',
        position: 'sticky',
    },

});

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            add: true,
            expanded: null,
            user: props.user,
            id: {},
            value: 0,
        }
    }   
    openModal = () => {
        this.setState({ open: true });
    };

    closeModal = () => {
        this.setState({ open: false });
    };
   
    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    };
    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { classes } = this.props;

        return (
            <Grid>
                <div className={classes.sticky}>
                    <AppBar className={classes.appBar}>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            textColor={'inherit'}
                            TabTextProps={{ style: { background: '#FB8122' } }}
                            TabIndicatorProps={{ style: { background: '#FB8122' } }}
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Profile" {...a11yProps(0)} />
                            <Tab label="Events" {...a11yProps(1)} />
                            <Tab label="Teams" {...a11yProps(2)} />
                        </Tabs>

                    </AppBar>
                    </div>
                <Grid item direction="column" alignItems="center" justify="center">
                    <TabPanel value={this.state.value} index={0}>
                        <Profile />
                    </TabPanel>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <TabPanel value={this.state.value} index={1}>
                            <EventList />
                        </TabPanel>
                    </Grid>
                    <TabPanel value={this.state.value} index={2}>
                        <Teams />
                    </TabPanel>
                </Grid>
            </Grid>

        );
    }
}
UserProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        user: state.user
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onGetUser: id => {
            dispatch(getUser(id));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withRouter(UserProfile)));
// export default connect(mapStateToProps, mapDispatchToProps)(Profile);