import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(3, { message: "must be at least 3 character" }),
  password: z.string().min(8),
  email: z.string().email(),
});

export default function SignUp() {
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

  const submit = async () => {
    const { name, email, password } = getValues();
    try {
      const { data } = await axios.post("/signup", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        reset();
        toast.success("Login Successful.");
        navigate("/sign-panel/Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="w-full h-full flex flex-col items-center mb-10"
    >
      <label htmlFor="name" className="my-8 text-2xl">
        Name
      </label>
      <input
        className="w-[280px] h-8 rounded-lg pl-1 focus:shadow-md outline-none"
        {...register("name")}
        id="name"
        type="text"
      />
      {errors.name && <p className="text-red-600">{errors.name.message}</p>}
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
      <button className="bg-blue-300 w-28 h-10 mt-12 rounded-full shadow-md hover:bg-blue-400">
        sign up
      </button>
    </form>
  );
}
