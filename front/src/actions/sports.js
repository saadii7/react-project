import { ADD_SPORT, DELETE_SPORT, FETCH_ALL_SPORTS } from '../actions/types';
import axios from 'axios';


export const createSport = ({ sportName}) => {
  return (dispatch) => {
    return axios.post(`/api/sports/add`, {sportName})
      .then(response => {
        dispatch(createSportSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const createSportSuccess =  (data) => {
  return {
    type: ADD_SPORT,
    payload:data
  }
};

export const deleteSportSuccess = id => {
  return {
    type: DELETE_SPORT,
    payload: {
      id
    }
  }
}

export const deleteSport = id => {
  return (dispatch) => {
    console.log(id)
    return axios.delete("/api/sports/delete/"+id)
      .then(response => {
        dispatch(deleteSportSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchSports = (sports) => {
  return {
    type: FETCH_ALL_SPORTS,
    sports
  }
};

export const fetchAllSports = () => {
  return (dispatch) => {
    return axios.get("/api/sports/getall")
      .then(response => {
        dispatch(fetchSports(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};