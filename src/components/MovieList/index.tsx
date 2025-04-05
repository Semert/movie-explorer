import React, { useEffect } from "react";
import { Typography, Paper, Alert, Container, Box, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies } from "../../redux/actions/movieActions";
import {
  selectMovies,
  selectLoading,
  selectError,
  selectTotalResults,
  selectSearchQuery,
  selectSearchType,
  selectSearchYear,
} from "../../redux/selectors/movieSelectors";
import MovieItem from "./MovieItem";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import Pagination from "./Pagination";
import LoadingSpinner from "../common/LoadingSpinner";
import styles from "./MovieList.module.scss";
import { getResultsSummary } from "../../utils/helpers";

const MovieList: React.FC = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const totalResults = useSelector(selectTotalResults);
  const searchQuery = useSelector(selectSearchQuery);
  const searchType = useSelector(selectSearchType);
  const searchYear = useSelector(selectSearchYear);

  useEffect(() => {
    dispatch(searchMovies());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" className={styles.movieListContainer}>
      <Box my={0} className={styles.headerSection}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          className={styles.pageTitle}
          sx={{
            fontWeight: 700,
            background:
              "linear-gradient(135deg, #3f51b5 20%, #5c6bc0 50%, #7986cb 80%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            mb: 4,
          }}
        >
          <MovieFilterIcon
            fontSize="large"
            className={styles.titleIcon}
            sx={{
              verticalAlign: "middle",
              mr: 1.5,
              animation: "pulse 2s infinite ease-in-out",
              "@keyframes pulse": {
                "0%": { opacity: 0.7, transform: "scale(1)" },
                "50%": { opacity: 1, transform: "scale(1.1)" },
                "100%": { opacity: 0.7, transform: "scale(1)" },
              },
            }}
          />
          Movie Explorer
        </Typography>
        <Box
          className={styles.searchBarWrapper}
          sx={{
            transform: "translateY(0)",
            opacity: 1,
            transition: "all 0.5s ease-in-out",
            animation: "fadeIn 0.8s ease-in-out",
            "@keyframes fadeIn": {
              "0%": { opacity: 0, transform: "translateY(20px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
            mb: 0,
          }}
        >
          <SearchBar />
        </Box>
      </Box>

      <Box
        mb={3}
        sx={{
          opacity: 1,
          transform: "translateY(0)",
          animation: "fadeInUp 0.8s ease-in-out",
          "@keyframes fadeInUp": {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <FilterPanel />
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" my={6}>
          <LoadingSpinner />
        </Box>
      ) : error ? (
        <Alert
          severity="error"
          className={styles.errorAlert}
          sx={{ my: 4, borderRadius: 2 }}
        >
          {error}
        </Alert>
      ) : (
        <>
          <Paper
            elevation={2}
            className={styles.resultsHeader}
            sx={{
              p: 2,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              backgroundColor: movies.length > 0 ? "#e3f2fd" : "#f5f5f5",
              opacity: 1,
              animation: "fadeInUp 0.6s ease-in-out",
              "@keyframes fadeInUp": {
                "0%": { opacity: 0, transform: "translateY(20px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            <SearchIcon
              sx={{
                mr: 1,
                color: movies.length > 0 ? "primary.main" : "text.secondary",
              }}
            />
            <Typography
              variant="subtitle1"
              color={movies.length > 0 ? "primary.main" : "text.secondary"}
              fontWeight={500}
            >
              {getResultsSummary(
                totalResults,
                searchQuery,
                searchType,
                searchYear
              )}
            </Typography>

            {movies.length > 0 && (
              <Box ml="auto" display="flex" gap={1}>
                {searchType && (
                  <Chip
                    label={
                      searchType.charAt(0).toUpperCase() + searchType.slice(1)
                    }
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
                {searchYear && (
                  <Chip
                    label={searchYear}
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                )}
              </Box>
            )}
          </Paper>

          {movies.length > 0 ? (
            <Box mt={3}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  margin: -1.5,
                }}
              >
                {movies.map((movie, index) => (
                  <Box
                    key={movie.imdbID}
                    sx={{
                      width: {
                        xs: "100%",
                        sm: "50%",
                        md: "25%",
                      },
                      padding: 1.5,
                      opacity: 1,
                      animation: `fadeIn 0.5s ease-in-out ${index * 0.05}s`,
                      "@keyframes fadeIn": {
                        from: { opacity: 0, transform: "translateY(20px)" },
                        to: { opacity: 1, transform: "translateY(0)" },
                      },
                    }}
                    className={styles.movieItemContainer}
                  >
                    <MovieItem movie={movie} />
                  </Box>
                ))}
              </Box>
            </Box>
          ) : (
            <Box
              my={6}
              py={4}
              textAlign="center"
              borderRadius={2}
              bgcolor="#f9f9f9"
            >
              <img
                src="/no-results.png"
                alt="No results"
                style={{
                  width: 120,
                  height: 120,
                  opacity: 0.6,
                  marginBottom: 16,
                }}
              />
              <Typography variant="h6" color="textSecondary">
                No movies found
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Try adjusting your search or filters
              </Typography>
            </Box>
          )}

          <Box my={4} display="flex" justifyContent="center">
            <Pagination />
          </Box>
        </>
      )}
    </Container>
  );
};

export default MovieList;
