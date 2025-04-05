import { RootState } from "../reducers";

export const selectMovies = (state: RootState) => state.movies.searchResults;
export const selectTotalResults = (state: RootState) =>
  state.movies.totalResults;
export const selectCurrentPage = (state: RootState) => state.movies.currentPage;
export const selectLoading = (state: RootState) => state.movies.loading;
export const selectError = (state: RootState) => state.movies.error;
export const selectSelectedMovie = (state: RootState) =>
  state.movies.selectedMovie;
export const selectSearchQuery = (state: RootState) => state.movies.searchQuery;
export const selectSearchType = (state: RootState) => state.movies.searchType;
export const selectSearchYear = (state: RootState) => state.movies.searchYear;
