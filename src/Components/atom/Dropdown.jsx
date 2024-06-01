import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../../hooks/AuthProvider";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

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
        className="flex items-center gap-1 align-middle cursor-pointer"
      >
        <p>{title}</p>
        <ArrowDropDownIcon size={20} />
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
        {auth.user.role !== "ADMIN" && <MenuItem onClick={() => navigate("/account/overview")}>Dashboard</MenuItem>}
        {auth.user.role === "ADMIN" && <MenuItem onClick={() => navigate("/admin/dashboard")}>Admin Dashboard</MenuItem>}
        <MenuItem onClick={logout} style={{ color: "purple", fontWeight: "500" }}>
          <CiLogout size={20} className="mr-2" />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
