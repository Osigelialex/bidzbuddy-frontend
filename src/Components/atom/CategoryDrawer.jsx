import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import FilterListIcon from '@mui/icons-material/FilterList';
import Slider from '@mui/material/Slider';
import axios from "../../config/axiosConfig";

import { useState, useEffect } from "react";

export default function CategoryDrawer({ changeCategory, changeMinimumBid, changeCondition }) {
  const [open, setOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/v1/categories");
      setCategories(response.data);
      setLoading(false);
    }

    fetchData();
  });

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem
          onClick={() => {
            changeCategory("all", "All");
            toggleDrawer(false);
          }}
          disablePadding
        >
          <ListItemButton>
            <ListItemText primary="All Products" />
          </ListItemButton>
        </ListItem>
        {categories.map((category) => (
          <ListItem
            key={category.id}
            onClick={() => {
              changeCategory(category.id, category.name);
              toggleDrawer(false);
            }}
            disablePadding
          >
            <ListItemButton>
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <div className="p-4">
          <h1 className="text-xl mb-5 font-bold font-saira">Minimum Bid</h1>
          <Slider
            defaultValue={5000}
            getAriaValueText={(value) => `₦${value}`}
            step={5000}
            min={5000}
            max={10000000}
            onChange={(e) => setTimeout(changeMinimumBid(e.target.value), 2000)}
            color="secondary"
            valueLabelDisplay="on"
          />
          <p className="text-gray-500">5,000 - 10,000,000</p>
          <h1 className="text-xl mb-5 font-bold font-saira mt-5">Condition</h1>
          <select
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => changeCondition(e.target.value)}
          >
            <option value="NEW">New</option>
            <option value="USED">Used</option>
          </select>
        </div>
      </List>
    </Box>
  );

  return (
    <div className="cursor-pointer lg:hidden">
      <FilterListIcon size={25} onClick={toggleDrawer(true)} />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
