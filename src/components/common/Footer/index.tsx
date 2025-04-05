import React from "react";
import { Container, Typography, Box } from "@mui/material";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <Box component="footer" className={styles.footer}>
      <Container>
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Mert Efe
        </Typography>
        <Typography variant="body2" align="center">
          Powered by OMDb API
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
