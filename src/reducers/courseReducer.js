import {
  CREATE_COURSE_SUCCESS, LOAD_COURSES_SUCCESS, UPDATE_COURSE_SUCCESS
} from '../actions/types';

export default function courseReducer(state = [], action) {
  switch(action.type) {
    // case CREATE_COURSE:
    //   //debugger;
    //   return [...state, {...action.payload}];
    case LOAD_COURSES_SUCCESS:
      // now payload is the whole state
      return action.payload;
    case CREATE_COURSE_SUCCESS:
      return [...state, {...action.payload}];
    case UPDATE_COURSE_SUCCESS:
      return state.map(course => {
        course.id === action.payload.id ? action.payload : course
      });
    default:
      return state;
  }
}