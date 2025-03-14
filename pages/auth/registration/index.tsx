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
        toast.success("Registration successful!", { autoClose: 3000 });
        router.push("/auth/verifyOtp");
      },
      onError: (error) => {
        toast.error("Registration failed. Please check your credentials.");
        console.error("Error:", error);
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
              Sign Up
            </Typography>

            <TextField
              {...register("name", { required: "Name is required" })}
              label="Full Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
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

            <Box sx={{ position: "relative", width: "100%" }}>
              <TextField
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email format",
                  },
                })}
                label="Email"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
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
              <EmailOutlinedIcon
                sx={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#00bcd4",
                }}
              />
            </Box>

            <Box sx={{ position: "relative", width: "100%" }}>
              <TextField
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
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
              <IconButton
                onClick={togglePasswordVisibility}
                sx={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#00bcd4",
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>

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
                "Sign Up"
              )}
            </Button>

            <Typography align="center" sx={{ marginTop: 2 }}>
              Already have an account?{" "}
              <Link
                href="/auth/login"
                passHref
                style={{ color: "#00bcd4", textDecoration: "none" }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </motion.div>
      </Grid>
    </>
  );
};

export default Registration;
