// authentication.js

import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER,FORGOT_PASSWORD} from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
    axios.post('/auth/register', user)
        // console.log('------------->',user)
        .then(res => history.push('/login'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
    }

    export const loginUser = (user) => dispatch => {
        axios.post('/auth/login', user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = {
                token,
                ...jwt_decode(token)
            };
            // decoded.token = token;
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
        axios.get('/auth/logout')
        .then(res => {
            localStorage.removeItem('jwtToken');
            setAuthToken(false);
            dispatch(setCurrentUser({}));
            history.push('/login');
            // const { token } = res.data;
            // localStorage.setItem('jwtToken', token);
            // setAuthToken(token);
            // const decoded = {
            //     token,
            //     ...jwt_decode(token)
            // };
            // // decoded.token = token;
            // dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            {console.log('auth log ----------->',err.response)}
                dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            });
        });
    }



    export const forgotPassword = (email) => {
        return dispatch => {
            console.log('-------email------->', email)
            return axios
                .post('/auth/forgot',email)
                .then(response => {
                    dispatch(forgotPasswordSuccess(response.data));
                    console.log(response.data);
                })
                .catch(err => {
                    throw err,
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data,
                    });
                });
        };
    };
    
    export const forgotPasswordSuccess = data => {
        return {
            type: FORGOT_PASSWORD,
            payload: data
        };
    };
