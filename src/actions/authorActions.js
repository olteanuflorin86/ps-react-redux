import {
  LOAD_AUTHORS_SUCCESS
} from './types';

import * as authorApi from '../api/authorApi';

function loadAuthorsSuccess(authors) {
  return {
    type: LOAD_AUTHORS_SUCCESS,
    payload: authors
  }
}

// Thunk
export function loadAuthors() {
  return function(dispatch) {
    return authorApi.getAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      throw error;
    })
  }
}