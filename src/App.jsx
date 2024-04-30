import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AOS from "aos";
import "aos/dist/aos.css";
import Cookies from "js-cookie";
import axios from "./config/axiosConfig";
import AuthProvider from "./hooks/AuthProvider";
import Auctions from "./Pages/Auctions";
import AuctionDetail from "./Pages/AuctionDetail";
import Profile from "./Pages/Profile";
import NotificationPage from "./Pages/NotificationPage";
import SellerDashboardOverview from "./Pages/SellerDashbordOverview";
import Seller from "./Components/ui/Seller";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken") || null;
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
  });

  return (
    <div className="font-inter">
      <AuthProvider>
        <Router>
          <Routes>
              <Route path="" element={<LandingPage />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="products" element={<Auctions />} />
              <Route path="products/:id" element={<AuctionDetail />} />
              <Route path="profile" element={<Profile />} />
              <Route path="notifications" element={<NotificationPage />} />
              <Route path="seller" element={<Seller />}>
                <Route path="dashboard" element={<SellerDashboardOverview />} />
              </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
