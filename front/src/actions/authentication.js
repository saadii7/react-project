// authentication.js

import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER,GET_ALL_USER} from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
    axios.post('/api/users/register', user)
            .then(res => history.push('/login'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const loginUser = (user) => dispatch => {
    axios.post('/api/users/login', user)
            .then(res => {
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
}

export const getAllUsers = () => dispatch => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res =>{
        console.log('DATA_FETCH_OK>'+res.data)
        dispatch(getUsers(res.data))
    })
    .catch(err => {
        console.log(err);
    });
}
export const getUsers = users => {
    return[{
        type:GET_ALL_USER,
        users
    }]
}