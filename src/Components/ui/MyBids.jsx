import { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import MyBidsTable from "../atom/MyBidsList";
import Skeleton from "@mui/material/Skeleton";

const MyBids = () => {
  const [userBids, setUserBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const skeletons = Array(6).fill(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/bids");
        console.log(response.data);
        setUserBids(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex flex-col gap-3">
          {skeletons.map((item, index) => (
          <div>
            <Skeleton
            key={index}
            variant="rectangular"
            width={300}
            height={100}
          />
          </div>
        ))}
        </div>
      ) : (
        <div className="max-w-full overflow-auto md:col-span-9 min-h-full">
          <MyBidsTable mybids={userBids} />
        </div>
      )}
    </>
  );
}

export default MyBids;