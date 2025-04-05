import React from "react";
import MovieIcon from "@mui/icons-material/Movie";
import Typography from "@mui/material/Typography";
import styles from "./MovieDetail.module.scss";

type NoImageProps = {
  title?: string;
};

const NoImage: React.FC<NoImageProps> = ({ title }) => {
  return (
    <div className={styles.placeholderPoster}>
      <MovieIcon style={{ fontSize: 80, opacity: 0.6 }} />
      <Typography variant="body2" align="center" color="textSecondary">
        {title}
      </Typography>
    </div>
  );
};

export default NoImage;
