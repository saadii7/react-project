import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { fetchAllGrounds } from '../../actions/grounds';
import AddGround from './Add_Grounds';
import GroundList from './Gorunds_List';
import { Paper } from '@material-ui/core';
import ground from '../../assets/ground2.jpg';

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
    },
    background:{
        maxWidth:"100%",
        opacity:0.7,
        backgroundImage: `url(${ground})`
        
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

class GroundIndex extends Component {
    state = {
        open: false,
        add: true,
        list: true,
        expanded: null,
        team: {}
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

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false
        });
    };
    // componentDidMount() { 
    //     this.props.onFetchAllGrounds();
    // }
    render() {
        const { classes } = this.props;
        const { expanded } = this.state;
        if (this.props.auth.user.isAdmin === true) {
            return (
                <div className={classes.root}>
                    {/* <div className={classes.background}> */}
                        <GroundList />
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
                                    <Typography variant='h6' align="center" id='modal-title'>
                                        {this.state.add && <p>Add New Ground</p>}
                                        {this.state.add && <AddGround />}
                                    </Typography>
                                </div>
                            </Modal>
                        </div>
                    </div>
                // </div>
            )
        } else {
            return (
                <div className={classes.root}>
                    <GroundList />
                </div>
            )
        }

    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth,
        ground: state.ground
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchAllGrounds: () => {
            dispatch(fetchAllGrounds());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withRouter(GroundIndex)));
