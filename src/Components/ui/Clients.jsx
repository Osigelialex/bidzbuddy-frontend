import ClientCard from "../atom/ClientCard";

const Clients = () => {
  return (
    <section className="py-10">
      <div className="px-5 text-justify sm:text-center">
        <h1 className="text-xl font-bold sm:text-3xl">Our Happy Clients</h1>
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
