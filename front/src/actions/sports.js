import { ADD_POST, DELETE_POST, FETCH_POST } from '../actions/types';
import axios from 'axios';

const apiUrl = 'http://localhost:4000/posts';

export const createPost = ({ sportName}) => {
  return (dispatch) => {
    return axios.post(`/api/sports/add`, {sportName})
      .then(response => {
        dispatch(createPostSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const createPostSuccess =  (data) => {
  return {
    type: ADD_POST,
    payload: {
      _id: data._id,
      sportName: data.sportName
    }
  }
};

export const deletePostSuccess = id => {
  return {
    type: DELETE_POST,
    payload: {
      id
    }
  }
}

export const deletePost = id => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/delete/${id}`)
      .then(response => {
        dispatch(deletePostSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchPosts = (posts) => {
  return {
    type: FETCH_POST,
    posts
  }
};

export const fetchAllPosts = () => {
  return (dispatch) => {
    return axios.get("/api/sports/getall")
      .then(response => {
        dispatch(fetchPosts(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};