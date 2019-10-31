import { ADD_EVENT, FETCH_ALL_EVENTS, DELETE_EVENT, CHECK_TEAM_PLAYERS,FETCH_EVENT_BY_ID,ADD_PLAYERS_AT_EVENT} from '../actions/types';
import axios from 'axios';



export const addPlayers = (id,players) => {
    return dispatch => {
        console.log('------->',id,'------->', players)
        return axios
            .post(`/events/${id}/manage-team`,players)
            .then(response => {
                dispatch(addPlayersSuccess(response.data));
                console.log(response.data);
            })
            .catch(error => {
                throw error;
            });
    };
};

export const addPlayersSuccess = data => {
    return {
        type: ADD_PLAYERS_AT_EVENT,
        payload: data
    };
};



export const createEvent = event => {
    return dispatch => {
        console.log('------->', event)
        return axios
            .post('/events/create', event)
            .then(response => {
                dispatch(createEventSuccess(response.data));
                console.log(response.data);
            })
            .catch(error => {
                throw error;
            });
    };
};

export const createEventSuccess = data => {
    return {
        type: ADD_EVENT,
        payload: data
    };
};


export const fetchEventByIdSuccess = event => {
    return {
        type: FETCH_EVENT_BY_ID,
        event
    };
};

export const fetchEventById = (id) => {
    return dispatch => {
        console.log('777777777777',id);
        return axios
            .get(`/events/${id}/get`)
            .then(response => {
                dispatch(fetchEventByIdSuccess(response.data));
                    console.log('fetchEventByIdSuccess-------',response.data);

            })
            .catch(error => {
                throw error;
            });
    };
};

export const fetchEvents = event => {
    return {
        type: FETCH_ALL_EVENTS,
        event
    };
};

export const fetchAllEvents = (ids, keys) => {
    return dispatch => {
        let query = '';
        if (keys.length > 0) {
            //for loop
            keys.forEach((key, index) => {
                query += key + '=' + ids[index];
                if (index !== keys.length - 1) query += '&';
            });
        }
        return axios
            .get('/events/all?' + query)
            .then(response => {
                dispatch(fetchEvents(response.data));
            })
            .catch(error => {
                throw error;
            });
    };
};
export const deleteEventSuccess = id => {
    return {
        type: DELETE_EVENT,
        id: id
    };
};
export const deleteEvent = (id) => {
    return dispatch => {
        return axios
            .delete(`/events/delete/${id}`)
            .then(response => {
                dispatch(deleteEventSuccess(response.data));
                console.log('Success');
            })
            .catch(error => {
                throw error;
            });
    };
};
/////////////////////////////////Check Team Players

export const CheckTeamPlayersSuccess = players => {
    return {
        type: CHECK_TEAM_PLAYERS,
        payload: players
    };
};

export const CheckTeamPlayers = (id,eventId) => {
    console.log('Action data----Team Player Check------>',id,eventId)
    return dispatch => {
        return axios
            .post(`/teams/${id}/non-faulty-players`,eventId)
            .then(response => {
                dispatch(CheckTeamPlayersSuccess(response.data));
                console.log('Response----Team Player Check------>',response.data)

            })
            .catch(error => {
                throw error;
            });
    };
};
