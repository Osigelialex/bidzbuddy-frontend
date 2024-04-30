import LoginForm from "../Components/form/loginForm";
import Footer from "../Components/ui/Footer";
import { useEffect } from "react";
import Banner from "../Components/ui/Banner";
import Navbar from "../Components/ui/Navbar";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen bg-[#f5f5f6]">
      <Navbar />
      <Banner title={"Login"} />
      <div className="grid place-items-center sm:p-10 my-10">
        <LoginForm />
      </div>
      <Footer />
    </section>
  );
};

export default Login;
