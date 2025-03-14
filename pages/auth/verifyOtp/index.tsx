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
        router.push("/auth/login");
      },
      onError: () => {
        toast.error("Invalid OTP. Please try again.");
      },
    });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #141E30, #243B55)",
          padding: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Box
            component="form"
            sx={{
              width: "100%",
              maxWidth: 380,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: 2,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              padding: 4,
              backdropFilter: "blur(10px)",
              color: "#fff",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              sx={{ mb: 3 }}
            >
              Verify OTP
            </Typography>

            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              InputLabelProps={{ style: { color: "#fff" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#fff" },
                  "&:hover fieldset": { borderColor: "#00bcd4" },
                  "&.Mui-focused fieldset": { borderColor: "#00bcd4" },
                },
                input: { color: "#fff" },
              }}
            />

            <TextField
              {...register("otp", {
                required: "OTP is required",
              })}
              label="Enter OTP"
              fullWidth
              error={!!errors.otp}
              helperText={errors.otp?.message}
              margin="normal"
              InputLabelProps={{ style: { color: "#fff" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#fff" },
                  "&:hover fieldset": { borderColor: "#00bcd4" },
                  "&.Mui-focused fieldset": { borderColor: "#00bcd4" },
                },
                input: { color: "#fff" },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                p: 1.5,
                fontWeight: "bold",
                background: "#00bcd4",
                "&:hover": { background: "#008ba3" },
              }}
              disabled={isPending}
            >
              {isPending ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Verify OTP"
              )}
            </Button>

            <Typography align="center" sx={{ marginTop: 2 }}>
              Back to{" "}
              <a
                href="/auth/login"
                style={{ color: "#00bcd4", textDecoration: "none" }}
              >
                Login
              </a>
            </Typography>
          </Box>
        </motion.div>
      </Grid>
    </>
  );
};

export default VerifyOtp;
