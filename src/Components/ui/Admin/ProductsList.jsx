import { useEffect, useState } from "react";
import axios from "../../../config/axiosConfig";
import { CircularProgress } from "@mui/material";
import AdminProductsList from "../../atom/AdminProductsList";

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
      <div className="flex flex-col justify-between bg-white p-3 mx-1 align-middle">
        <div className="flex gap-2 items-center align-middle text-md font-semibold">
          <p>Products</p>
        </div>
        <div className="text-xs flex items-center gap-3 align-middle text-gray-500">
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