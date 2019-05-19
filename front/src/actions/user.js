import {FETCH_USER_BY_ID,FETCH_ALL_USERS,DELETE_USER} from '../actions/types';
import axios from 'axios';

// export const getUser = (id) => dispatch => {
//     axios.get('/users/get/'+id)
//     .then(res =>{
//         console.log('GET_USER_DATA_FETCH_OK>'+JSON.stringify(res.data))
//         const data=JSON.stringify(res.data)
//         dispatch(UserData(data))
//     })
//     .catch(err => {
//         console.log(err);
//     });
// }
// export const UserData = user => {
//     return[{
//         type:GET_CURRENT_USER,
//         payload: JSON.stringify(user)
//     }]
// }

export const getUserByIdSuccess = (user) => {
    return {
      type: FETCH_USER_BY_ID,
      payload:user
    }
  };
  // Async Action
  export const getUser = (Id) => {
    return (dispatch) => {
      return axios.get('/users/get/'+Id)
        .then(response => {
          // Handle data with sync action
          dispatch(getUserByIdSuccess(response.data));
        })
        .catch(error => {
          throw(error);
        });
    };
  };



  export const fetchUsers = (users) => {
    return {
      type: FETCH_ALL_USERS,
      payload: users
    }
  };
  export const fetchAllUsers = () => {
    return (dispatch) => {
      return axios.get("/users/all")
        .then(response => {
          dispatch(fetchUsers(response.data))
        })
        .catch(error => {
          throw(error);
        });
    };
  };

  export const deleteUserSuccess = id => {
    return {
      type: DELETE_USER,
      id: id
      
    }
  }
  export const deleteUser = id => {
    return (dispatch) => {
      return axios.delete('/users/delete/'+id)
        .then(response =>{
          dispatch(deleteUserSuccess(response.data))
          console.log("Success")
        })
        .catch(error => {
          throw(error);
        });
    };
  };
  