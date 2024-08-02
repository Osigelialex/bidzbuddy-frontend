import RemainingTime from "./RemainingTime";

const ProductCard = ({ name, minimumBid, imageUrl, remainingTime }) => {
  return (
    <>
      <div
        data-aos="fade-in"
        data-aos-offset="10"
        data-aos-easing="ease-in-sine"
        data-aos-duration="2000"
        data-aos-once="true"
        className="mx-auto flex min-h-[28rem] w-80 cursor-pointer flex-col gap-3 rounded-bl-3xl rounded-tr-3xl border bg-white p-5 shadow-sm sm:max-h-96 sm:w-full"
      >
        <div className="flex flex-col text-center">
          <h2 className="text-sm">Time Remaining</h2>
          <p className="text-xl font-extrabold text-gray-500">
            <RemainingTime milliseconds={remainingTime} />
          </p>
        </div>
        <div className="max-h-52 min-h-52 overflow-hidden rounded-bl-xl rounded-tr-xl shadow-sm">
          <img
            loading="lazy"
            src={imageUrl}
            className="ease h-full w-full bg-no-repeat object-cover transition duration-500 hover:scale-125"
          />
        </div>
        <div className="m-0 flex flex-col justify-between gap-2">
          <h1 className="truncate text-xl font-medium">{name}</h1>
          <p className="text-md text-gray-500">
            Current Bid:{" "}
            <span className="text-lg font-bold text-black">₦{minimumBid}</span>
          </p>
          <button className="w-28 border bg-purple-600 px-2 py-1 text-white hover:border-purple-600 hover:bg-white hover:text-purple-600 font-bold">
            Place a Bid
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
