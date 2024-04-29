import { Link } from "react-router-dom";
import axios from "../../config/axiosConfig";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

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
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/v1/auth/signup", data);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setError("root", {
          message: error.response.data.message,
        });
      } else if (error.request) {
        setError("root", {
          message: "Oops! Something went wrong, check your connection",
        });
      } else {
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
        className="flex flex-col gap-7 px-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label htmlFor="role" className="mb-3">
            Account Type *
          </label>
          <select
            id="role"
            {...register("role")}
            defaultValue=""
            className="w-full border bg-white p-3"
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
            <label htmlFor="firstname" className="mb-3">
              First Name *
            </label>
            <input
              id="firstname"
              {...register("firstname")}
              type="text"
              placeholder="Firstname"
              className="w-full border p-3"
            />
            {errors.firstname && (
              <div className="text-sm font-semibold text-red-500">
                {errors.firstname.message}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastname" className="mb-3">
              Last Name *
            </label>
            <input
              id="lastname"
              {...register("lastname")}
              placeholder="Lastname"
              className="w-full border p-3"
            />
            {errors.lastname && (
              <div className="text-sm font-semibold text-red-500">
                {errors.lastname.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-3">
            Enter your email *
          </label>
          <input
            id="email"
            {...register("email")}
            type="email"
            placeholder="Email address"
            className="w-full border p-3"
          />
          {errors.email && (
            <div className="text-sm font-semibold text-red-500">
              {errors.email.message}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-3">
            Username *
          </label>
          <input
            id="username"
            {...register("username")}
            type="text"
            placeholder="Pick a username"
            className="w-full border p-3"
          />
          {errors.username && (
            <div className="text-sm font-semibold text-red-500">
              {errors.username.message}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-3">
            Password *
          </label>
          <input
            id="password"
            {...register("password")}
            type="password"
            placeholder="password"
            className="w-full border p-3"
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
