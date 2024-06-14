import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../config/axiosConfig";
import { GoVerified } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/ui/Footer";
import Cookies from "js-cookie";

const EmailVerification = () => {
  const [verified, setVerified] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const handleResend = async () => {
    try {
      await axios.post(`/api/v1/auth/resend?email=${Cookies.get("email")}`);
      navigate("/link-sent");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`/api/v1/auth/verify?token=${token}`);
        setVerified(true);
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        if (error.response) {
          if (error.response.status.message === "Email already confirmed") {
            setVerified(true);
            setTimeout(() => navigate("/login"), 3000);
          } else {
            setInvalid(true);
          }
        }
      }
    }

    verifyEmail();
  }, []);

  return (
    <div>
      {verified ? (
        <div className="min-h-screen grid place-items-center">
          <div className="flex flex-col gap-4">
            <div className="p-3 bg-green-500 mx-auto text-white rounded-full">
              <GoVerified size={70} />
            </div>
            <h1 className="text-3xl">Email verified successfully</h1>
            <p className="text-lg text-center">Redirecting to login page...</p>
          </div>
        </div>
      ) : (invalid) ? (
        <div className="min-h-screen grid place-items-center">
          <div className="flex flex-col gap-4 items-center">
            <img src="/expired.png" alt="Token expired" />
            <h1 className="text-2xl">Email verification failed</h1>
            <p className="text-md w-4/5 text-center">Looks like the email verification link is invalid or has expired. Not to worry, we can send the link again</p>
            <button className="text-white bg-purple-500 px-3 py-2" onClick={handleResend}>Resend Verification link</button>
            <Link to="/login" className="text-purple-500">Back to login</Link>
          </div>
        </div>
      ) : (
        <div className="min-h-screen grid place-items-center">
          <div className="grid place-items-center gap-3">
            <CircularProgress size={50} color="secondary" />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default EmailVerification;