import {SEND_FRIEND_REQUEST} from '../actions/types';
import axios from 'axios';

export const createFriendRequest = (id) => {
  return (dispatch) => {
    console.log("Sport Name-------------->",id)
    return axios.post('',id)
      .then(response => {
        dispatch(createFriendRequestSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const createFriendRequestSuccess =  (data) => {
  return {
    type: SEND_FRIEND_REQUEST,
    payload:data
  }
};
