import React, { Component } from 'react';
// import SearchIcon from '@material-ui/icons/Search';
// import InputBase from '@material-ui/core/InputBase';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { fetchEventById, fetchAllEvents } from '../../actions/event';
import { Card, Typography, Grid, Paper } from '@material-ui/core';
import trophy from '../../assets/trophy.png';

const styles = theme => ({
    title: {
        fontFamily: "Helvetica",
        fontWeight: 500,
        fontSize: "5rem",
        lineHeight: 1,
        letterSpacing: 20,
        minHeight: 64,
        flexGrow: 1,
        textAlign: "center"
    },
    team_title: {
        fontFamily: "Helvetica",
        fontWeight: 500,
        fontSize: "3rem",
        lineHeight: 1,
        letterSpacing: 20,
        minHeight: 64,
        flexGrow: 1,
        textAlign: "center"
    },
    title_two: {
        fontFamily: "Helvetica",
        fontWeight: 500,
        fontSize: "1rem",
        lineHeight: 1,
        letterSpacing: 5,
        minHeight: 64,
        flexGrow: 1,
        textAlign: "center"
    },
    mapStyles: {
        width: '100%',
        height: '40%',
        align:'center'
    },
});
const mapStyles = {
    width: '90%',
    height: '50%',
    margin:50,
    align: "center"
};
class MapContainer extends Component {
    state = {
        event: [],
        host: []
    };
    componentDidMount() {
        // this.props.onGetEvents(this.props.auth.user.id);
        this.props.onFetchEventById(this.props.match.params.id)
        this.setState({
            event: this.props.singleEvent
        })
        // console.log('FUll Event Props-----1----->', this.props.singleEvent.Sport.sportName)
    }
    // componentDidUpdate(props){
    //     console.log('FUll Event componentWillUpdate---------->',props)
    // }

    // listView() {
    //     console.log('FUll Event Props-----3---->',this.props.singleEvent)
    //     {
    //             return (

    //             )
    //         }
    //         )
    //     }
    // };
    hostData = () => {
        for (let i = 0; i < 10; i++) {
            this.state.host = this.state.event &&
                this.state.event.hostTeam &&
                this.state.event.hostTeam.Users[i]
        }


        return (console.log('FUll Event Props-----3---->', this.state.host));
    }
    render() {
        const { classes } = this.props;
        let event = this.props.singleEvent;
        let lat=this.props.singleEvent.lat;
        let lng =this.props.singleEvent.lng;
        const maker = event && event.Maker ? event.Maker.name : null;
        const sport = event && event.Sport ? event.Sport.sportName : null;
        const opponent = event && event.opponentTeam ? event.opponentTeam.Users : null;
        let current_datetime = new Date(event.date)
        let formatted_date = current_datetime.toLocaleString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })        
        // &&
        // props.user.posts[0].comments &&
        // props.user.posts[0].comments[0]
        // const host = ((event || {}).hostTeam || {}).Users;
        const getNestedObject = (nestedObj, pathArr) => {
            return pathArr.reduce((obj, key) =>
                (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
        }
        // const host = getNestedObject(event, ['hostTeam', 'Users']);
        const i = 0

        const hostTeamName = getNestedObject(event, ['hostTeam', 'name']);
        // const host = getNestedObject(event, ['hostTeam','Users',0, 'name']);
        const opponentTeamName = getNestedObject(event, ['opponentTeam', 'name']);
        { this.hostData() }
        // }    
        // let host;
        // if (
        //     event && event.hostTeam && event.hostTeam.Users
        //     // data.user.personalInfo.addressDetails &&
        //     // data.user.personalInfo.addressDetails.primaryAddress
        // ) {
        //     host = event.hostTeam.Users
        // }
        console.log('FUll Event State--------->',this.props.singleEvent.lat)
        return (
            <div>
                {/*  <Paper> */}

                    <Grid>
                        <Grid item>
                            <Typography className={classes.title}><img src={trophy} />{event.eventName}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.team_title}>{sport}</Typography>
                        </Grid>
                        <Grid item xs container direction="row" justify="space-around" alignItems="center">
                            <Grid item xs>
                                <Typography className={classes.team_title}>{hostTeamName}</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography className={classes.team_title}>Vs</Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography className={classes.team_title}>{opponentTeamName}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.title_two}>{formatted_date}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.title_two}>{event.location}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.title_two}>{event.durations}Hours</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.title_two}>{event.description}</Typography>
                        </Grid>
                        <br/>
                        <Grid item className={classes.mapStyles}>
                            <Map
                                google={this.props.google}
                                zoom={8}
                                style={mapStyles}
                                initialCenter={{ lat: 31.5204, lng: 74.3587}}
                            >
                                <Marker position={{ lat: event.lat, lng: event.lng }} />
                            </Map>
                        </Grid>
                        <br/>
                    </Grid>
                {/* </Paper> */}
            </div>
            // setTimeout(() => {
            //     console.log('FUll Event Props-----2---->', this.props.singleEvent)
            //     {this.listView()}
            // }, 3000)
        )
    }
}
const mapStateToProps = state => {
    return {
        users: state.users,
        sports: state.sports,
        singleEvent: state.singleEvent,
        event: state.event,
        auth: state.auth,
        teams: state.teams,
        players: state.players
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchEventById: (id) => {
            dispatch(fetchEventById(id))
        },
        onGetEvents: (id) => {
            dispatch(fetchAllEvents([id], ['maker']));
        },

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({ apiKey: "AIzaSyBlanyt2HeAPzuLBDiSRRk7aSQFDxXqHmU" })(withStyles(styles, { withTheme: true })(withRouter(MapContainer))));
