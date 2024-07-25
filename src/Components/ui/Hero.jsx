import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-20 px-5 pt-16 pb-8 sm:px-16 sm:pt-14 sm:pb-16 lg:grid lg:grid-cols-2 gap-10">
      <div className="flex flex-col justify-center text-center lg:text-left lg:justify-between sm:p-5 p-2">
        <p className="mb-3 text-lg font-bold text-purple-600 sm:text-xl">
          Welcome to BidzBuddy
        </p>
        <h2 className="mb-4 text-3xl font-extrabold leading-tight sm:text-7xl">
          Bid smart, Elevate your experience.
        </h2>
        <p className="mt-4 text-sm text-slate-600 sm:text-base">
          Join our community of passionate bidders today and embark on your
          journey to new discoveries and unbeatable deals. Bid, win, and thrive
          with BidzBuddy.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="mt-6 bg-purple-600 px-8 py-3 font-bold text-white shadow-lg rounded-md sm:w-60 w-full"
        >
          START EXPLORING
        </button>
      </div>
      <div className="flex justify-center items-center lg:justify-end mt-8 lg:mt-0">
        <img
          src="/bidding-image.avif"
          className="w-full h-full sm:w-64 sm:h-64 lg:w-[30rem] lg:h-[30rem] object-cover sm:rounded-full"
          alt="Bidding"
        />
      </div>
    </div>
  );
};

export default Hero;
