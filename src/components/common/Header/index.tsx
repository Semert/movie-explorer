// Header.tsx
import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <AppBar position="static" className={styles.header}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            className={styles.logo}
          >
            Mert Efe
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
