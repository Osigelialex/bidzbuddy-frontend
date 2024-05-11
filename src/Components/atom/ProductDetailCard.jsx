import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import RemainingTime from "./RemainingTime";
import { CardActionArea } from "@mui/material";

export default function ProductDetailCard({ image, title, remainingTime }) {
  return (
    <Card sx={{ maxWidth: 500, minWidth: 500 }} elevation={0}>
      <CardActionArea>
        <div className="grid place-items-center bg-gray-950 text-white">
          <RemainingTime milliseconds={remainingTime} />
        </div>
        <CardMedia component="img" height="140" image={image} alt={title} />
      </CardActionArea>
    </Card>
  );
}
