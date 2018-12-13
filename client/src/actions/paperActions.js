import axios from "axios";

import {
  GET_PAPER,
  GET_PAPERS,
  PAPER_LOADING,
  CLEAR_CURRENT_PAPER,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";

// Get current paper
export const getCurrentPaper = () => dispatch => {
  dispatch(setPaperLoading());
  axios
    .get('/api/paper')
    .then(res =>
      dispatch({
        type: GET_PAPER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PAPER,
        payload: {}
      })
    );
};

// Get paper by handle
export const getPaperByHandle = handle => dispatch => {
  dispatch(setPaperLoading());
  axios
    .get(`/api/paper/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PAPER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PAPER,
        payload: null
      })
    );
};

// Create Paper
export const createPaper = (paperData, history) => dispatch => {
  axios
    .post("/api/paper", paperData)
    .then(res => history.push("/mypaper"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add comment
export const addComment = (commentData, history) => dispatch => {
  axios
    .post("/api/paper/comment", commentData)
    .then(res => history.push("/mypaper"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Comment
export const deleteComment = id => dispatch => {
  axios
    .delete(`/api/paper/comment/${id}`)
    .then(res =>
      dispatch({
        type: GET_PAPER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all papers
export const getPapers = () => dispatch => {
  dispatch(setPaperLoading());
  axios
    .get("/api/paper/all")
    .then(res =>
      dispatch({
        type: GET_PAPERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PAPERS,
        payload: null
      })
    );
};

// Delete account & paper
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/paper")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Paper loading
export const setPaperLoading = () => {
  return {
    type: PAPER_LOADING
  };
};

// Clear paper
export const clearCurrentPaper = () => {
  return {
    type: CLEAR_CURRENT_PAPER
  };
};
