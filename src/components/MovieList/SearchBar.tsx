import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, searchMovies } from "../../redux/actions/movieActions";
import { selectSearchQuery } from "../../redux/selectors/movieSelectors";
import useDebounce from "../../hooks/useDebounce";
import styles from "./MovieList.module.scss";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const currentQuery = useSelector(selectSearchQuery);
  const [query, setQuery] = useState(currentQuery);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery !== currentQuery) {
      dispatch(setSearchQuery(debouncedQuery));
      dispatch(searchMovies());
    }
  }, [debouncedQuery, currentQuery, dispatch]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Paper elevation={2} className={styles.searchBarContainer}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for movies..."
        value={query}
        onChange={handleQueryChange}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        className={styles.searchInput}
      />
    </Paper>
  );
};

export default SearchBar;
