import { ActionTypes, MoviesState } from "../types";

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

const movieReducer = (state = initialState, action: any): MoviesState => {
  switch (action.type) {
    case ActionTypes.SEARCH_MOVIES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionTypes.SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResults: action.payload.movies,
        totalResults: Number(action.payload.totalResults),
        error: null,
      };
    case ActionTypes.SEARCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        searchResults: [],
      };
    case ActionTypes.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload.query,
        currentPage: 1, // Reset to first page on new search
      };
    case ActionTypes.SET_SEARCH_TYPE:
      return {
        ...state,
        searchType: action.payload.mediaType,
        currentPage: 1, // Reset to first page on filter change
      };
    case ActionTypes.SET_SEARCH_YEAR:
      return {
        ...state,
        searchYear: action.payload.year,
        currentPage: 1, // Reset to first page on filter change
      };
    case ActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload.page,
      };
    case ActionTypes.FETCH_MOVIE_DETAILS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionTypes.FETCH_MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedMovie: action.payload.movie,
        error: null,
      };
    case ActionTypes.FETCH_MOVIE_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case ActionTypes.CLEAR_SELECTED_MOVIE:
      return {
        ...state,
        selectedMovie: null,
      };
    default:
      return state;
  }
};

export default movieReducer;
