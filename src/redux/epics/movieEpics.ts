import { Epic, ofType } from "redux-observable";
import { of, from, Observable } from "rxjs";
import { mergeMap, map, catchError, withLatestFrom } from "rxjs/operators";
import { ActionTypes } from "../types";
import omdbApi from "../../api/omdbApi";
import {
  searchMoviesSuccess,
  searchMoviesFailure,
  fetchMovieDetailsSuccess,
  fetchMovieDetailsFailure,
} from "../actions/movieActions";
import { RootState } from "../reducers";

export const searchMoviesEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(
      ActionTypes.SEARCH_MOVIES,
      ActionTypes.SET_SEARCH_QUERY,
      ActionTypes.SET_SEARCH_TYPE,
      ActionTypes.SET_SEARCH_YEAR,
      ActionTypes.SET_CURRENT_PAGE
    ),
    withLatestFrom(state$ as unknown as Observable<RootState>),
    mergeMap(([action, state]) => {
      const { searchQuery, searchType, searchYear, currentPage } = state.movies;

      // Check if searchYear is valid (4 digits) or an empty string
      const yearValue = searchYear?.trim(); // Get the trimmed search year
      const isValidYear = yearValue.length === 4 || yearValue === "";

      const params = {
        s: searchQuery || "Pokemon",
        page: currentPage || 1,
        type: searchType || undefined,
        ...(isValidYear ? { y: yearValue } : {}),
      };

      // Handle empty search query
      if (searchQuery.trim().length === 0) {
        // Return to default "Pokemon" search
        return from(omdbApi.searchMovies(params)).pipe(
          map((response) => {
            if (response.Response === "True") {
              return searchMoviesSuccess(
                response.Search,
                parseInt(response.totalResults, 10)
              );
            } else {
              return searchMoviesFailure(response.Error || "No results found");
            }
          }),
          catchError((error) => of(searchMoviesFailure(error.message)))
        );
      }

      // Check if search query is just a single letter - don't make API call
      if (searchQuery.trim().length < 3) {
        return of(
          searchMoviesFailure("Please enter at least 3 characters to search.")
        );
      }
      return from(omdbApi.searchMovies(params)).pipe(
        map((response) => {
          if (response.Response === "True") {
            return searchMoviesSuccess(
              response.Search,
              parseInt(response.totalResults, 10)
            );
          } else {
            return searchMoviesFailure(response.Error || "No results found");
          }
        }),
        catchError((error) => of(searchMoviesFailure(error.message)))
      );
    })
  );

export const fetchMovieDetailsEpic: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.FETCH_MOVIE_DETAILS),
    mergeMap((action: any) =>
      from(omdbApi.getMovieDetails(action.payload.imdbID)).pipe(
        map((response) => {
          if (response.Response === "True") {
            return fetchMovieDetailsSuccess(response);
          } else {
            return fetchMovieDetailsFailure(
              response.Error || "Failed to fetch movie details"
            );
          }
        }),
        catchError((error) => of(fetchMovieDetailsFailure(error.message)))
      )
    )
  );
