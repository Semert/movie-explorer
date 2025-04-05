import React from "react";
import { Container } from "@mui/material";
import MovieList from "../../components/MovieList";
import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <Container>
        <MovieList />
      </Container>
    </div>
  );
};

export default HomePage;
