import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllSports } from '../../actions/sports';


const TabContainer = (props) => {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class TabList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }
    componentDidMount() {
        this.props.onFetchAllSports();
    }
    handleChange = (event, newValue) => {
        this.setState({value: newValue})
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                        >
                        {this.props.sports.map((sport) =>
                            <Tab key={sport._id} label={sport.sportName} icon={<FavoriteIcon />} />
                        )}
                    </Tabs>
                </AppBar>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        sports: state.sports,
        users: state.users,
        auth: state.auth
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchAllSports: () => {
            dispatch(fetchAllSports());
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withRouter(TabList)));

