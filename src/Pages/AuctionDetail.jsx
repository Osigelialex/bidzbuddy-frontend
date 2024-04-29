import { useParams } from "react-router";
import Banner from "../Components/ui/Banner";
import { useState, useEffect } from "react";
import axios from "../config/axiosConfig";
import ProductInfo from "../Components/ui/ProductInfo";
import BiddingList from "../Components/atom/BiddingList";
import { useAuth } from "../hooks/AuthProvider"
import { CiLock } from "react-icons/ci";

const AuctionDetail = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const auth = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <Banner title="Auction Details" />
      <ProductInfo
        id={product.id}
        name={product.name}
        image={product.productImageUrl}
        description={product.description}
        currentBid={product.currentBid}
        remainingTime={product.remainingTime}
        closed={product.biddingClosed}
      />
      {auth.user ? (<BiddingList productId={product.id} />) : (
        <div className="grid place-items-center gap-3 mx-auto text-gray-400">
          <CiLock size={70} />
          <p className="text-lg">Please login to view bidding list</p>
        </div>
      )}
    </div>
  );
};

export default AuctionDetail;
