import { useOtpMutation } from "@/customHooks/query/auth.query.hooks";
import { otpProps } from "@/typeScript/auth.interface";
import { useState } from "react";
import { useRouter } from "next/router";
import { FieldValues, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";

const VerifyOtp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<otpProps>();
  const { mutate, isPending } = useOtpMutation();
  const [email, setEmail] = useState("");
  const router = useRouter();

  const onSubmit = (formData: FieldValues) => {
    const { otp } = formData as otpProps;

    if (!email) {
      toast.error("Please enter your email before verifying OTP.");
      return;
    }

    const requestData = { email, otp };

    mutate(requestData, {
      onSuccess: () => {
        toast.success("OTP verified successfully!");
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000); 
      },
      onError: () => {
        toast.error("Invalid OTP. Please try again.");
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
        Verify OTP
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-gray-500 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-cyan-400"
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label className="text-white">Enter OTP</label>
          <input
            {...register("otp", { required: "OTP is required" })}
            className="w-full bg-transparent border border-gray-500 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-cyan-400"
            placeholder="123456"
          />
          {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-cyan-400 hover:bg-cyan-500 text-black font-bold rounded-md transition duration-200"
          disabled={isPending}
        >
          {isPending ? "Verifying..." : "Verify OTP"}
        </button>

        <p className="text-center text-white mt-3">
          Back to{" "}
          <a href="/auth/login" className="text-cyan-400 hover:underline">
            Login
          </a>
        </p>
      </form>
    </motion.div>
  </div>
  );
};

export default VerifyOtp;
