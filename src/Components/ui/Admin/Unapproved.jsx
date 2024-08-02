import { useEffect, useState } from "react";
import axios from "../../../config/axiosConfig";
import { CircularProgress } from "@mui/material";
import UnapprovedProductsList from "../../atom/UnapprovedProductsList";

const UnapprovedList = () => {

  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleRefresh = () => {
    setRefresh(prev => !prev);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/api/v1/products/unapproved");
      setProducts(response.data);
      setLoading(false);
    }

    fetchProducts();
  }, [refresh]);

  return (
    <div className="pb-10 font-poppins">
      <div className="flex flex-col justify-between bg-white p-3 mx-1 align-middle">
        <div className="flex gap-2 items-center align-middle text-md font-semibold">
          <p>Unapproved Products</p>
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
          <UnapprovedProductsList handleRefresh={handleRefresh} data={products} />
        )}
      </div>
    </div>
  );
}

export default UnapprovedList;