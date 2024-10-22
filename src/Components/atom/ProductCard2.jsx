import RemainingTime from "./RemainingTime";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

const ProductCard2 = ({
  id,
  name,
  minimumBid,
  imageUrl,
  remainingTime,
  condition,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        data-aos="fade-in"
        data-aos-offset="10"
        data-aos-easing="ease-in-sine"
        data-aos-duration="500"
        data-aos-once="true"
        className="container relative mx-auto flex max-h-fit cursor-pointer flex-col gap-3 border bg-white shadow-sm"
        onClick={() => navigate(`/products/${id}`)}
      >
        <div className="grid min-h-10 place-items-center bg-gray-700 text-center text-white">
          <RemainingTime milliseconds={remainingTime} size={21} />
        </div>
        <div className="p-5">
          <div
            className={
              "absolute right-0 top-20 z-30 p-1 text-sm text-white" +
              (condition.toLowerCase() === "new"
                ? " bg-purple-500"
                : " bg-purple-400")
            }
          >
            {condition.toLowerCase() === "new" ? "New" : "Used"}
          </div>
          <div className="grid max-h-60 min-h-60 place-items-center overflow-hidden rounded-bl-xl rounded-tr-xl shadow-sm sm:max-h-60 sm:min-h-60">
            <img
              loading="lazy"
              src={imageUrl}
              className="ease bg-no-repeat object-contain transition duration-500 hover:scale-125"
              alt="Image"
            />
          </div>
          <div className="m-0 flex flex-col justify-between gap-2 py-5">
            <h1 className="line-clamp-1 font-medium">{name}</h1>
            <p className="text-gray-500">
              Current Bid:{" "}
              <span className="font-medium text-black">
                ₦{formatCurrency(minimumBid)}
              </span>
            </p>
            <button className="border border-purple-600 px-2 py-1 text-purple-600 hover:border-purple-600 hover:bg-purple-600 hover:text-white">
              Place a Bid
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard2;
