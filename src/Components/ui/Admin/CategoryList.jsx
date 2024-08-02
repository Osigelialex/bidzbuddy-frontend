import { useEffect, useState } from "react";
import axios from "../../../config/axiosConfig";
import { CircularProgress } from "@mui/material";
import AdminCategoriesList from "../../atom/AdminCategoriesList";

const CategoryList = () => {

  const [categories, setCategories] = useState([]);
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
      const response = await axios.get("/api/v1/categories");
      setCategories(response.data);
      setLoading(false);
    }

    fetchProducts();
  }, [refresh]);

  return (
    <div className="pb-10 font-poppins">
      <div className="flex flex-col bg-white p-3 mx-1 align-middle">
        <h1 className="text-lg font-semibold flex items-center align-middle gap-3">
          <p>Categories</p>
        </h1>
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
          <AdminCategoriesList data={categories} handleRefresh={handleRefresh} />
        )}
      </div>
    </div>
  );
}

export default CategoryList;
