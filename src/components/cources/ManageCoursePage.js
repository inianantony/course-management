import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

function ManageCoursesPage(props) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
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

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((previoudCourse) => ({
      ...previoudCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    props.saveCourse(course).then(() => {
      props.history.push("/courses");
    });
  }

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={props.authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

ManageCoursesPage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors,
  };
}

const mapDispatchToProps = { loadCourses, loadAuthors, saveCourse };

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);
