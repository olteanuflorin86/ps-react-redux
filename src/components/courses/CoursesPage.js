import React from 'react';
import {connect} from 'react-redux';
import {createCourse} from '../../actions/courseActions';
import Proptypes from 'prop-types';
import {bindActionCreators} from 'redux';

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: {
        title: ""
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //this.setState({[event.target.name]: event.target.value});
    const course = {...this.state.course, title: event.target.value};
    //this.setState({ course: course });
    this.setState({ course });
    //console.log(course);
  }

  handleSubmit(event) {
    event.preventDefault();
    //debugger;
    //this.props.dispatch(createCourse(this.state.course));
    this.props.createCourse(this.state.course);
    console.log(this.state.course.title);
  }

  render() {
    return(
      <div>
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input 
          type="text"
          onChange={this.handleChange}
          //onChange={this.handleChange.bind(this)}
          value={this.state.course.title}
        />
        <input type="submit" value="Submit" />
      </form>
      {this.props.courses.map((course, index) => {
        return(
          <div key={index}>{course.title}</div>
        )
      })}
      </div>
    )
  }
}

CoursesPage.proptypes = {
  courses: Proptypes.array.isRequired,
  createCourse: Proptypes.func.isRequired
}

// function mapDispatchToProps(dispatch) {
//   return {
//     createCourse: course => dispatch(createCourse(course))
//   };
// }

function mapDispatchToProps(dispatch) {
  return {
    createCourse: bindActionCreators(createCourse, dispatch)
  }
}

function mapStateToProps(state) {
  //debugger;
  return {
    courses: state.courses,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);