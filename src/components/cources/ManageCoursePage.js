import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

function ManageCoursesPage(props) {
  const [course, setCourse] = useState({ ...props.course });
  useEffect(() => {
    if (props.courses.length === 0)
      props.loadCourses().catch((error) => {
        alert(`Loading cources failed ${error}`);
      });

    if (props.authors.length === 0)
      props.loadAuthors().catch((error) => {
        alert(`Loading cources failed ${error}`);
      });
  }, []);

  return (
    <>
      <h2>Manage Course</h2>
    </>
  );
}

ManageCoursesPage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors,
  };
}

const mapActionToProps = { loadCourses, loadAuthors };

export default connect(mapStateToProps, mapActionToProps)(ManageCoursesPage);
