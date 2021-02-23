import {
  CREATE_COURSE_SUCCESS, DELETE_COURSE_OPTIMISTIC, LOAD_COURSES_SUCCESS, UPDATE_COURSE_SUCCESS
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
        return course.id === action.payload.id ? action.payload : course
      });
    case DELETE_COURSE_OPTIMISTIC:
      // return all the courses except the one that we want deleted
      return state.filter(course => course.id !== action.payload.id); 
    default:
      return state;
  }
}