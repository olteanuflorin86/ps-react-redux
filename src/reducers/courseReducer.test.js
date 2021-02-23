import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';


//1. We test Adding a course
it("should add course when passed CREATE_COURSE_SUCCESS", () => {
  // arrange
  const initialState = [
    {
      title: "A"
    },
    {
      title: "B"
    }
  ];

  const newCourse = {
    title: "C"
  };

  const action = actions.createCourseSuccess(newCourse);

  // act
  const newState = courseReducer(initialState, action);
                   
  // assert
  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("B");
  expect(newState[2].title).toEqual("C");

});



//2. We test Updating a course
it("should update course when passed UPDATE_COURSE_SUCCESS", () => {
  // arrange
  const initialState = [
    {
      id: 1,
      title: "A"
    },
    {
      id: 2,
      title: "B"
    },
    {
      id: 3,
      title: "C"
    }
  ];

  const updateOldCourse = {
    id: 2,
    title: "new B"
  };

  const action = actions.updateCourseSuccess(updateOldCourse);

  // act
  const newState = courseReducer(initialState, action);
  const updatedCourse = newState.find(item => item.id === updateOldCourse.id);
  const untouchedCourse1 = newState.find(item => item.id === 1);
  const untouchedCourse2 = newState.find(item => item.id === 3);

  // assert
  expect(newState.length).toEqual(3);
  expect(updatedCourse.title).toEqual("new B");
  expect(untouchedCourse1.title).toEqual("A");
  expect(untouchedCourse2.title).toEqual("C");

});
