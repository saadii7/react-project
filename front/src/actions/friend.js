import {ACCEPT_FRIEND_REQUEST,FETCH_ALL_FRIENDS} from './types';
import axios from 'axios';

  export const acceptFriendRequest = (id,friendId,notificationId) => {
    return (dispatch) => {
      console.log("Accpet FR-------------->", id)
      return axios.post(`/users/${id}/add-friend`,{friendId,notificationId})
        .then(response => {
          dispatch(acceptFriendRequestSuccess(response.data))
          // { console.log("<><><><>-------1------->", response.data) }
        })
        .catch(err => {
          console.log("error in makeFriendRequest axios: ", err);
        });
    }
  }
  export const acceptFriendRequestSuccess = (data) => {
    // { console.log("<><><><>------2-------->", data) }
    return {
      type: ACCEPT_FRIEND_REQUEST,
      payload: data
    }
  };
  
  export const fetchAllFriends = (id) => {
    return (dispatch) => {
      console.log("fetchAllFriends-------------->", id)
      return axios.get(`/users/${id}/friends`)
        .then(response => {
          dispatch(fetchAllFriendsSuccess(response.data))
          // { console.log("<><><><>-------1------->", response.data) }
        })
        .catch(err => {
          console.log("error in makeFriendRequest axios: ", err);
        });
    }
  }
  export const fetchAllFriendsSuccess = (data) => {
    // { console.log("<><><><>------2-------->", data) }
    return {
      type: FETCH_ALL_FRIENDS,
      payload: data
    }
  };
  