import React from "react";
import { Box, CircularProgress, Skeleton } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        gap: 2,
      }}
    >
      <CircularProgress size={50} />
      <Skeleton variant="text" width={200} height={30} />
      <Skeleton variant="rectangular" width="80%" height={200} />
    </Box>
  );
};

export default LoadingScreen;
