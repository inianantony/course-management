import initState from "./initialState";

export default function courseReducer(state = initState.courses, action) {
  switch (action.type) {
    case "CREATE_COURSE":
      return [...state, { ...action.course }];
    case "LOAD_COURSES_SUCCESS":
      return action.courses;
    default:
      return state;
  }
}
