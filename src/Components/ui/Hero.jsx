import { useNavigate } from "react-router-dom";

const Hero = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className="justify-between text-center lg:text-left gap-10 px-5 pb-6 pt-16 sm:px-16 sm:pb-16 sm:pt-14 lg:grid lg:grid-cols-2">
        <div className="sm:p-5 p-2">
          <p
            data-aos="fade-down"
            data-aos-easing="ease-in-sine"
            data-aos-duration="900"
            data-aos-once="true"
            className="mb-5 sm:text-md text-xl font-bold text-purple-600"
          >
            Welcome to BidzBuddy
          </p>
          <h2
            data-aos="fade-down"
            data-aos-anchor-placement="top-center"
            data-aos-easing="ease-in-sine"
            data-aos-duration="900"
            data-aos-once="true"
            className="mb-4 text-5xl font-extrabold sm:text-7xl"
          >
            Bid smart, Elevate your experience.
          </h2>
          <p
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-once="true"
            className="mx-auto mt-5 sm:text-lg text-sm text-slate-600"
          >
            Join our community of passionate bidders today and embark on your
            journey to new discoveries and unbeatable deals. Bid, win, and
            thrive with BidzBuddy.
          </p>
          <button
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
            onClick={() => navigate('/products')}
            className="mt-6 bg-purple-600 px-9 py-4 font-bold text-white shadow-lg"
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
