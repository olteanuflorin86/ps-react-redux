import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const CourseForm = ({authors, course, errors={}, onChange, onSave, saving=false}) => {
  return(
    <form onSubmit={onSave}>

      <h2>{course.id ? 'Edit' : 'Add'} Course</h2>

      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}

      <TextInput 
        name="title"
        label="Title"
        placeholder="Enter a title"
        value={course.title}
        onChange={onChange}
        error={errors.title}
      />

      <SelectInput 
        name="authorId"
        label="Author"
        value={course.authorId || ""}
        defaultOption="SelectAuthor"
        options={authors.map(author => {
          return {
            value: author.id,
            text: author.name,
          }
        })}
        onChange={onChange}
        error={errors.authors}
      />

      <TextInput 
        name="category"
        label="Category"
        placeholder="Enter a category"
        value={course.category}
        onChange={onChange}
        error={errors.category}
      />

      <button
        type="submit"
        disabled={saving}
        className="btn btn-primary"
      >
        {saving ? "Saving..." : "Save "}
      </button>

    </form>
  )

}

CourseForm.propTypes = {
    authors: PropTypes.array.isRequired,
    course: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    saving: PropTypes.bool,
}

export default CourseForm;