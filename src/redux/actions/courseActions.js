import * as courseApi from "../../api/courseApi";

export function createCourse(course) {
  return { type: "CREATE_COURSE", course };
}

export function loadCoursesSuccess(courses) {
  return { type: "LOAD_COURSES_SUCCESS", courses };
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
