import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";

const schema = z.object({
  password: z.string().min(8),
  email: z.string().email(),
});

export default function Login() {
  const { user } = useSelector((state) => {
    return { user: state.data.user };
  });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const loginUser = async () => {
    const { email, password } = getValues();
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        Cookies.set("token", data.token);
        reset();
        navigate("/");
        navigate(0);
        toast.success("Login Successful");
      }
    } catch (error) {}
  };

  //content
  let content = !user ? (
    <form
      onSubmit={handleSubmit(loginUser)}
      className="w-full h-full flex flex-col items-center mb-10"
    >
      <label htmlFor="email" className="my-8 text-2xl">
        Email
      </label>
      <input
        className="w-[280px] h-8 rounded-lg pl-2 focus:shadow-md outline-none"
        {...register("email")}
        id="email"
        type="text"
      />
      {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      <label htmlFor="password" className="my-8 text-2xl">
        Password
      </label>
      <input
        className="w-[280px] h-8 rounded-lg pl-1 focus:shadow-md outline-none"
        {...register("password")}
        id="password"
        type="text"
      />
      {errors.password && (
        <p className="text-red-600">{errors.password.message}</p>
      )}

      <button className="bg-blue-300 w-28 h-10 mt-12 rounded-full shadow-md hover:bg-blue-400">
        login
      </button>
    </form>
  ) : (
    <div className="w-full h-full flex flex-col items-center pt-32 text-4xl">
      <h1 className="mb-8">You are login</h1>
      <IoLogInOutline className="h-32 w-32" />
    </div>
  );

  return <>{content}</>;
}
