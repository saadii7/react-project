import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import CreateTeam from './Create-Team';
import TeamList from './Team-List';
import Teams from '../Teams/Team-List';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';



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

function getModalStyle() {
    const top = 10;
    const left = 15;

    return {
        top: `${top}%`,
        margin: 'auto',
        left: `${left}%`,
        // transform: `translate(-${top}%, -${left}%)`
    };
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),

        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(23),
        flexBasis: '33.33%',
        flexShrink: 0
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    },
    fab: {
        margin: 0,
        top: 'auto',
        left: 1250,
        bottom: 20,
        right: 'auto',
        position: 'fixed',
        backgroundColor: '#181C1F',
        '&:hover': {
            backgroundColor: ("#FB8122"),
        },
    },
    color: {
        color: "white",
        // '&:hover': {
        //     color: ("#181C1F"),
        // },
    },
    appBar: {
        backgroundColor: '#181C1F',
        position: '-webkit-sticky',
        position: 'sticky',
        marginLeft: 2,
        width: (window.screen.width - 85),
        marginTop: 5,
    },
    paper: {
        maxWidth: 500,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
    },
    modal: {
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        display: 'flex',
        flexWrap: 'wrap'
    }
});

class TeamIndex extends Component {
    state = {
        open: false,
        add: true,
        list: true,
        expanded: null,
        team: {},
        value:0
    };
    openModal = () => {
        this.setState({ open: true });
    };
    editModal = sport => {
        this.setState({ open: true, add: false, sport });
    };
    closeModal = () => {
        this.setState({ open: false });
    };
    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false
        });
    };
    tabChangeHandler = (event, newValue) => {
        this.setState({ value: newValue });
    };
    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    componentDidMount() { }
    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        return (
            <div >
                <AppBar className={classes.appBar}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.tabChangeHandler}
                        textColor={'inherit'}
                        TabTextProps={{ style: { background: '#FB8122' } }}
                        TabIndicatorProps={{ style: { background: '#FB8122' } }}
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="My Teams" {...a11yProps(0)} />
                        <Tab label="All Teams" {...a11yProps(1)} />
                    </Tabs>

                </AppBar>
                <Grid item direction="column" alignItems="center" justify="center">
                    <TabPanel value={this.state.value} index={0}>
                        <TeamList />
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        <Teams/>
                    </TabPanel>
                </Grid>
                <div>
                    <div>
                        <Tooltip title='Add' aria-label='Add'>
                            <Fab
                                color='primary'
                                onClick={this.openModal}
                                className={classes.fab}>
                                <AddIcon className={classes.color} />
                            </Fab>
                        </Tooltip>
                    </div>
                    <Modal
                        aria-labelledby='simple-modal-title'
                        aria-describedby='simple-modal-description'
                        open={this.state.open}
                        onClose={this.closeModal}
                        center='true'>
                        <div style={getModalStyle()} className={classes.paper}>
                            <Typography variant='h6' id='modal-title'>
                                {this.state.add && <p>Add New Team</p>}
                                {this.state.add && <CreateTeam />}
                            </Typography>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(TeamIndex);
