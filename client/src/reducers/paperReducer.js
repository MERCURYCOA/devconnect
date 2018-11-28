import {
  GET_PAPER,
  GET_PAPERS,
  PAPER_LOADING,
  CLEAR_CURRENT_PAPER
} from "../actions/types";

const initialState = {
  paper: null,
  papers: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PAPER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PAPER:
      return {
        ...state,
        paper: action.payload,
        loading: false
      };
    case GET_PAPERS:
      return {
        ...state,
        papers: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PAPER:
      return {
        ...state,
        paper: null
      };
    default:
      return state;
  }
}
