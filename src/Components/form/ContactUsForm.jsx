import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../../config/axiosConfig";
import { toast } from "sonner";

const schema = z.object({
  firstName: z.string().min(1, { message: "Firstname is required" }),
  lastName: z.string().min(1, { message: "Lastname is required" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  message: z.string().min(10, { message: "Message is required" }),
});

const ContactUsForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/v1/sendmail/contact", data);
      console.log(data);
      toast.success(`Message sent successfully. We will get back to you soon.`);
      reset();
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
    <div className="w-full bg-white px-3 py-3 sm:w-[560px] mx-auto sm:my-10 sm:shadow-md">
      <form
        className="flex flex-col gap-3 px-5 pb-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="my-2">
          {errors.root && (
            <Alert severity="error">
              <p>{errors.root.message}</p>
            </Alert>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-md mb-3 font-bold">First name *</label>
            <input
              {...register("firstName")}
              type="text"
              className="w-full border p-3 bg-slate-200 ring-purple-500 focus:ring-2 focus:outline-none"
            />
            {errors.firstname && (
              <p className="text-sm text-red-500">{errors.firstname.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-md mb-3 font-bold">Last name *</label>
            <input
              {...register("lastName")}
              type="text"
              className="w-full border p-3 bg-slate-200 ring-purple-500 focus:ring-2 focus:outline-none"
            />
            {errors.lastname && (
              <p className="text-sm text-red-500">{errors.lastname.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-md mb-3 font-bold">Email *</label>
          <input
            {...register("email")}
            type="email"
            className="w-full border p-3 bg-slate-200 ring-purple-500 focus:ring-2 focus:outline-none"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-md mb-3 font-bold">How can we help you?</label>
          <textarea
            {...register("message")}
            className="w-full border p-3 min-h-28 bg-slate-200 ring-purple-500 focus:ring-2 focus:outline-none"
          />
          {errors.message && (
            <p className="text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-1/4 cursor-pointer border bg-violet-600 px-2 py-1 mt-3 rounded-sm text-lg font-bold text-white transition delay-75 hover:border-violet-600 hover:bg-white hover:text-violet-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
