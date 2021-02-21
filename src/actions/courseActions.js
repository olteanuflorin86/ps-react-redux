import {
  CREATE_COURSE,
  LOAD_COURSES_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  CREATE_COURSE_SUCCESS,
  DELETE_COURSE_OPTIMISTIC
} from './types';

import * as courseApi from '../api/courseApi';
import {apiCallError, beginApiCall} from './apiStatusActions';

// Action creator
// export function createCourse(course) {
//   //debugger;
//   return {
//     type: CREATE_COURSE,
//     payload: course
//   }
// }

// Action creator
export function loadCourseSuccess(courses) {
  return {
    // Action:
    type: LOAD_COURSES_SUCCESS,
    payload: courses
  }
}

// Action creator
export function updateCourseSuccess(course) {
  return {
    type: UPDATE_COURSE_SUCCESS,
    payload: course
  }
}

// Action creator
export function createCourseSuccess(course) {
  return {
    type: CREATE_COURSE_SUCCESS,
    payload: course
  }
}

// Action creator
export function deleteCourseOptimistic(course) {
  return {
    type: DELETE_COURSE_OPTIMISTIC,
    payload: course,
  }
}


// Thunk
export function loadCourses() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return courseApi.getCourses().then(courses => {
      dispatch(loadCourseSuccess(courses));
    }).catch(error => {
      dispatch(apiCallError(error));
      throw error;
    })
  }
}

// Thunk
export function saveCourse(course) {
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return courseApi.saveCourse(course).then(savedCourse => {
      course.id 
        ? dispatch(updateCourseSuccess(savedCourse))
        : dispatch(createCourseSuccess(savedCourse));
    }).catch(error => {
      dispatch(apiCallError(error));
      throw error;
    });
  }
}

// Thunk
export function deleteCourse(course) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or ApiCallError action since we're not showing the loading status for this
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id); 
  }
}

