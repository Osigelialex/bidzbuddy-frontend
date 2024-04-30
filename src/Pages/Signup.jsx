import SignupForm from "../Components/form/SignupForm";
import Footer from "../Components/ui/Footer";
import { useEffect } from "react";
import Banner from "../Components/ui/Banner";
import Navbar from "../Components/ui/Navbar";

const Signup = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen bg-[#f5f5f6]">
      <Navbar />
      <Banner title={"Signup"} />
      <div className="grid place-items-center sm:p-10 sm:my-10">
        <SignupForm />
      </div>
      <Footer />
    </section>
  );
};

export default Signup;
