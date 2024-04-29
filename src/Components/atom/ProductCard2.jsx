import RemainingTime from "./RemainingTime";
import { useNavigate } from "react-router-dom";

const ProductCard2 = ({ id, name, minimumBid, imageUrl, remainingTime }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        data-aos="fade-in"
        data-aos-offset="10"
        data-aos-easing="ease-in-sine"
        data-aos-duration="1000"
        data-aos-once="true"
        className="container mx-auto flex max-h-fit cursor-pointer flex-col gap-3 border bg-white shadow-sm"
        onClick={() => navigate(`/products/${id}`)}
      >
        <div className="grid place-items-center bg-gray-700 text-center text-white min-h-10">
          <RemainingTime milliseconds={remainingTime} size={21} />
        </div>
        <div className="p-5">
          <div className="max-h-48 min-h-40 overflow-hidden rounded-bl-xl rounded-tr-xl shadow-sm sm:max-h-52 sm:min-h-52">
            <img
              src={imageUrl}
              className="ease h-full w-full bg-no-repeat object-cover transition duration-500 hover:scale-125"
            />
          </div>
          <div className="m-0 flex flex-col justify-between gap-2">
            <h1 className="line-clamp-1 text-xl font-medium">{name}</h1>
            <p className="text-md text-gray-500">
              Current Bid:{" "}
              <span className="text-lg font-medium text-black">
                ₦{minimumBid}
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
