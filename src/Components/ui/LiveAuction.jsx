import ProductCard2 from "../atom/ProductCard2";
import Skeleton from "@mui/material/Skeleton";
import axios from "../../config/axiosConfig";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

import { useEffect, useState } from "react";

const LiveAuction = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const skeletons = Array(6).fill(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/products/unprotected");
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

    fetchData();
  }, []);

  return (
    <section
      id="Products"
      className="sm:mx-8 sm:p-8 sm:pt-16"
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
      data-aos-easing="ease-in-sine"
      data-aos-duration="600"
      data-aos-once="true"
    >
      <div className="mt-5 mb-10 px-5 sm:text-center">
        <h1 className="text-xl font-bold font-saira sm:text-4xl">Current Auctions</h1>
      </div>

      {(!loading && products.length === 0) && (
        <div className="grid place-items-center my-7 text-gray-500">
          <img src="/not_found.jpeg" className="w-100 h-100" />
        </div>
      )}

      <div className="grid gap-4 px-5 sm:grid-cols-3">
        {loading
          ? skeletons.map((_, idx) => (
              <Skeleton
                key={idx}
                variant="rectangular"
                width={300}
                height={300}
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
                condition={product.condition}
              />
            ))}
      </div>
    </section>
  );
};

export default LiveAuction;
