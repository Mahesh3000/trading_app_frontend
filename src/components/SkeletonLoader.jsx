import React from "react";
import { Skeleton, Box } from "@mui/material";

const SkeletonLoader = ({
  height = 40,
  width = "100%",
  variant = "rectangular",
  count = 1,
}) => {
  return (
    <Box>
      {[...Array(count)].map((_, index) => (
        <Skeleton
          key={index}
          variant={variant}
          width={width}
          height={height}
          sx={{ marginBottom: "10px" }}
        />
      ))}
    </Box>
  );
};

export default SkeletonLoader;
