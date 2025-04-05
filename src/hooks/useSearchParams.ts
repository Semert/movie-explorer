import { useEffect } from "react";
import { useSearchParams as useRouterSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  setSearchType,
  setSearchYear,
  setCurrentPage,
  searchMovies,
} from "../redux/actions/movieActions";
import {
  selectSearchQuery,
  selectSearchType,
  selectSearchYear,
  selectCurrentPage,
} from "../redux/selectors/movieSelectors";

// I might use this to get all search query to the URL and use directly from URL
export const useSearchParams = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useRouterSearchParams();

  // Get values from Redux state
  const query = useSelector(selectSearchQuery);
  const type = useSelector(selectSearchType);
  const year = useSelector(selectSearchYear);
  const page = useSelector(selectCurrentPage);

  // When component mounts, read URL params and update Redux state
  useEffect(() => {
    // Read URL parameters
    const queryParam = searchParams.get("query") || "";
    const typeParam = searchParams.get("type") || "";
    const yearParam = searchParams.get("year") || "";
    const pageParam = searchParams.get("page") || "1";

    // Only update Redux if values from URL are different
    if (queryParam !== query) {
      dispatch(setSearchQuery(queryParam || "Pokemon")); // Fallback to 'Pokemon' if empty
    }

    if (typeParam !== type) {
      dispatch(setSearchType(typeParam as "" | "movie" | "series" | "episode"));
    }

    if (yearParam !== year) {
      dispatch(setSearchYear(yearParam));
    }

    if (parseInt(pageParam, 10) !== page) {
      dispatch(setCurrentPage(parseInt(pageParam, 10)));
    }

    // Trigger search after params are set
    dispatch(searchMovies());
  }, [searchParams, dispatch]);

  // Update URL params when Redux state changes
  useEffect(() => {
    const params: { [key: string]: string } = {};

    // Only add params to URL if they have values
    if (query && query !== "Pokemon") {
      params.query = query;
    }

    if (type) {
      params.type = type;
    }

    if (year) {
      params.year = year;
    }

    if (page !== 1) {
      params.page = page.toString();
    }

    // Update the URL
    setSearchParams(params, { replace: true });
  }, [query, type, year, page, setSearchParams]);

  return {
    setQueryParam: (value: string) => {
      dispatch(setSearchQuery(value || "Pokemon"));
      //   dispatch(searchMovies());
    },
    setTypeParam: (value: "" | "movie" | "series" | "episode") => {
      dispatch(setSearchType(value));
      //   dispatch(searchMovies());
    },
    setYearParam: (value: string) => {
      dispatch(setSearchYear(value));
      //   dispatch(searchMovies());
    },
    setPageParam: (value: number) => {
      dispatch(setCurrentPage(value));
      //   dispatch(searchMovies());
    },
  };
};
