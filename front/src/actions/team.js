import { ADD_TEAM,FETCH_TEAM} from '../actions/types';
import axios from 'axios';


export const createTeam = (team) => {
  return (dispatch) => {
    console.log(team);
    return axios.post('/teams/create',team)
      .then(response => {
        dispatch(createTeamSuccess(response.data))
        console.log(response.data)
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const createTeamSuccess =  (data) => {
  return {
    type: ADD_TEAM,
    payload:data
  }
};



export const getTeamByIdSuccess = (team) => {
    return {
      type: FETCH_TEAM,
      payload:team
    }
  };
  // Async Action
  export const getTeam = (id) => {
    return (dispatch) => {
      return axios.get('/teams/get/'+id)
        .then(response => {
          // Handle data with sync action
          dispatch(getTeamByIdSuccess(response.data));
        })
        .catch(error => {
          throw(error);
        });
    };
  };