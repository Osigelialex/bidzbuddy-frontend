import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import { useAuth } from "../../hooks/AuthProvider";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const schema = z.object({
  username: z.string().min(1, { message: "Email or username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      navigate("/");
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      await auth.loginAction(data);
      navigate("/");
    } catch (error) {
      if (error.response) {
        setError("root", {
          message: error.response.data.message,
        });
      } else {
        setError("root", {
          message: "Something went wrong. Check your connection and try again",
        });
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full bg-white px-3 py-7 shadow-md sm:w-[560px]">
      <div className="grid justify-start px-5">
        <h1 className="mb-3 text-xl font-semibold">Log In to your account</h1>
        <div className="text-md flex gap-3">
          <p>New Member?</p>
          <p className="cursor-pointer font-semibold">
            <Link to="/signup">Signup Here</Link>
          </p>
        </div>
      </div>
      <form
        className="flex flex-col gap-7 px-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="my-2">
          {errors.root && (
            <Alert severity="error">
              <p>{errors.root.message}</p>
            </Alert>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-md mb-3">Email address or username *</label>
          <input
            {...register("username")}
            type="text"
            placeholder="Enter your email or username"
            className="w-full border p-3"
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-md mb-3">Password *</label>
          <input
            {...register("password")}
            type="password"
            placeholder="Enter your password"
            className="w-full border p-3"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer border bg-violet-600 p-3 text-lg font-bold text-white transition delay-75 hover:border-violet-600 hover:bg-white hover:text-violet-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "LOG IN"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
