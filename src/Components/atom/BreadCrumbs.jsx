import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

function handleClick(event) {
  event.preventDefault();
}

export default function BasicBreadcrumbs() {
  const path = window.location.pathname.slice(1);

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs
        aria-label="breadcrumb"
        style={{ color: "white", fontSize: 20 }}
      >
        <Link to="/">
          <p className="text-purple-300">home</p>
        </Link>
        <Typography style={{ fontSize: 20, color: "#efefef" }}>
          {path.startsWith("products/") ? "Auction Details" : path}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
