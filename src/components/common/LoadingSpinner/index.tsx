// src/components/common/LoadingSpinner/LoadingSpinner.tsx
import React from "react";
import { CircularProgress, Box } from "@mui/material";
import styles from "./LoadingSpinner.module.scss";

interface LoadingSpinnerProps {
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 40 }) => {
  return (
    <Box className={styles.spinnerContainer} data-testid="loading-spinner">
      <CircularProgress size={size} />
    </Box>
  );
};

export default LoadingSpinner;
