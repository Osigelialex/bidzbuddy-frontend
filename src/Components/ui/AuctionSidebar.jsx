import { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import CircularProgress from "@mui/material/CircularProgress";

const AuctionSidebar = ({ changeCategory }) => {

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

  return (
    <div className="sm:col-span-3 border lg:flex hidden justify-start p-3">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <h1 className="text-xl font-bold font-saira">Categories</h1>
          <ul className="mt-5">
            {categories.map((category) => (
              <li 
                key={category.id}
                className="text-gray-500 hover:bg-purple-400 hover:text-white w-full px-3 py-3 cursor-pointer rounded-md"
                onClick={() => changeCategory(category.id)}
              >
                {category.name}
              </li>
            ))}
          </ul>
          <hr className="my-5" />
          <h1 className="text-xl mb-5 font-bold font-saira">Minimum Bid</h1>
          <input 
            type="number"
            className="w-full border border-gray-300 rounded-md p-2"
            min={5000}
            step={5000}
            max={10000000}
          />
          <hr className="my-5" />
          <h1 className="text-xl mb-5 font-bold font-saira">Condition</h1>
          <select className="w-full border border-gray-300 rounded-md p-2">
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
        </div>
      )}
    </div>
  );
}
 
export default AuctionSidebar;