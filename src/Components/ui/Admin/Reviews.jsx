import { useEffect, useState } from "react";
import axios from "../../../config/axiosConfig";
import { CircularProgress } from "@mui/material";
import ReviewCard from "../../atom/ReviewCard";

const Reviews = () => {

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(reviews);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get("/api/v1/reviews");
      setReviews(response.data);
      setLoading(false);
    }

    fetchReviews();
  }, []);

  return (
    <div className="pb-10 font-poppins">
      <div className="flex flex-col bg-white p-3 mx-1 align-middle">
        <h1 className="text-lg font-semibold flex items-center align-middle gap-3">
          <p>Reviews</p>
        </h1>
        <div className="text-xs flex items-center gap-3 align-middle text-gray-500">
          <p>{new Date().toJSON().slice(0, 10)}</p>
        </div>
      </div>
      {loading ? (
        <div className="grid place-items-center align-middle min-h-screen">
          <CircularProgress />
        </div>
      ) : (!loading && reviews.length === 0) ? (
        <div className="grid place-items-center min-h-screen">
          <div>
            <img loading="lazy" src="/no-bids-found.gif" alt="No reviews yet" className="mx-auto" />
            <h1 className="text-center mt-10 text-2xl font-semibold">No reviews yet</h1>
          </div>
        </div>
      ) : (
        <div className="m-5">
          {reviews.map((review, key) => (
            <ReviewCard
              key={key}
              username={review.userUsername}
              timestamp={review.reviewedAt}
              stars={review.stars}
              content={review.content}
            />
          ))}
        </div>
      )
      }
    </div>
  );
}

export default Reviews;
