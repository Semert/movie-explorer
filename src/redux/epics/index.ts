import { combineEpics } from "redux-observable";
import { searchMoviesEpic, fetchMovieDetailsEpic } from "./movieEpics";

export const rootEpic = combineEpics(searchMoviesEpic, fetchMovieDetailsEpic);
