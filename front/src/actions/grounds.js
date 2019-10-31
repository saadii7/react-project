import {ADD_GROUND,FETCH_GROUND,FETCH_ALL_GROUNDS,DELETE_GROUND,} from '../actions/types';
import axios from 'axios';

export const createGroundSuccess = data => {
    return {
        type: ADD_GROUND,
        payload: data
    };
};
export const createGround = (team) => {
    return dispatch => {
        console.log(team);
        return axios
            .post('/grounds/create', team)
            .then(response => {
                dispatch(createGroundSuccess(response.data));
            })
            .catch(error => {
                throw error;
            });
    };
};


export const fetchGroundsSuccess =(data)=> {
    return {
        type: FETCH_ALL_GROUNDS,
        payload: data
    };
};
export const fetchAllGrounds = () => {
    return dispatch => {
        return axios
            .get(`/grounds/all`)
            .then(response => {
                {console.log('FETCH---------->'+response.data)}
                dispatch(fetchGroundsSuccess(response.data));
            })
            .catch(error => {
                throw error;
            });
    };
};

export const getGroundSuccess = (data) => {
    return {
        type: FETCH_GROUND,
        payload: data
    };
};
// Async Action
export const getGround = id => {
    return dispatch => {
        return axios
            .get(`grounds/${id}/get`)
            .then(response => {
                // Handle data with sync action
                dispatch(getGroundSuccess(response.data));
            })
            .catch(error => {
                throw error;
            });
    };
};

export const deleteGroundSuccess =(data) => {
    return {
        type: DELETE_GROUND,
        id: data
    };
};
export const deleteTeam = id => {
    return dispatch => {
        // console.log('Team----------id----------' + id);
        return axios
            .delete(`grounds/delete/${id}`)
            .then(response => {
                dispatch(deleteGroundSuccess(response.data));
                console.log('Success');
            })
            .catch(error => {
                throw error;
            });
    };
};
