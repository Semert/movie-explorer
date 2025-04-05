import { Movie, MovieDetailResponse } from "../../api/types";

export interface MoviesState {
  searchResults: Movie[];
  totalResults: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  selectedMovie: MovieDetailResponse | null;
  searchQuery: string;
  searchType: "movie" | "series" | "episode" | "";
  searchYear: string;
}

export enum ActionTypes {
  SEARCH_MOVIES = "SEARCH_MOVIES",
  SEARCH_MOVIES_SUCCESS = "SEARCH_MOVIES_SUCCESS",
  SEARCH_MOVIES_FAILURE = "SEARCH_MOVIES_FAILURE",
  SET_SEARCH_QUERY = "SET_SEARCH_QUERY",
  SET_SEARCH_TYPE = "SET_SEARCH_TYPE",
  SET_SEARCH_YEAR = "SET_SEARCH_YEAR",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  FETCH_MOVIE_DETAILS = "FETCH_MOVIE_DETAILS",
  FETCH_MOVIE_DETAILS_SUCCESS = "FETCH_MOVIE_DETAILS_SUCCESS",
  FETCH_MOVIE_DETAILS_FAILURE = "FETCH_MOVIE_DETAILS_FAILURE",
  CLEAR_SELECTED_MOVIE = "CLEAR_SELECTED_MOVIE",
}
