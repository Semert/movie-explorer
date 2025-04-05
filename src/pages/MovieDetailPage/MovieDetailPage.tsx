import React from "react";
import MovieDetail from "../../components/MovieDetail";
import styles from "./MovieDetailPage.module.scss";

const MovieDetailPage: React.FC = () => {
  return (
    <div className={styles.movieDetailPage}>
      <MovieDetail />
    </div>
  );
};

export default MovieDetailPage;
