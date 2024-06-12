import { BsFillSendFill } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";

const Footer = () => {
  return (
    <section className="bg-black text-white">
      <div className="mx-5 grid gap-8 py-10 sm:mx-20 lg:grid-cols-4">
        <div className="mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 align-middle">
            <RiAuctionFill size={30} className="text-purple-500" />
            <h1 className="text-2xl font-extrabold text-slate-300">
              BidzBuddy
            </h1>
          </div>
          <p className="text-slate-400">
            Join our community of passionate bidders today and embark on your
            journey to new discoveries and unbeatable deals. Bid, win, and
            thrive with BidzBuddy.
          </p>
        </div>
        <div className="flex flex-col gap-5 text-left">
          <h1 className="text-2xl font-bold text-slate-300">Navigation</h1>
          <div className="mt-5 flex flex-col gap-5 text-slate-400">
            <a href="/products">All Products</a>
            <a href="#">How it works</a>
            <a href="/signup">Sign up</a>
            <a href="#">About Company</a>
          </div>
        </div>
        <div className="flex flex-col gap-5 text-left">
          <h1 className="text-2xl font-bold text-slate-300">Help & FAQS</h1>
          <div className="mt-5 flex flex-col gap-5 text-slate-400">
            <a href="#">Help Center</a>
            <a href="#">Customer FAQs</a>
            <a href="#">Terms and Conditions</a>
            <a href="#">Security Information</a>
            <a href="#">Merchant add Policy</a>
          </div>
        </div>
        <div className="flex flex-col gap-5 text-left">
          <h1 className="text-2xl font-bold text-slate-300">Connect with us</h1>
          <div className="mt-5 flex gap-5">
            <FaTwitter
              size={25}
              className="cursor-pointer hover:text-violet-500"
            />
            <FaFacebook
              size={25}
              className="cursor-pointer hover:text-violet-500"
            />
            <FaInstagram
              size={25}
              className="cursor-pointer hover:text-violet-500"
            />
            <FaLinkedin
              size={25}
              className="cursor-pointer hover:text-violet-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
