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
import MyProducts from "./Components/ui/MyProducts";
import NewProduct from "./Pages/NewProduct";
import { useEffect } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AdminLayout from "./Components/ui/Admin/AdminLayout";
import AdminRoute from "./Auth/AdminRoute";
import Dashboard from "./Components/ui/Admin/Dashboard";
import ProductsList from "./Components/ui/Admin/ProductsList";
import UsersList from "./Components/ui/Admin/UsersList";
import CategoriesList from "./Components/ui/Admin/CategoryList";
import UnapprovedList from "./Components/ui/Admin/Unapproved";
import { Toaster } from "sonner";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index path="" element={<LandingPage />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="products" element={<Auctions />} />
      <Route path="products/:id" element={<AuctionDetail />} />
      <Route element={<PrivateRoute />}>
        <Route path="new-product" element={<NewProduct />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="notifications" element={<NotificationPage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="account/*" element={<Layout />}>
          <Route path="overview" element={<Overview />} />
          <Route path="my-bids" element={<MyBids />} />
          <Route path="my-products" element={<MyProducts />} />
        </Route>
      </Route>
      <Route element={<AdminRoute />}>
        <Route path="admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="users" element={<UsersList />} />
          <Route path="categories" element={<CategoriesList />} />
          <Route path="unapproved" element={<UnapprovedList />} />
        </Route>
      </Route>
    </Route>,
  ),
);

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="font-inter">
      <Toaster
        richColors
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "0.9rem",
            fontWeight: "bold"
          }
        }}
      />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
