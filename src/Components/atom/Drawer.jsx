import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <Link to="/">
          <ListItem key="Home" disablePadding>
            <ListItemButton>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/products">
          <ListItem key="Auctions" disablePadding>
            <ListItemButton>
              <ListItemText primary="Auctions" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/how-it-works">
          <ListItem key="About us" disablePadding>
            <ListItemButton>
              <ListItemText primary="How it works" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/contact-us">
          <ListItem key="Contact" disablePadding>
            <ListItemButton>
              <ListItemText primary="Contact" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/account/overview">
          <ListItem key="Profile" disablePadding>
            <ListItemButton>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/login">
          <ListItem key="Login" disablePadding>
            <ListItemButton>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <div className="cursor-pointer lg:hidden">
      <RxHamburgerMenu size={25} onClick={toggleDrawer(true)} />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
