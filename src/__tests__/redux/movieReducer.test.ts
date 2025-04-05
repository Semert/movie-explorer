import movieReducer from "../../redux/reducers/movieReducer";
import { ActionTypes, MoviesState } from "../../redux/types";

describe("Movie Reducer", () => {
  const initialState: MoviesState = {
    searchResults: [],
    totalResults: 0,
    currentPage: 1,
    loading: false,
    error: null,
    selectedMovie: null,
    searchQuery: "Pokemon",
    searchType: "",
    searchYear: "",
  };

  test("should return the initial state", () => {
    expect(movieReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  test("should handle SEARCH_MOVIES", () => {
    const newState = movieReducer(initialState, {
      type: ActionTypes.SEARCH_MOVIES,
    });

    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  test("should handle SEARCH_MOVIES_SUCCESS", () => {
    const movies = [
      {
        imdbID: "tt1",
        Title: "Test Movie 1",
        Year: "2021",
        Type: "movie",
        Poster: "url1",
      },
      {
        imdbID: "tt2",
        Title: "Test Movie 2",
        Year: "2022",
        Type: "movie",
        Poster: "url2",
      },
    ];

    const newState = movieReducer(initialState, {
      type: ActionTypes.SEARCH_MOVIES_SUCCESS,
      payload: { movies, totalResults: 2 },
    });

    expect(newState.loading).toBe(false);
    expect(newState.searchResults).toEqual(movies);
    expect(newState.totalResults).toBe(2);
    expect(newState.error).toBe(null);
  });

  test("should handle SEARCH_MOVIES_FAILURE", () => {
    const newState = movieReducer(initialState, {
      type: ActionTypes.SEARCH_MOVIES_FAILURE,
      payload: { error: "API Error" },
    });

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe("API Error");
    expect(newState.searchResults).toEqual([]);
  });

  test("should handle SET_SEARCH_QUERY", () => {
    const newState = movieReducer(initialState, {
      type: ActionTypes.SET_SEARCH_QUERY,
      payload: { query: "Star Wars" },
    });

    expect(newState.searchQuery).toBe("Star Wars");
    expect(newState.currentPage).toBe(1); // Should reset to page 1
  });

  test("should handle SET_SEARCH_TYPE", () => {
    const newState = movieReducer(initialState, {
      type: ActionTypes.SET_SEARCH_TYPE,
      payload: { mediaType: "movie" },
    });

    expect(newState.searchType).toBe("movie");
    expect(newState.currentPage).toBe(1); // Should reset to page 1
  });

  test("should handle SET_SEARCH_YEAR", () => {
    const newState = movieReducer(initialState, {
      type: ActionTypes.SET_SEARCH_YEAR,
      payload: { year: "2021" },
    });

    expect(newState.searchYear).toBe("2021");
    expect(newState.currentPage).toBe(1); // Should reset to page 1
  });

  test("should handle SET_CURRENT_PAGE", () => {
    const newState = movieReducer(initialState, {
      type: ActionTypes.SET_CURRENT_PAGE,
      payload: { page: 3 },
    });

    expect(newState.currentPage).toBe(3);
  });
});
