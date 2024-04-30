import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router";
import Account from "../Components/ui/Account";
import { useEffect } from "react";
import Navbar from "../Components/ui/Navbar";

const Profile = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!auth.user) {
      navigate("/products");
    }
  });

  return (
    <>
      <Navbar />
      <Account />
    </>
  );
}
 
export default Profile;