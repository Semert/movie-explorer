import { ActionTypes } from "../types";
import { Movie, MovieDetailResponse } from "../../api/types";

// Search Movies
export const searchMovies = () => ({
  type: ActionTypes.SEARCH_MOVIES,
});

export const searchMoviesSuccess = (movies: Movie[], totalResults: number) => ({
  type: ActionTypes.SEARCH_MOVIES_SUCCESS,
  payload: { movies, totalResults },
});

export const searchMoviesFailure = (error: string) => ({
  type: ActionTypes.SEARCH_MOVIES_FAILURE,
  payload: { error },
});

// Search Filters
export const setSearchQuery = (query: string) => ({
  type: ActionTypes.SET_SEARCH_QUERY,
  payload: { query },
});

export const setSearchType = (
  mediaType: "movie" | "series" | "episode" | ""
) => ({
  type: ActionTypes.SET_SEARCH_TYPE,
  payload: { mediaType },
});

export const setSearchYear = (year: string) => ({
  type: ActionTypes.SET_SEARCH_YEAR,
  payload: { year },
});

export const setCurrentPage = (page: number) => ({
  type: ActionTypes.SET_CURRENT_PAGE,
  payload: { page },
});

// Movie Details
export const fetchMovieDetails = (imdbID: string) => ({
  type: ActionTypes.FETCH_MOVIE_DETAILS,
  payload: { imdbID },
});

export const fetchMovieDetailsSuccess = (movie: MovieDetailResponse) => ({
  type: ActionTypes.FETCH_MOVIE_DETAILS_SUCCESS,
  payload: { movie },
});

export const fetchMovieDetailsFailure = (error: string) => ({
  type: ActionTypes.FETCH_MOVIE_DETAILS_FAILURE,
  payload: { error },
});

export const clearSelectedMovie = () => ({
  type: ActionTypes.CLEAR_SELECTED_MOVIE,
});
