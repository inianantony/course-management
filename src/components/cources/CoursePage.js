import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
  componentDidMount() {
    this.props.loadCourses().catch((error) => {
      alert(`Loading cources failed ${error}`);
    });

    this.props.loadAuthors().catch((error) => {
      alert(`Loading cources failed ${error}`);
    });
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
  };
}

const mapActionToProps = { loadCourses, loadAuthors };

export default connect(mapStateToProps, mapActionToProps)(CoursesPage);
