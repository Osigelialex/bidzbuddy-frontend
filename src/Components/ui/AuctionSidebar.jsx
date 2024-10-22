import { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import CircularProgress from "@mui/material/CircularProgress";
import Slider from '@mui/material/Slider';
import Skeleton from '@mui/material/Skeleton';

const AuctionSidebar = ({ changeCategory, changeMinimumBid, changeCondition }) => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const skeletons = Array(12).fill(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/v1/categories");
      setCategories(response.data);
      setLoading(false);
    }

    fetchData();
  });

  return (
    <div className="sm:col-span-3 border lg:flex hidden justify-start p-3 max-h-fit">
      {loading ? (
        <div className="flex flex-col gap-3">
          {skeletons.map((_, index) => (
            <Skeleton
              key={index}
              width={260}
              height={50}
              variant="rectangular"
              className="container"
            />
          ))}
        </div>
      ) : (
        <div>
          <h1 className="text-xl font-bold font-poppins">Categories</h1>
          <ul className="my-5">
            <li
              className="text-gray-500 hover:border-l-4 hover:border-purple-500 w-full px-3 py-3 cursor-pointer"
              onClick={() => changeCategory("all", "All")}
            >
              All Products
            </li>
            {categories.map((category) => (
              <li 
                key={category.id}
                className="text-gray-500 hover:border-l-4 hover:border-purple-500 w-full px-3 py-3 cursor-pointer"
                onClick={() => changeCategory(category.id, category.name)}
              >
                {category.name}
              </li>
            ))}
          </ul>
          <h1 className="text-xl mb-5 font-bold font-poppins">Minimum Bid</h1>

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
          <p className="text-gray-500 text-sm">5,000 - 10,000,000</p>
          <h1 className="text-xl mb-5 font-bold font-poppins mt-5">Condition</h1>
          <select
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => changeCondition(e.target.value)}
          >
            <option value="" defaultValue={true}>All Conditions</option>
            <option value="NEW">New</option>
            <option value="USED">Used</option>
          </select>
        </div>
      )}
    </div>
  );
}
 
export default AuctionSidebar;