import { ADD_EVENT,FETCH_ALL_EVENTS} from '../actions/types';
import axios from 'axios';


export const createEvent = (event) => {
  return (dispatch) => {
    console.log(event);
    return axios.post('/api/events/add',event)
      .then(response => {
        dispatch(createEventSuccess(response.data))
        console.log(response.data)
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const createEventSuccess =  (data) => {
  return {
    type: ADD_EVENT,
    payload:data
  }
};


export const fetchEvents = (event) => {
    return {
      type: FETCH_ALL_EVENTS,
      event
    }
  };
  
  export const fetchAllEvents = (ids,keys) => {
    return (dispatch) => {
      let query = '';
      if (keys.length>0){
        //for loop
        keys.forEach((key,index) => {
          query += key + '=' + ids[index];
          if(index !== keys.length -1)query += '&';
        })
      }
      console.log('----User Id TO Get Evets---->',query)
      return axios.get("/api/events/all"+ "?" + query)
        .then(response => {
          dispatch(fetchEvents(response.data))
          console.log('----->',response.data)

        })
        .catch(error => {
          throw(error);
        });
    };
  };