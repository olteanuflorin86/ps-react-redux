import {
  BEGIN_API_CALL,
  API_CALL_ERROR
} from '../actions/types';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiCallStatusReducer(state = 0, action) {
  if(action.type === BEGIN_API_CALL) {
      return state + 1;
  } else if(action.type === API_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
      return state - 1;
  }
  return state;
}
