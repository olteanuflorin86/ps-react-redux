import {
  CREATE_COURSE
} from './types';

export function createCourse(course) {
  //debugger;
  return {
    type: CREATE_COURSE,
    payload: course
  }
}