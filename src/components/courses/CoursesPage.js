import React from 'react';
import {connect} from 'react-redux';
import {loadCourses} from '../../actions/courseActions';
import {loadAuthors} from '../../actions/authorActions';
import Proptypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom';

import CourseList from './CourseList';
import Spinner from '../common/Spinner';
import { deleteCourse } from '../../api/courseApi';
import { toast } from 'react-toastify';

class CoursesPage extends React.Component {
  // Maybe instead of a constructor we can add a class field like bellow:
  // state = {
  //   redirectToAddCoursePage: false
  // };
  // but I get an error: " Support for the experimental syntax 'classProperties' isn't currently enabled"
  // so for now I'll still use a constructor

  constructor(props) {
    super(props);

    this.state = {
      redirectToAddCoursePage: false
    }
  }

  componentDidMount() {

    // we can use destructure:
    //const {courses, authors} = this.props;

    // So we will not load again data that we already have
    if(this.props.courses.length === 0) {
      this.props.loadCourses()
        .catch(error => {
          alert("Loading courses failed " + error);
        })
    }

    if(this.props.authors.length === 0) {
      this.props.loadAuthors()
        .catch(error => {
          alert("Loading authors failed " + error);
        })
    }
  }

  async handleDeleteCourse(course) {
    toast.success('Course deleted');
    try {
      //console.log(course);
      await deleteCourse(course.id);
    } catch(error) {
        toast.error("Delete failed. " + error.message, { autoClose: false});
    }
  }

  render() {
    return(
      <div>
        <h2>Courses</h2>
        {this.props.loading ?
          <Spinner /> : (
          <>
            {/* One way of Redirect with React-Router: */}
            {/* we will add now also add redirectToAddCoursePage to state*/}
            
            {this.state.redirectToAddCoursePage && <Redirect to='/course' />}        
            <button 
              style={{marginBottom: 20}}
              className="btn btn-primary add-course"
              onClick={() => this.setState({redirectToAddCoursePage: true})}
            >
              Add Course
            </button>

            <CourseList courses={this.props.courses} authors={this.props.authors} onDeleteClick={this.handleDeleteCourse}/>
          </>
          )
        }
      </div>
    )
  }
}

CoursesPage.proptypes = {
  courses: Proptypes.array.isRequired,
  authors: Proptypes.array.isRequired,
  //createCourse: Proptypes.func.isRequired,
  loadCourses: Proptypes.func.isRequired,
  loadAuthors: Proptypes.func.isRequired,
  loading: Proptypes.bool.isRequired,
}


//  function mapDispatchToProps(dispatch) {
//    return {
//      createCourse: course => dispatch(createCourse(course))
//    };
//  }
 

function mapDispatchToProps(dispatch) {
  return {
    //createCourse: bindActionCreators(createCourse, dispatch),
    loadCourses: bindActionCreators(loadCourses, dispatch),
    loadAuthors: bindActionCreators(loadAuthors, dispatch),
    deleteCourse: bindActionCreators(deleteCourse, dispatch),
  }
}

function mapStateToProps(state) {
  //debugger;
  return {
    courses: state.courses,
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);