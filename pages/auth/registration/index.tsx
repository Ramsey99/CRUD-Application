import { useRegisterMutation } from "@/customHooks/query/auth.query.hooks";
import { registerProps } from "@/typeScript/auth.interface";
import { useState } from "react";
import Link from "next/link";
import {
  Stack,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Grid,
  CircularProgress,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerProps>();

  const { mutate, isPending } = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (formData: FieldValues) => {
    const { name, email, password } = formData as registerProps;

    const requestData = { name, email, password };

    mutate(requestData, {
      onSuccess: () => {
        toast.success("Registration successful. Please check your email to verify OTP");
        console.log("Registration successful.");
        router.push("/auth/verifyOtp");
      },
      
      onError: (error) => {
        toast.error("Registration failed. Please check your credentials.");
        console.error("Error:", error);
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <ToastContainer position="top-center" autoClose={3000} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6 w-full max-w-md border border-gray-500/30"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-white">Full Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full bg-transparent border border-gray-500 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-cyan-400"
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-white">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email format",
                },
              })}
              className="w-full bg-transparent border border-gray-500 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-cyan-400"
              placeholder="example@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <label className="text-white">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "At least 8 characters required" },
              })}
              type={showPassword ? "text" : "password"}
              className="w-full bg-transparent border border-gray-500 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-cyan-400"
              placeholder="••••••••"
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
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-cyan-400 hover:bg-cyan-500 text-black font-bold rounded-md transition duration-200"
          >
            Sign Up
          </button>

          <p className="text-center text-white mt-3">
            Already have an account?{" "}
            <a href="/auth/login" className="text-cyan-400 hover:underline">
              Sign In
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Registration;
