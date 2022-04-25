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
    else setCourse({ ...props.course });

    if (props.authors.length === 0)
      props.loadAuthors().catch((error) => {
        alert(`Loading cources failed ${error}`);
      });
  }, [props.course]);

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
  history: PropTypes.object.isRequired,
};

export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors,
  };
}

const mapDispatchToProps = { loadCourses, loadAuthors, saveCourse };

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);
