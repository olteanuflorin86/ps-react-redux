import React from 'react'
import { cleanup, render} from '@testing-library/react';
import CourseForm from './CourseForm';

afterEach(cleanup);

function renderCourseForm(args) {
  let defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {}, 
    onChange: () => {},
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}
  
it("should render Add Course header", () => {
  const { getByText } = renderCourseForm();
  getByText("Add Course");
}); 

it("should render Save at the save button when saving is false", () => {
  const { getByText } = renderCourseForm();
  getByText("Save");
}); 

it("should render Saving... at the save button when saving is true", () => {
  const { getByText } = renderCourseForm({saving: true});
  getByText("Saving...");
});


