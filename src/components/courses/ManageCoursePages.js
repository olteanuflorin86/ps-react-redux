import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {loadCourses, saveCourse} from '../../actions/courseActions';
import {loadAuthors} from '../../actions/authorActions';
import CourseForm from './CourseForm';
import {newCourse} from '../../../tools/mockData';
import { getCourses } from '../../api/courseApi';

import Spinner from '../common/Spinner';

import {toast} from 'react-toastify';

const ManageCoursePages = (props) => {
  // we need local state to save data from the form before it is send - we use useState 

    // props.course refers to newCourse from mockData
    const [course, setCourse] = useState({...props.course});
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

  useEffect(() => {

    if(props.courses.length === 0) {
      props.loadCourses()
        .catch(error => {
          alert("Loading courses failed " + error);
        })
    } else {
      setCourse({...props.course});
    }

    if(props.authors.length === 0) {
      props.loadAuthors()
        .catch(error => {
          alert("Loading authors failed " + error);
        })
    }
  }, [props.course]);

  function handleChange(event) {
    const {name, value } = event.target;
    // we use the functional form of setState below
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const {title, authorId, category} = course;
    const errors = {};

    if(!title) errors.title = "Title is required,"; 
    if(!authorId) errors.author = "Author is required,"; 
    if(!category) errors.category = "Category is required,"; 

    setErrors(errors);
    // Form is valid if the erros object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if(!formIsValid()) return;
    setSaving(true);
    // course.id = props.courses.length + 1;
    // console.log(course);
    // console.log(course.id);
    // console.log(props.courses);
    // console.log(props.courses.length);
    // console.log(course);
    //window.location.reload(false);
    props.saveCourse(course).then(() => {
      toast.success('Course saved.');
      props.history.push("/courses");
    }). catch(error => {
      setSaving(false);
      setErrors({onSave: error.message});
    })
  }

  return ( props.authors.length === 0 || props.courses.length === 0 
    ? <Spinner />
    :
      <div>
        <CourseForm authors={props.authors} course={course} onChange={handleChange} onSave={handleSave} errors={errors} saving={saving}/>
      </div>
  )
}

ManageCoursePages.proptypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  //createCourse: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,

}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     createCourse: bindActionCreators(createCourse, dispatch),
//     loadCourses: bindActionCreators(loadCourses, dispatch),
//     loadAuthors: bindActionCreators(loadAuthors, dispatch),
//   }
// }

const mapDispatchToProps = {
  //createCourse: createCourse,
  loadCourses: loadCourses,
  saveCourse: saveCourse,
  loadAuthors: loadAuthors,
}

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null; 
}

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  // we check if courses have loaded, etc
  console.log(state.courses);
  console.log(slug);
  const currentCourse = 
    slug && state.courses.length > 0 
      ? getCourseBySlug(state.courses, slug) 
      : newCourse;
  return {
    course: currentCourse,
    courses: state.courses,
    authors: state.authors,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePages);
