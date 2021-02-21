import {
  LOAD_AUTHORS_SUCCESS
} from '../actions/types';

export default function authorReducer(state = [], action) {
  switch(action.type) {
    case LOAD_AUTHORS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}