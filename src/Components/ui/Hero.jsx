import { useNavigate } from "react-router-dom";

const Hero = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className="justify-between text-center lg:text-left min-h-screen gap-10 px-5 pt-16 sm:px-16 sm:pb-16 sm:pt-14 lg:grid lg:grid-cols-2">
        <div className="sm:p-5 p-2 flex flex-col justify-between">
          <p className="mb-5 sm:text-md text-xl font-bold text-purple-600">
            Welcome to BidzBuddy
          </p>
          <h2 className="mb-4 text-[3.2rem] font-extrabold sm:text-7xl">
            Bid smart, Elevate your experience.
          </h2>
          <p className="mx-auto mt-5 text-md text-slate-600">
            Join our community of passionate bidders today and embark on your
            journey to new discoveries and unbeatable deals. Bid, win, and
            thrive with BidzBuddy.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="mt-6 bg-purple-600 px-9 py-4 font-bold text-white shadow-lg rounded-md sm:w-60 w-full"
          >
            START EXPLORING
          </button>
        </div>
        
          <img
            src="/bidding-image.avif"
            className="relative w-[30rem] h-[30rem] sm:block hidden object-cover rounded-full"
          />
      </div>
    </>
  );
};

export default Hero;
