import {createStore} from 'redux'
import rootReducer from './reducers';
import * as coursActions from './actions/courseActions';

const initialState = {
  courses: [],
  authors: []
};

it("Our store should handle creating courses", () => {
  // arrange
  const store = createStore(rootReducer, initialState);
  const course = {
    title: "Clean Code"
  }

  // act
  const action = coursActions.createCourseSuccess(course);
  store.dispatch(action);

  // assert
  const createdCourse = store.getState().courses[0];
  expect(createdCourse).toEqual(course);

});

