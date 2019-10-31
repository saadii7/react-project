import {
    ADD_TEAM,
    FETCH_TEAM,
    FETCH_ALL_TEAMS,
    DELETE_TEAM,
    ADD_TEAM_PLAYER,
    FETCH_TEAM_PLAYER
} from '../actions/types';
import axios from 'axios';

export const createTeamSuccess = data => {
    return {
        type: ADD_TEAM,
        payload: data
    };
};
export const createTeam = (team, callback) => {
    return dispatch => {
        console.log(team);
        return axios
            .post('/teams/create', team)
            .then(response => {
                callback(response.data)
                dispatch(createTeamSuccess(response.data));
            })
            .catch(error => {
                throw error;
            });
    };
};




export const fetchTeamPlayerSuccess = data => {
    return {
        type: FETCH_TEAM_PLAYER,
        payload: data
    };
};
export const fetchTeamPlayer = (id) => {
    console.log('--------players---->', id);
    return dispatch => {
        return axios
            .get(`/teams/${id}/all-players`)
            .then(response => {
                // callback(response.data)
                dispatch(fetchTeamPlayerSuccess(response.data));
            })
            .catch(error => {
                throw error;
            });
    };
};


export const addTeamPlayerSuccess = data => {
    return {
        type: ADD_TEAM_PLAYER,
        payload: data
    };
};
export const addTeamPlayer = (palyers) => {
    return dispatch => {
        console.log('------action---players---->', palyers);
        return axios
            .post('/teams/add-player', palyers)
            .then(response => {
                // callback(response.data)
                dispatch(addTeamPlayerSuccess(response.data));
            })
            .catch(error => {
                throw error;
            });
    };
};


// export const fetchTeams = teams => {
//     return {
//         type: FETCH_ALL_TEAMS,
//         payload: teams
//     };
// };
// export const fetchAllTeams = (ids, keys) => {
//     return dispatch => {
//         // {console.log('Querry--------->'+ids,keys)};
//         let query = '';
//         if (keys.length > 0) {
//             // for loop
//             keys.forEach((key, index) => {
//                 query += key + '=' + ids[index];
//                 if (index !== keys.length - 1) query += '&';
//             });
//         }
//         { console.log('Querry--------->' + query) };

//         return axios
//             .get(`/teams/all?${query}`)
//             .then(response => {
//                 { console.log('FETCH---------->' + response.data) }
//                 dispatch(fetchTeams(response.data));
//             })
//             .catch(error => {
//                 throw error;
//             });
//     };
// };


export const fetchMyTeamsSuccess = teams => {
    return {
        payload: teams,
        type: FETCH_ALL_TEAMS,
    };
};

export const fetchMyTeams = (ids, keys) => {
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
            .get('/teams/all?' + query)
            .then(response => {
                dispatch(fetchMyTeamsSuccess(response.data));
            })
            .catch(error => {
                throw error;
            });
    };
};



export const getTeamByIdSuccess = team => {
    return {
        type: FETCH_TEAM,
        payload: team
    };
};
// Async Action
export const getTeam = id => {
    return dispatch => {
        return axios
            .get(`/teams/get/${id}`)
            .then(response => {
                // Handle data with sync action
                dispatch(getTeamByIdSuccess(response.data));
            })
            .catch(error => {
                throw error;
            });
    };
};

export const deleteTeamSuccess = id => {
    return {
        type: DELETE_TEAM,
        id: id
    };
};
export const deleteTeam = id => {
    return dispatch => {
        console.log('Team----------id----------' + id);
        return axios
            .delete('/teams/delete/' + id)
            .then(response => {
                dispatch(deleteTeamSuccess(response.data));
                console.log('Success');
            })
            .catch(error => {
                throw error;
            });
    };
};
