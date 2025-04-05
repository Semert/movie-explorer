import * as actions from "../../redux/actions/movieActions";
import { ActionTypes } from "../../redux/types";

describe("Movie Actions", () => {
  test("should create an action to search movies", () => {
    const expectedAction = {
      type: ActionTypes.SEARCH_MOVIES,
    };
    expect(actions.searchMovies()).toEqual(expectedAction);
  });

  test("should create an action for search movies success", () => {
    const movies = [
      {
        imdbID: "tt1",
        Title: "Test Movie 1",
        Year: "2021",
        Type: "movie",
        Poster: "url1",
      },
    ];
    const expectedAction = {
      type: ActionTypes.SEARCH_MOVIES_SUCCESS,
      payload: { movies, totalResults: 10 },
    };
    expect(actions.searchMoviesSuccess(movies, 10)).toEqual(expectedAction);
  });

  test("should create an action for search movies failure", () => {
    const error = "API Error";
    const expectedAction = {
      type: ActionTypes.SEARCH_MOVIES_FAILURE,
      payload: { error },
    };
    expect(actions.searchMoviesFailure(error)).toEqual(expectedAction);
  });

  test("should create an action to set search query", () => {
    const query = "Star Wars";
    const expectedAction = {
      type: ActionTypes.SET_SEARCH_QUERY,
      payload: { query },
    };
    expect(actions.setSearchQuery(query)).toEqual(expectedAction);
  });

  test("should create an action to set search type", () => {
    const mediaType = "movie";
    const expectedAction = {
      type: ActionTypes.SET_SEARCH_TYPE,
      payload: { mediaType },
    };
    expect(actions.setSearchType(mediaType)).toEqual(expectedAction);
  });

  test("should create an action to set search year", () => {
    const year = "2021";
    const expectedAction = {
      type: ActionTypes.SET_SEARCH_YEAR,
      payload: { year },
    };
    expect(actions.setSearchYear(year)).toEqual(expectedAction);
  });

  test("should create an action to set current page", () => {
    const page = 3;
    const expectedAction = {
      type: ActionTypes.SET_CURRENT_PAGE,
      payload: { page },
    };
    expect(actions.setCurrentPage(page)).toEqual(expectedAction);
  });
});
