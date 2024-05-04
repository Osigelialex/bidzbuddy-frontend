const Hero = () => {
  return (
    <>
      <div className="justify-between text-center bg-purple-100 lg:text-left gap-10 px-5 pb-6 pt-16 sm:px-16 sm:pb-16 sm:pt-14 lg:grid lg:grid-cols-2">
        <div className="p-5">
          <p
            data-aos="fade-down"
            data-aos-easing="ease-in-sine"
            data-aos-duration="900"
            data-aos-once="true"
            className="mb-5 sm:text-2xl font-bold text-purple-600"
          >
            Welcome to BidzBuddy
          </p>
          <h2
            data-aos="fade-down"
            data-aos-anchor-placement="top-center"
            data-aos-easing="ease-in-sine"
            data-aos-duration="900"
            data-aos-once="true"
            className="mb-4 text-4xl font-extrabold sm:text-7xl"
          >
            Bid smart, Elevate your experience.
          </h2>
          <p
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-once="true"
            className="mx-auto mt-5 sm:text-lg text-md text-slate-600"
          >
            Join our community of passionate bidders today and embark on your
            journey to new discoveries and unbeatable deals. Bid, win, and
            thrive with BidzBuddy.
          </p>
          <button
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
            className="mt-6 bg-purple-600 px-9 py-4 font-bold text-white shadow-lg"
          >
            START EXPLORING
          </button>
        </div>
        <div className="relative hidden min-h-full lg:block">
          <img
            src="/bidding-image.avif"
            className="relative h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
