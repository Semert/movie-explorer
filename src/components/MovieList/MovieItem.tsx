import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Movie } from "../../api/types";
import styles from "./MovieList.module.scss";
import NoImage from "../MovieDetail/NoImage";

interface MovieItemProps {
  movie: Movie;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  const posterUrl =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "/placeholder-movie-poster.png";

  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <Link to={`/movie/${movie.imdbID}`} className={styles.movieLink}>
      <Card
        elevation={3}
        className={styles.movieCard}
        sx={{
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          borderRadius: 2,
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: 6,
          },
        }}
      >
        {hasPoster ? (
          <CardMedia
            component="img"
            height="320"
            image={posterUrl}
            alt={movie.Title}
            sx={{ objectFit: "cover" }}
          />
        ) : (
          <NoImage title={movie.Title} />
        )}

        <CardContent>
          <Tooltip title={movie.Title} placement="top" arrow>
            <Typography variant="subtitle1" fontWeight={600} noWrap>
              {movie.Title}
            </Typography>
          </Tooltip>
          <Box
            mt={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="text.secondary">
              {movie.Year}
            </Typography>
            <Chip
              label={movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}
              size="small"
              color={
                movie.Type === "movie"
                  ? "primary"
                  : movie.Type === "series"
                    ? "secondary"
                    : "default"
              }
              sx={{ marginLeft: 1 }} // Optional: Adds some space between the year and genre chip
            />
          </Box>
          <Typography variant="caption" color="text.disabled">
            IMDb: {movie.imdbID}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieItem;
