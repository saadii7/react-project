import {FETCH_USER_BY_ID} from '../actions/types';
import axios from 'axios';

// export const getUser = (id) => dispatch => {
//     axios.get('/api/users/get/'+id)
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
      return axios.get('/api/users/get/'+Id)
        .then(response => {
          // Handle data with sync action
          dispatch(getUserByIdSuccess(response.data));
        })
        .catch(error => {
          throw(error);
        });
    };
  };