// Updated FilterPanel.tsx
import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Chip,
  Typography,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchType,
  setSearchYear,
  searchMovies,
} from "../../redux/actions/movieActions";
import {
  selectSearchType,
  selectSearchYear,
} from "../../redux/selectors/movieSelectors";
import styles from "./MovieList.module.scss";

const FilterPanel: React.FC = () => {
  const dispatch = useDispatch();
  const currentType = useSelector(selectSearchType);
  const currentYear = useSelector(selectSearchYear);

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    dispatch(
      setSearchType(event.target.value as "movie" | "series" | "episode" | "")
    );
    dispatch(searchMovies());
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Only accept 4-digit years or empty string
    const yearValue = event.target.value;
    if (yearValue === "" || /^\d{0,4}$/.test(yearValue)) {
      dispatch(setSearchYear(yearValue));
      if (yearValue.length === 4 || yearValue === "") {
        dispatch(searchMovies());
      }
    }
  };

  const clearType = () => {
    dispatch(setSearchType(""));
    dispatch(searchMovies());
  };

  const clearYear = () => {
    dispatch(setSearchYear(""));
    dispatch(searchMovies());
  };

  const getTypeLabel = () => {
    switch (currentType) {
      case "movie":
        return "Movies";
      case "series":
        return "TV Series";
      case "episode":
        return "Episodes";
      default:
        return "All Types";
    }
  };

  return (
    <Box className={styles.filterPanelContainer}>
      <Box display="flex" alignItems="center" mb={2}>
        <FilterAltIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6">Filters</Typography>
      </Box>

      <Box className={styles.filterControls}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="type-select-label">Type</InputLabel>
          <Select
            labelId="type-select-label"
            value={currentType}
            onChange={handleTypeChange}
            label="Type"
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="movie">Movies</MenuItem>
            <MenuItem value="series">TV Series</MenuItem>
            <MenuItem value="episode">Episodes</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Year"
          variant="outlined"
          placeholder="e.g., 2022"
          value={currentYear}
          onChange={handleYearChange}
          inputProps={{
            maxLength: 4,
            pattern: "\\d*",
          }}
        />
      </Box>

      {/* Active filters */}
      {(currentType || currentYear) && (
        <Box mt={2}>
          <Typography variant="subtitle2" gutterBottom>
            Active Filters:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {currentType && (
              <Chip
                label={`Type: ${getTypeLabel()}`}
                onDelete={clearType}
                color="primary"
                variant="outlined"
              />
            )}
            {currentYear && (
              <Chip
                label={`Year: ${currentYear}`}
                onDelete={clearYear}
                color="primary"
                variant="outlined"
              />
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default FilterPanel;
