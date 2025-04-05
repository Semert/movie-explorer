import React from "react";
import { Pagination as MuiPagination, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, searchMovies } from "../../redux/actions/movieActions";
import {
  selectCurrentPage,
  selectTotalResults,
} from "../../redux/selectors/movieSelectors";
import styles from "./MovieList.module.scss";

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const totalResults = useSelector(selectTotalResults);

  // Calculate total pages (10 items per page)
  const totalPages = Math.ceil(totalResults / 10);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    dispatch(setCurrentPage(page));
    dispatch(searchMovies());

    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (totalPages <= 1) return null;

  return (
    <Box className={styles.paginationContainer}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default Pagination;
