import { SEND_FRIEND_REQUEST} from '../actions/types';
import axios from 'axios';

export const createFriendRequest = (id) => {
  return (dispatch) => {
    console.log("Sport Name-------------->", id)
    return axios.post('', id)
      .then(response => {
        dispatch(createFriendRequestSuccess(response.data))
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const createFriendRequestSuccess = (data) => {
  return {
    type: SEND_FRIEND_REQUEST,
    payload: data
  }
};

export const checkFriendship = (id) => {
  return (dispatch) => {
    console.log("check Frndship Id-------------->", id)
    return axios.post('', id)
      .then(({ data }) => {
        this.setState(data);
      })
      .catch(error => {
        console.log("error in checkFrienship axios: ", error);
        throw (error);
      });
  };
};
// export const checkFriendshipSuccess =  (data) => {
//   return {
//     type: CHECK_FRIENDSHIP,
//     payload:data
//   }
// };
export const makeFriendRequest = (id) => {
  return (dispatch) => {
    console.log("check Frndship Id-------------->", id)
    return axios.post('', id)
      .then(({ data }) => {
        this.setState({
          noRelationship: false,
          ...data
        });
      })
      .catch(err => {
        console.log("error in makeFriendRequest axios: ", err);
      });
  }
}

export const endFriendship = (id) => {
  return (dispatch) => {
    console.log("check Frndship Id-------------->", id)
    return axios.post("" + this.props.otherUserId)
      .then(({ data }) => {
        this.setState(data);
      })
      .catch(err => {
        console.log("error in endFrienship axios: ", err);
      })
  }
}