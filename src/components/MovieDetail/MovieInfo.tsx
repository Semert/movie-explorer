import React from "react";
import { Typography, Box } from "@mui/material";
import { MovieDetailResponse } from "../../api/types";
import styles from "./MovieDetail.module.scss";

interface MovieInfoProps {
  movie: MovieDetailResponse;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
  const infoFields = [
    {
      label: "Director",
      value: movie.Director,
      condition: movie.Director !== "N/A",
    },
    {
      label: "Writers",
      value: movie.Writer,
      condition: movie.Writer !== "N/A",
    },
    { label: "Actors", value: movie.Actors, condition: movie.Actors !== "N/A" },
    {
      label: "Language",
      value: movie.Language,
      condition: movie.Language !== "N/A",
    },
    {
      label: "Country",
      value: movie.Country,
      condition: movie.Country !== "N/A",
    },
    { label: "Awards", value: movie.Awards, condition: movie.Awards !== "N/A" },
    {
      label: "Box Office",
      value: movie.BoxOffice,
      condition: movie.BoxOffice && movie.BoxOffice !== "N/A",
    },
    {
      label: "Production",
      value: movie.Production,
      condition: movie.Production && movie.Production !== "N/A",
    },
    {
      label: "Released",
      value: movie.Released,
      condition: movie.Released !== "N/A",
    },
  ];

  return (
    <Box
      className={styles.infoGrid}
      sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
    >
      {infoFields.map(
        (field) =>
          field.condition && (
            <Box
              key={field.label}
              sx={{
                width: { xs: "100%", sm: "calc(50% - 8px)" },
              }}
            >
              <Box className={styles.infoItem}>
                <Typography variant="subtitle2" className={styles.infoLabel}>
                  {field.label}:
                </Typography>
                <Typography variant="body2" className={styles.infoValue}>
                  {field.value}
                </Typography>
              </Box>
            </Box>
          )
      )}
      {movie.Ratings && movie.Ratings.length > 0 && (
        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle2" className={styles.infoLabel}>
            Ratings:
          </Typography>
          {movie.Ratings.map((rating) => (
            <Box key={rating.Source} className={styles.ratingItem}>
              <Typography variant="body2" className={styles.ratingSource}>
                {rating.Source}:
              </Typography>
              <Typography variant="body2" className={styles.ratingValue}>
                {rating.Value}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MovieInfo;
