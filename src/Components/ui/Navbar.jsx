import Drawer from "../atom/Drawer";
import { Link } from "react-router-dom";
import { RiAuctionFill } from "react-icons/ri";
import { MdOutlineAccountCircle } from "react-icons/md";
import BasicMenu from "../atom/Dropdown";
import { useAuth } from "../../hooks/AuthProvider";
import Notification from "../atom/Notification";

const Navbar = () => {
  const auth = useAuth();

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between bg-[#301934] text-white sm:text-black sm:bg-white px-10 py-2 align-middle sm:px-12">
        <Link to="/">
          <div className="flex cursor-pointer gap-2 text-lg font-bold sm:text-purple-500 text-white">
            <RiAuctionFill size={30} />
            <p className="text-lg sm:text-purple-500 text-white font-extrabold">Bidzbuddy</p>
          </div>
        </Link>

        <div>
          <ul className="hidden items-center gap-10 lg:flex">
            <li className="text-md font-medium">
              <Link to="/">Home</Link>
            </li>
            <li className="text-md cursor-pointer font-medium">
              <Link to="/products">Auctions</Link>
            </li>
            <li className="text-md cursor-pointer font-medium">
              <Link to="/how-it-works">How it works</Link>
            </li>
            <li className="text-md cursor-pointer font-medium">
              <Link to="/contact-us">Contact</Link>
            </li>

            {/* Account dropdown */}
            {auth.user ? (
              <BasicMenu
                title={` Hi, ${auth.user.username}`}
                role={auth.user.role}
              />
            ) : (
              <Link to="/login">
                <button className="hidden w-fit items-center gap-2 bg-purple-600 p-2 align-middle text-sm font-bold text-white shadow-md hover:bg-purple-700 md:flex">
                  <MdOutlineAccountCircle size={20} />
                  <p>My Account</p>
                </button>
              </Link>
            )}

            {/* NOTIFICATIONS */}
            {auth.user && <Notification />}
          </ul>
        </div>

        <Drawer />
      </nav>
    </>
  );
};

export default Navbar;
