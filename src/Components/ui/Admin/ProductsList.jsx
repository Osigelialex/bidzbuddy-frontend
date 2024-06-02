import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useEffect, useState } from "react";
import axios from "../../../config/axiosConfig";
import { CircularProgress } from "@mui/material";
import AdminProductsList from "../../atom/AdminProductsList";
import { AiOutlineProduct } from "react-icons/ai";

const ProductsList = () => {

  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleRefresh = () => {
    setRefresh(prev => !prev);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/api/v1/products/dashboard");
      setProducts(response.data);
      setLoading(false);
    }

    fetchProducts();
  }, [refresh]);

  return (
    <div className="pb-10">
      <div className="flex items-center justify-between bg-white p-3 mx-1 align-middle">
        <div className="flex gap-2 items-center align-middle text-lg">
          <AiOutlineProduct />
          <p>Products</p>
        </div>
        <div className="text-sm flex items-center gap-3 align-middle text-gray-500">
          <CalendarMonthIcon />
          <p>{new Date().toJSON().slice(0, 10)}</p>
        </div>
      </div>
      <div className="my-8 mx-2 overflow-x-scroll">
        {loading ? (
          <div className="min-h-screen grid place-items-center">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <AdminProductsList handleRefresh={handleRefresh} data={products} />
        )}
      </div>
    </div>
  );
}

export default ProductsList;