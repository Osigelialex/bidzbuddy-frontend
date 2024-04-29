import Footer from "../Components/ui/Footer";
import Banner from "../Components/ui/Banner";
import Products from "../Components/ui/Products";
import { useEffect } from "react";

const Auctions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-roboto min-h-screen">
      <Banner title="Place your bids" />
      <Products />
      <Footer />
    </div>
  );
};

export default Auctions;
