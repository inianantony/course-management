import * as authorApi from "../../api/authorApi";

export function loadAuthorsSuccess(authors) {
  return { type: "LOAD_AUTHORS_SUCCESS", authors };
}

export function loadAuthors() {
  return (dispatch) => {
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        throw error;
      });
  };
}
