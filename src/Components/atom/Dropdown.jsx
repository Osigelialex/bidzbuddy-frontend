import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../../hooks/AuthProvider";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function BasicMenu({ title, role }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const auth = useAuth();
  const navigate = useNavigate();
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <div>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ color: "black" }}
        className="flex items-center gap-3 align-middle cursor-pointer"
      >
        <MdOutlineAccountCircle size={20} />
        <p>{title}</p>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => navigate("/profile")}>My account</MenuItem>
        <MenuItem onClick={logout} style={{ color: "purple" }}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
