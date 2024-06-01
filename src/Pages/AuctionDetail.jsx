import { useParams } from "react-router";
import Banner from "../Components/ui/Banner";
import { useState, useEffect } from "react";
import axios from "../config/axiosConfig";
import ProductInfo from "../Components/ui/ProductInfo";
import BiddingList from "../Components/atom/BiddingList";
import { useAuth } from "../hooks/AuthProvider";
import Navbar from "../Components/ui/Navbar";

const AuctionDetail = () => {
  const [product, setProduct] = useState({});
  const [biddingList, setBiddingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();
  const auth = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await axios.get(`/api/v1/products/${id}`);
        const biddingList = await axios.get(`/api/v1/bids/list/${id}`);

        setProduct(products.data);
        setBiddingList(biddingList.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, refresh]);

  return (
    <div>
      {loading ? (
        <></>
      ) : (
        <>
        <Navbar />
        <Banner title="Auction Details" />
        <ProductInfo
          id={product.id}
          name={product.name}
          image={product.productImageUrl}
          description={product.description}
          currentBid={product.currentBid}
          remainingTime={product.remainingTime}
          closed={product.biddingClosed}
          handleRefresh={handleRefresh}
        />
        {auth.user ? (
          <BiddingList biddingList={biddingList} />
        ) : (
          <div className="mx-auto mb-7 grid place-items-center gap-3 text-gray-600">
            <img src="/login-first.gif" alt="login first" className="w-52" />
            <p className="font-saira text-lg">
              Bidding History is only available after login
            </p>
          </div>
        )}
        </>
      )}
    </div>
  );
};

export default AuctionDetail;
