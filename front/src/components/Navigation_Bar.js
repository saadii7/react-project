// Register.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const styles = theme => ({
    bottom_Navigation:{
        borderRadius: '5px',
        width: "100%",
        backgroundColor: "#181C1F",
        boxShadow: theme.shadows[5],
        outline: '20px',
        justifyContent: "space-between",
        marginTop:theme.spacing(10),
        // overflow: 'scroll',
    },
    root: {
        color: "#FB8122",
        '&$selected': {
          color: '#ffffff',
        },
      },
      /* Styles applied to the root element if selected. */
      selected: {}
});

class NavigationBar extends Component {

    constructor(props) {
        super();
        this.state = {
        }
        console.log("-------NavigationBar------",props)

    }

    // inputChange = (e) => {
    //     this.setState({
    //         user: {
    //             ...this.state.user,
    //             [e.target.name]: e.target.value
    //         }
    //     });
    // }

    

    // componentDidMount() {
    // }
    componentWillReceiveProps = (props) => {
        console.log("-------NavigationBar------",props)
    }
    render() {
        const { classes } = this.props;
        const actionClasses = this.props.classes;
        return (
            <BottomNavigation
            value={this.state.value}
            onChange={(e, newValue) => this.setState({
                value: newValue
            })}
            showLabels
            className={classes.bottom_Navigation}
            >
            {/* {Team_Button} */}
            {/* <i class="fas fa-users"></i> */}
            <BottomNavigationAction label="select team" classes={actionClasses}  icon={<RestoreIcon />}/>
            <BottomNavigationAction label="Favorites" classes={actionClasses} icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" classes={actionClasses} icon={<LocationOnIcon />} />
            </BottomNavigation>
            
        )
    }
}



const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors,
        user: state.user
    };
};
// const mapDispatchToProps = dispatch => {
//     return {
       
//         }

//     };
// };
export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(withRouter(NavigationBar)));

