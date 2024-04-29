import ClientCard from "../atom/ClientCard";

const Clients = () => {
  return (
    <section
      data-aos="fade-up"
      data-aos-once="true"
      data-aos-anchor-placement="top-center"
      data-aos-easing="ease-in-sine"
      className="py-16 bg-gray-50"
    >
      <div className="px-5 text-justify sm:text-center">
        <h1 className="text-2xl font-bold sm:text-4xl">What Clients Say</h1>
        {/* <p className="mx-auto mt-5 text-lg text-slate-600 sm:w-2/4">
          We are very proud of the service we provide and stand by every product
          we carry. Read our testimonials from our happy customers.
        </p> */}
      </div>

      <div className="grid gap-4 p-3 sm:mx-16 sm:grid-cols-3">
        <ClientCard
          text="Bidz Buddy's online bidding system made finding my dream home a breeze! Easy to use, transparent bids - highly recommend!"
          name="John S"
          position="BUYER"
        />
        <ClientCard
          text="Hesitant about online auctions? Don't be! Bidz Buddy exposed our listing, got a bidding war, and sold for top dollar. Fast, effective - thanks!"
          name="Lisa M"
          position="SELLER"
        />
        <ClientCard
          text="Bidz Buddy provides real-time transparency for my clients. Trustworthy platform for both buyers and sellers!"
          name="John Doe"
          position="CEO, Company"
        />
      </div>
    </section>
  );
};

export default Clients;
