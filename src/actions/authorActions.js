import {
  LOAD_AUTHORS_SUCCESS
} from './types';

import * as authorApi from '../api/authorApi';
import {apiCallError, beginApiCall} from './apiStatusActions';

function loadAuthorsSuccess(authors) {
  return {
    type: LOAD_AUTHORS_SUCCESS,
    payload: authors
  }
}

// Thunk
export function loadAuthors() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return authorApi.getAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      dispatch(apiCallError(error));
      throw error;
    })
  }
}