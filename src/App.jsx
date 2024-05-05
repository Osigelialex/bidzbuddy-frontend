import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AOS from "aos";
import "aos/dist/aos.css";
import AuthProvider from "./hooks/AuthProvider";
import Auctions from "./Pages/Auctions";
import AuctionDetail from "./Pages/AuctionDetail";
import PrivateRoute from "./Auth/PrivateRoute";
import NotificationPage from "./Pages/NotificationPage";
import Layout from "./Components/ui/Layout";
import MyBids from "./Components/ui/MyBids";
import Overview from "./Components/ui/Overview";
import { useEffect } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index path="" element={<LandingPage />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="products" element={<Auctions />} />
      <Route path="products/:id" element={<AuctionDetail />} />
      <Route element={<PrivateRoute />}>
        <Route path="notifications" element={<NotificationPage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="account/*" element={<Layout />}>
          <Route path="overview" element={<Overview />} />
          <Route path="my-bids" element={<MyBids />} />
        </Route>
      </Route>
    </Route>
  )
)

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="font-inter">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
