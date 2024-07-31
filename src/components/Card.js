import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const CrimeCard = ({ title, count, change }) => {
  return (
    <Card sx={{ width: "90%" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography sx={{ fontSize: 14 }} color="textSecondary" gutterBottom>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div">
          {count}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="textSecondary">
          {change}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default CrimeCard;
