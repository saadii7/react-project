import { MAKE_FRIEND_REQUEST, CHECK_NOTIFICATIONS, ADD_NOTIFICATION,DELETE_NOTIFICATION} from './types';
import axios from 'axios';



export const checkFriendship = (id) => {
  return (dispatch) => {
    // console.log("check Frndship Id-------------->", id)
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

export const makeFriendRequest = (id) => {
  return (dispatch) => {
    // console.log("check Frndship Id-------------->", id)
    return axios.post('/notifications/create/', id)
      .then(response => {
        dispatch(makeFriendRequestSuccess(response.data))
        // { console.log("<><><><>-------------->", response.data) }
      })
      .catch(err => {
        console.log("error in makeFriendRequest axios: ", err);
      });
  }
}
export const makeFriendRequestSuccess = (data) => {
  // { console.log("<><><><>-------------->", data) }
    return {
      type: MAKE_FRIEND_REQUEST,
      payload: data
    }
};


export const CheckSocketNotifications = (notification) => {
  console.log('Socket Notification-------->', notification)
    return {
      type: ADD_NOTIFICATION,
      payload: notification
    }
}
// export const CheckSocketNotificationsSuccess = (data) => {
//   { console.log("<><><><>-------------->", data) }
//   return {
//     type: MAKE_FRIEND_REQUEST,
//     payload: data
//   }
// };


export const checkNotifications = (ids, keys) => {
  return dispatch => {
    let query = '';
    if (keys.length > 0) {
      //for loop
      keys.forEach((key, index) => {
        query += key + '=' + ids[index];
        if (index !== keys.length - 1) query += '&';
      });
    }
    return axios
      .get('/notifications/all?' + query)
      .then(response => {
        dispatch(checkNotificationsSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
}
export const checkNotificationsSuccess = (data) => {
  // { console.log("<><><><>----90909---------->", data) }
  return {
    type: CHECK_NOTIFICATIONS,
    payload: data
  }
};

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


export const deleteNotificationSuccess = id => {
  console.log("deleteNotificationSuccess-------------->", id)
  return {
    type: DELETE_NOTIFICATION,
    id: id
    
  }
}
export const deleteNotification = id => {
  return (dispatch) => {
    return axios.delete(`/notifications/${id}/delete`)
      .catch(error => {
        throw(error);
      });
  };
};