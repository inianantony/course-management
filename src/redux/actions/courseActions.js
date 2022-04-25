import * as courseApi from "../../api/courseApi";

export function loadCoursesSuccess(courses) {
  return { type: "LOAD_COURSES_SUCCESS", courses };
}

export function createCoursesSuccess(course) {
  return { type: "CREATE_COURSE_SUCCESS", course };
}

export function updateCoursesSuccess(course) {
  return { type: "UPDATE_COURSE_SUCCESS", course };
}

export function loadCourses() {
  return (dispatch) => {
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  return (dispatch) => {
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.Id
          ? dispatch(updateCoursesSuccess(savedCourse))
          : dispatch(createCoursesSuccess(savedCourse));
      })
      .catch((error) => {
        throw error;
      });
  };
}
