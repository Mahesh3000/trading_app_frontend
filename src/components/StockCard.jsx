import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const StockCard = ({ stock }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {stock.symbol} - {stock.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StockCard;
