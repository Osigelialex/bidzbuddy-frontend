import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAuth } from "../../hooks/AuthProvider";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const auth = useAuth();

  return (
    <>
      <Badge
        badgeContent={auth.user ? auth.user.notifications.length : 0}
        color="secondary"
        className="cursor-pointer"
      >
        <NotificationsIcon
          color="action"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {auth.user.notifications.toReversed().map((notification) => (
            <Link to="/notifications" key={notification.id}>
              <MenuItem
                style={{ fontWeight: "bold" }}
              >{`${notification.message}`}</MenuItem>
            </Link>
          ))}
        </Menu>
      </Badge>
    </>
  );
};

export default Notification;
