import TextareaAutosize from "@mui/material/TextareaAutosize";
import StarReview from "../atom/StarReview";
import { useState } from "react";
import axios from "../../config/axiosConfig";
import { toast } from "sonner";

const Review = () => {
  const [stars, setStars] = useState(1);
  const [content, setContent] = useState("");

  const updateStars = (value) => {
    setStars(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { stars, content };
    try {
      axios.post("/api/v1/reviews", payload);
      toast.success("Thanks for your review!");
      setContent("");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Please Check your internet connection and retry");
      } else {
        toast.error("Something went wrong. Please try again");
      }
    }
  }

  return (
    <div className="min-h-full max-w-full overflow-auto md:col-span-9">
      <div className="bg-white p-3">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <h1 className="font-saira text-lg">How has your experience with BidzBuddy been?</h1>
          <StarReview size={5} updateStars={updateStars} />
          <TextareaAutosize
            minRows={10}
            minLength={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-gray-100 w-full hover:ring-2 hover:ring-purple-500 outline-none p-3"
            required
          />
          <button className="bg-purple-500 text-white py-2 px-3 w-32">
            Add Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default Review;