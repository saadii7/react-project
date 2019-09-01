import {ACCEPT_FRIEND_REQUEST,FETCH_ALL_FRIENDS,DELETE_FRIEND} from './types';
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
  


export const deleteFriendSuccess = id => {
  return {
    type: DELETE_FRIEND,
    id: id
    
  }
}
export const deleteFriend = id => {
  return (dispatch) => {
    console.log("Sports-------id-------------"+id)
    return axios.delete(`users/${id}/delete-friend`)
      .then(response =>{
        dispatch(deleteFriendSuccess(response.data))
        console.log("Success")
      })
      .catch(error => {
        throw(error);
      });
  };
};
  