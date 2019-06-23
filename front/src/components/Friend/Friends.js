import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

import { fetchAllUsers, deleteUser } from '../../actions/user';
import { createFriendRequest } from '../../actions/friend';
import FriendButton from './Friend-Button';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    tableRoot: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    table: {
        minWidth: 440,
    },
    toolbar: theme.mixins.toolbar,
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none'
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60
    },
    card: {
        maxWidth: 385
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
});
class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            spacing: '24'
        };
        this.editModal = props.editModal;
        this.closeModal = props.closeModal;
    }
    editModal = e => { };
    closeModal = e => { };

    deleteUser(e, index) {
        e.preventDefault();
        this.props.onDelete(index);
    }
    componentDidMount() {
        // this.props.onGetUsers();
        store.dispatch(fetchAllUsers());
        this.setState({
            users: this.props.users,
            authId: this.props.auth.user._id
        });
        console.log('------state users----->' + this.state.users);
        console.log('------ user ID----->' + this.props.auth.user.id);
    }
    refreshPage = () => {
        window.location.reload();
    };

    // renderUser=(user)=>{
    //     const {search}=this.state.search;
    //     var code = user.code.toLowerCase()
    //     if(search !== "" && user.name.indexOf(search)=== -1 ){
    //         return null
    //     }
    // }
    onSubmit = e => {
        e.preventDefault();
        console.log('chalo' + e);
    };

    listView(data, index) {
        const { classes } = this.props;
        return (
            <div key={index}>
                {console.log('$$$$' + data.userName)}
                <div>
                    <Paper className={classes.tableRoot}>
                        <Table className={classes.table}>
                            <TableHead>
                                <Avatar
                                    alt='Remy Sharp'
                                    src={data.avatar}
                                    className={classes.bigAvatar}
                                />{' '}
                            </TableHead>
                            <TableBody>
                                <TableRow key={index}>
                                    <TableCell component='th' scope='row'>

                                    </TableCell>
                                    <TableCell component='th' scope='row'>
                                        {data.userName}
                                    </TableCell>
                                    <TableCell align='right'>
                                        <FriendButton id={data._id} />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </div>
        );
    }
    render() {
        // const { classes } = this.props;

        return (
            <div>
                {this.props.users.map((user, i) => this.listView(user, i))}
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
        onDelete: id => {
            dispatch(deleteUser(id));
        },
        onRequest: id => {
            dispatch(createFriendRequest(id));
        }
    };
};

const SimpleModalWrapped = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(withRouter(Friends)));
export default SimpleModalWrapped;
