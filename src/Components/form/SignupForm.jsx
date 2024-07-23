import { Link } from "react-router-dom";
import axios from "../../config/axiosConfig";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";

const schema = z.object({
  role: z.string().min(1, { message: "Please select your role" }),
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  username: z
    .string()
    .min(3, { message: "Username must be 3 characters or more" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be 6 characters or more" }),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/v1/auth/signup", data);
      console.log(response.data);
      Cookies.set("email", response.data);
      navigate("/link-sent");
      reset();
    } catch (error) {
      console.error(error);
      if (error.response) {
        setError("root", {
          message: error.response.data.message,
        });
      } else if (error.request) {
        setError("root", {
          message: "Oops! Something went wrong, check your connection",
        });
      } else {
        console.error(error);
        setError("root", {
          message: "Something went wrong, check your connection and try again",
        });
      }
    }
  };

  return (
    <div className="w-full bg-white px-3 py-7 shadow-md sm:w-[560px]">
      <div className="mb-10 grid justify-start px-5">
        <h1 className="mb-3 text-xl font-semibold">Sign up on BidzBuddy</h1>
        <div className="text-md flex flex-wrap gap-3">
          <p>Do you already have an account?</p>
          <p className="cursor-pointer font-semibold">
            <Link to="/login">Log in here</Link>
          </p>
        </div>
      </div>
      <form
        className="flex flex-col gap-5 px-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label htmlFor="role" className="mb-3 font-bold">
            Account Type *
          </label>
          <select
            id="role"
            {...register("role")}
            defaultValue=""
            className="w-full border p-3 bg-slate-200 font-medium"
          >
            <option value="" disabled>
              I am a...
            </option>
            <option value={"BUYER"}>Buyer</option>
            <option value={"SELLER"}>Seller</option>
          </select>
          {errors.role && (
            <div className="text-sm font-semibold text-red-500">
              {errors.role.message}
            </div>
          )}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col">
            <label htmlFor="firstname" className="mb-3 font-bold">
              First Name *
            </label>
            <input
              id="firstname"
              {...register("firstname")}
              type="text"
              className="w-full border p-3 bg-slate-200 ring-purple-500 focus:ring-2 focus:outline-none"
            />
            {errors.firstname && (
              <div className="text-sm font-semibold text-red-500">
                {errors.firstname.message}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastname" className="mb-3 font-bold">
              Last Name *
            </label>
            <input
              id="lastname"
              {...register("lastname")}
              className="w-full border p-3 bg-slate-200 ring-purple-500 focus:ring-2 focus:outline-none"
            />
            {errors.lastname && (
              <div className="text-sm font-semibold text-red-500">
                {errors.lastname.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-3 font-bold">
            Enter your email *
          </label>
          <input
            id="email"
            {...register("email")}
            type="email"
            className="w-full border p-3 bg-slate-200 ring-purple-500 focus:ring-2 focus:outline-none"
          />
          {errors.email && (
            <div className="text-sm font-semibold text-red-500">
              {errors.email.message}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-3 font-bold">
            Username *
          </label>
          <input
            id="username"
            {...register("username")}
            type="text"
            className="w-full border p-3 bg-slate-200 ring-purple-500 focus:ring-2 focus:outline-none"
          />
          {errors.username && (
            <div className="text-sm font-semibold text-red-500">
              {errors.username.message}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-3 font-bold">
            Password *
          </label>
          <input
            id="password"
            {...register("password")}
            type="password"
            className="w-full border p-3 bg-slate-200 ring-purple-500 focus:ring-2 focus:outline-none"
          />
          {errors.password && (
            <div className="text-sm font-semibold text-red-500">
              {errors.password.message}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer border bg-violet-600 p-3 text-lg font-bold text-white hover:border-violet-600 hover:bg-white hover:text-violet-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "CREATE ACCOUNT"
          )}
        </button>
        {errors.root && <Alert severity="error">{errors.root.message}</Alert>}
      </form>
    </div>
  );
};

export default Signup;
