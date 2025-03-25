import { useUpdatePasswordMutation } from "@/customHooks/query/auth.query.hooks";
import { updatePasswordProps } from "@/typeScript/auth.interface";
import { useForm, FieldValues } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  LockReset as LockResetIcon,
} from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import { useUserStore } from "@/toolkit/store/store";
import { motion } from "framer-motion";

const UpdatePassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updatePasswordProps>();
  const { mutate, isPending } = useUpdatePasswordMutation();
  const router = useRouter();
  const { user } = useUserStore();
  const userId = user?.id;

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (formData: FieldValues) => {
    if (!userId) {
      toast.error("User not found. Please log in again.");
      return;
    }

    const { password } = formData as updatePasswordProps;
    const requestData = { user_id: userId, password };

    mutate(requestData, {
      onSuccess: () => {
        toast.success("Password updated successfully! Please log in.");
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000); 
      },
      onError: (error) => {
        console.error("Update Password Error:", error);
        toast.error("Failed to update password. Please try again.");
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
              Update Password
            </Typography>

            <Box sx={{ position: "relative", width: "100%" }}>
              <TextField
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                label="New Password"
                type={showPassword ? "text" : "password"}
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
                "Update Password"
              )}
            </Button>

            <Typography align="center" sx={{ marginTop: 2 }}>
              Remembered your password?{" "}
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

export default UpdatePassword;
