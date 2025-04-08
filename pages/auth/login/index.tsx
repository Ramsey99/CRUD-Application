import {
  Button,
  Grid2,
  Paper,
  TextField,
  Typography,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import React, { use, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLoginMutation } from "@/customHooks/query/auth.query.hooks";
import { loginProps } from "@/typeScript/auth.interface";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginProps>();
  const router = useRouter();
  const { mutate, isPending } = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [pic, setPic] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onsubmit = async (formData: FieldValues) => {
    const { email, password } = formData as { email: string; password: string };
    
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    
    mutate(formData, {
      onSuccess: (res) => {
        console.log("Login Mutation Response:", res);
        
        if (res?.token) {
          console.log("Token:", res.token);
          console.log("User:", res.user);
          
          Cookies.set("token", res.token, { expires: 7 });
          toast.success("Login successful! Welcome back.");
          
          setTimeout(() => {
            router.replace("/cms/list");
          }, 500);
        } else {
          toast.error("Invalid credentials! Please try again.");
          console.log("Login failed. Please try again.");
        }
      },
      onError: () => {
        toast.error("Login failed. Please check your credentials and try again.");
        console.error("Login failed. Please check your credentials and try again.");
      },

    });
    console.log(formData);
    reset();
    // router.push("/cms/list");
  };

  const handleLoginError = () => {
    router.push("/auth/registration");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      <ToastContainer position="top-center" autoClose={3000} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg w-full max-w-sm border border-gray-200/20"
      >
        <h2 className="text-3xl font-bold text-white text-center">Sign In</h2>

        <form onSubmit={handleSubmit(onsubmit)} className="mt-6 space-y-4">
          <div>
            <label className="text-white text-sm font-semibold">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email format",
                },
              })}
              className="w-full bg-transparent border border-gray-400 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400"
              placeholder="example@email.com"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <label className="text-white text-sm font-semibold">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type={showPassword ? "text" : "password"}
              className="w-full bg-transparent border border-gray-400 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400"
              placeholder="********"
            />
            <IconButton
                onClick={togglePasswordVisibility}
                sx={{
                  position: "absolute",
                  right: 10,
                  top: "70%",
                  transform: "translateY(-50%)",
                  color: "#00bcd4",
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md transition duration-200"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Sign In"}
          </button>

          <p className="text-center text-white mt-3">
            Don’t have an account?{" "}
            <a href="/auth/register" className="text-blue-300 hover:underline">
              Register here
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
