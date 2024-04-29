import Header from "../Components/ui/Header";
import LiveAuction from "../Components/ui/LiveAuction";
import Clients from "../Components/ui/Clients";
import Sponsor from "../Components/ui/Sponsor";
import Footer from "../Components/ui/Footer";
import { useEffect } from "react";

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="font-roboto min-h-screen">
      <Header />
      <LiveAuction />
      <Clients />
      <Sponsor />
      <Footer />
    </div>
  );
};

export default LandingPage;
