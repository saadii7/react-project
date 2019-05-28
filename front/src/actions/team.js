import {
    ADD_TEAM,
    FETCH_TEAM,
    FETCH_ALL_TEAMS,
    DELETE_TEAM
} from '../actions/types';
import axios from 'axios';

export const createTeamSuccess = data => {
    return {
        type: ADD_TEAM,
        payload: data
    };
};
export const createTeam = team => {
    return dispatch => {
        console.log(team);
        return axios
            .post('/teams/create', team)
            .then(response => {
                dispatch(createTeamSuccess(response.data));
                console.log(response.data);
            })
            .catch(error => {
                throw error;
            });
    };
};

export const fetchTeams = teams => {
    return {
        type: FETCH_ALL_TEAMS,
        payload: teams
    };
};
export const fetchAllTeams = () => {
    return dispatch => {
        return axios
            .get('/teams/all')
            .then(response => {
                dispatch(fetchTeams(response.data));
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
//         let query = '';
//         if (keys.length > 0) {
//             //for loop
//             keys.forEach((key, index) => {
//                 query += key + '=' + ids[index];
//                 if (index !== keys.length - 1) query += '&';
//             });
//         }
//         return axios
//             .get('/teams/all?' + query)
//             .then(response => {
//                 dispatch(fetchTeams(response.data));
//             })
//             .catch(error => {
//                 throw error;
//             });
//     };
// };



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
            .get('/teams/get/' + id)
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
