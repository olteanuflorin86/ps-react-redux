import {
  CREATE_COURSE,
  LOAD_COURSES_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  CREATE_COURSE_SUCCESS
} from './types';

import * as courseApi from '../api/courseApi';

// Action creator
// export function createCourse(course) {
//   //debugger;
//   return {
//     type: CREATE_COURSE,
//     payload: course
//   }
// }

// Action creator
function loadCourseSuccess(courses) {
  return {
    // Action:
    type: LOAD_COURSES_SUCCESS,
    payload: courses
  }
}

// Action creator
function updateCourseSuccess(course) {
  return {
    type: UPDATE_COURSE_SUCCESS,
    payload: course
  }
}

// Action creator
function createCourseSuccess(course) {
  return {
    type: CREATE_COURSE_SUCCESS,
    payload: course
  }
}


// Thunk
export function loadCourses() {
  return function(dispatch) {
    return courseApi.getCourses().then(courses => {
      dispatch(loadCourseSuccess(courses));
    }).catch(error => {
      throw error;
    })
  }
}

// Thunk
export function saveCourse(course) {
  console.log(course);
  return function(dispatch, getState) {
    return courseApi.saveCourse(course).then(savedCourse => {
      course.id 
        ? dispatch(updateCourseSuccess(savedCourse))
        : dispatch(createCourseSuccess(savedCourse));
    }).catch(error => {
      throw error;
    });
  }
}

