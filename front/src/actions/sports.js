import { ADD_SPORT, DELETE_SPORT, FETCH_ALL_SPORTS,UPDATE_SPORT } from '../actions/types';
import axios from 'axios';


export const createSport = ({name}) => {
  return (dispatch) => {
    console.log("Sport Name-------------->",name)
    return axios.post('/sports/create',{name})
      .then(response => {
        dispatch(createSportSuccess(response.data))
       console.log("Sport Name- Res------------->",response.data)

      })
      .catch(error => {
        throw(error);
      });
  };
};

export const createSportSuccess =  (data) => {
  console.log("Sport Name- Res-------2------>",data)    
  return {
    type: ADD_SPORT,
    payload:data
  }
};

export const deleteSportSuccess = id => {
  return {
    type: DELETE_SPORT,
    id: id
    
  }
}
export const deleteSport = id => {
  return (dispatch) => {
    console.log("Sports-------id-------------"+id)
    return axios.delete('/sports/delete/'+id)
      .then(response =>{
        dispatch(deleteSportSuccess(response.data))
        console.log("Success")
      })
      .catch(error => {
        throw(error);
      });
  };
};
// export const deleteSport = id => {
//   return (dispatch) => {
//     console.log(id)
//     return axios.delete("/sports/delete/"+id)
//       .then(response => {
//         dispatch(deleteSportSuccess(response.data))
//       })
//       .catch(error => {
//         throw(error);
//       });
//   };
// };

export const fetchSports = (sports) => {
  return {
    type: FETCH_ALL_SPORTS,
    sports
  }
};

export const fetchAllSports = () => {
  return (dispatch) => {
    return axios.get("/sports/all")
      .then(response => {
        dispatch(fetchSports(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const updateSport = (sport) => {
  return (dispatch) => {
    console.log("Edit Sport-------------->",sport)
    return axios.post('/sports/update',sport)
      .then(response => {
        dispatch(updateSportSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const updateSportSuccess =  (data) => {
  return {
    type: UPDATE_SPORT,
    payload:data
  }
};