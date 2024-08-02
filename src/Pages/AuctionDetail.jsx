import { useParams } from "react-router";
import Banner from "../Components/ui/Banner";
import { useState, useEffect } from "react";
import axios from "../config/axiosConfig";
import ProductInfo from "../Components/ui/ProductInfo";
import BiddingList from "../Components/atom/BiddingList";
import { useAuth } from "../hooks/AuthProvider";
import Navbar from "../Components/ui/Navbar";
import Congratulations from "../Components/atom/Congratulations";

const AuctionDetail = () => {
  const [product, setProduct] = useState({});
  const [biddingList, setBiddingList] = useState([]);
  const [winner, setWinner] = useState(false);
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

  const userIsWinner = () => {
    if (!auth.user) return false;
    const winner = biddingList.find((bid) => bid.isWinningBid);
    if (!winner) return false;
    return winner.bidderUsername == auth.user.username;
  }

  useEffect(() => {
    const isWinner = userIsWinner();
    setWinner(isWinner);
  }, [biddingList, auth.user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await axios.get(`/api/v1/products/${id}`);
        const biddingList = await axios.get(`/api/v1/bids/list/${id}`);
        setBiddingList(biddingList.data);
        setProduct(products.data);
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
          {winner && (
            <Congratulations
              username={auth.user.username.toUpperCase()}
              productName={product.name}
              productImage={product.productImageUrl}
            />
          )}

          <ProductInfo
            id={product.id}
            name={product.name}
            image={product.productImageUrl}
            description={product.description}
            currentBid={product.currentBid}
            remainingTime={product.remainingTime}
            closed={product.biddingClosed}
            handleRefresh={handleRefresh}
            condition={product.condition}
            winner={winner}
            paid={product.paid}
          />

          {auth.user ? (
            <BiddingList biddingList={biddingList} />
          ) : (
            <div className="mx-auto mb-7 grid place-items-center gap-3 text-gray-600">
              <img loading="lazy" src="/login-first.gif" alt="login first" className="w-52" />
              <p className="font-poppins text-lg">
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
