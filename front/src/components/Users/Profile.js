// Profile.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUser } from '../../actions/user';
import EditProfile from '../Users/edit';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import Avatar from '@material-ui/core/Avatar';
import { Divider, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Modal from '@material-ui/core/Modal';
const GREY = "#9E9E9E";
function getModalStyle() {
    const top = 10;
    const left = 30;

    return {
        top: `${top}%`,
        margin: 'auto',
        left: `${left}%`,
        // transform: `translate(-${top}%, -${left}%)`
    };
}

const styles = theme => ({
    root: {
        width: '100%'
    },
    typography: {
        variant: 'h4',
        top: '100px',
        // align:'center',
        left: '430px',
        position: 'absolute',
        // margin: '50px',
        fontSize: '2rem',
        fontFamily: "Helvetica Neue",
    },
    cover: {
        width: "1220px",
        height: '350px',
        borderRadius: '25px',
        boxShadow: `1px 1px 3px 1px ${GREY}`,
    },
    profile: {

        top: '350px',
        left: '580px',
        // justify:'center',
        width: "150px",
        height: '150px',
        // borderRadius: '25px',
        boxShadow: `1px 1px 3px 1px ${GREY}`,
        position: 'absolute',
        display: 'block',
        margin: 10,
        // width: 60,
        // height: 60,
    },
    paper: {
        top: '550px',
        width: "1220px",
        height: '350px',
        borderRadius: '5px',
        boxShadow: `1px 1px 3px 1px ${GREY}`,
        position: 'absolute',
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 950,
        right: 0,
        margin: '0 auto',
    },
    papper: {
        position: 'absolute',
        width: theme.spacing(50),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        overflow: 'scroll',
        padding: theme.spacing(4),
        outline: 'none',
        overflow: 'scroll',
    },
});

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            add: true,
            expanded: null,
            user: props.user,
            id: {}
        }
    }
    openModal = () => {
        this.setState({ open: true });
    };
    // editModal = sport => {
    //     this.setState({ open: true, add: false, sport });
    // };
    closeModal = () => {
        this.setState({ open: false });
    };
    componentWillReceiveProps = (nextprops) => {
        this.setState({
            user: nextprops.user._id,
            id: nextprops.id
        })
        console.log("Key---Props--->", nextprops.user)
    }
    componentDidMount() {
        // this.setState({
        //     user: this.props.auth.user
        //     }),
        console.log("Key---Props--state---->", this.state)
        this.props.onGetUser(this.props.auth.user.id)
    };
    render() {
        const { classes } = this.props;
        // const teamList = this.props.user.team
        // .map((tea) =>
        // <li key={tea.team}>{tea.team}</li> 
        // );
        return (
            <Card>
                <CardImg className={classes.cover} src={this.props.user.avatar} fluid />
                <Avatar className={classes.profile} src={this.props.user.avatar} alt={this.props.user.name} title={this.props.user.name} />
                <CardBody align='center'>
                    {/* <Divider width="900px" /> */}
                    {/* <CardTitle>{teamList}</CardTitle> */}
                    <Paper className={classes.paper}>
                        <Fab color="secondary" aria-label="Edit" className={classes.fabButton} onClick={this.openModal} >
                            <Icon>edit_icon</Icon>
                        </Fab>
                        <div className={classes.typography} align='center'>
                            <Typography variant="h5">
                                ID:{this.props.user._id}
                            </Typography>
                            <Divider width="300px" />
                            <Typography variant="h5">
                                Name:{this.props.user.name}
                            </Typography>
                            <Typography variant="h5">
                                Userame:{this.props.user.userName}
                            </Typography>
                            <Divider width="300px" />
                            <Typography variant="h5">
                                Email:{this.props.user.email}
                            </Typography>
                        </div>
                        <div className={classes.root}>
                            <Modal
                                aria-labelledby='simple-modal-title'
                                aria-describedby='simple-modal-description'
                                style={{ alignItems: 'center', justifyContent: 'center' }}
                                // className={classes.modalStyle1}
                                open={this.state.open}
                                onClose={this.closeModal}
                                center='true'>
                                <div style={getModalStyle()} className={classes.papper}>
                                    <Typography variant='h6' id='modal-title'>
                                        {this.state.add && <EditProfile />}
                                    </Typography>
                                </div>
                            </Modal>
                        </div>

                    </Paper>
                </CardBody>
            </Card>
        );
    }
}
Profile.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withRouter(Profile)));
// export default connect(mapStateToProps, mapDispatchToProps)(Profile);