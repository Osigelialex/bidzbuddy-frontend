import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import axios from "../../config/axiosConfig";
import ProductCard2 from "../atom/ProductCard2";
import { FiSearch } from "react-icons/fi";
import Pagination from "@mui/material/Pagination";
import AuctionSidebar from "./AuctionSidebar";
import CategoryDrawer from "../atom/CategoryDrawer";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [minimumBid, setMinimumBid] = useState(500000);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const skeletons = Array(6).fill(null);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const changeMinimumBid = (newMinimum) => {
    setMinimumBid(newMinimum);
  }

  const changeCategory = (category) => {
    setCategory(category);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/products");

        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if (error.resposne) {
          console.error(error.response.data);
        } else if (error.request) {
          console.error(error.request);
        }
      }
    };

    const handleSearch = async () => {
      const response = await axios.get(
        `/api/v1/products/search?productName=${query}`,
      );
      const responseProducts = response.data;
      const filteredProducts = products.filter((product) => {
        return responseProducts.some(
          (responseProduct) => responseProduct.id === product.id,
        );
      });
      setProducts(filteredProducts);
    };

    if (query) {
      handleSearch();
    } else {
      fetchData();
    }
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(category, minimumBid);
      let response;

      try {
        if (category === "all") {
          response = await axios.get(`/api/v1/products?minimumBid=${minimumBid}`);
        } else if (category !== "all") {
          response = await axios.get(`/api/v1/products?categoryId=${category}&minimumBid=${minimumBid}`);
        } else {
          response = await axios.get('/api/v1/products');
        }
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [minimumBid, category]);

  return (
    <section className="px-3 py-8 sm:px-10 sm:py-12 grid sm:grid-cols-12 gap-3">
      <CategoryDrawer changeCategory={changeCategory} changeMinimumBid={changeMinimumBid} />
      <AuctionSidebar changeCategory={changeCategory} changeMinimumBid={changeMinimumBid} />
      <div className="col-span-9">
        <div className="flex sm:justify-between gap-5 align-middle mb-10">
          <form
            className="flex w-full gap-3 rounded-md border border-gray-300 p-2 sm:w-1/3"
            onSubmit={(e) => e.preventDefault()}
          >
            <FiSearch className="self-center" />
            <input
              type="search"
              placeholder="Search a item or product"
              className="w-full outline-none"
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>
        {!loading && products.length === 0 ? (
          <div className="min-h-90 grid place-items-center text-gray-600">
            <img src="/not_found.jpeg" alt="not found" className="w-80" />
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-3">
            {loading
              ? skeletons.map((_, idx) => (
                <Skeleton
                  key={idx}
                  variant="rectangular"
                  width={300}
                  height={300}
                  className="container"
                />
              ))
              : products.map((product, idx) => (
                <ProductCard2
                  key={idx}
                  id={product.id}
                  name={product.name}
                  minimumBid={product.minimumBid}
                  imageUrl={product.productImageUrl}
                  remainingTime={product.remainingTime}
                />
              ))}
          </div>
        )}

        {products.length > 0 && (
          <div className="my-10 grid place-items-center">
            <Pagination count={3} page={page} onChange={handleChange} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
