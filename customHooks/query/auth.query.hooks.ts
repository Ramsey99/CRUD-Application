import Cookies from "js-cookie";
import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  loginFn,
  registerFn,
  fetchProfile,
  verifyOtpFn,
  updatePasswordFn,
} from "../../api/functions/auth.api";
import { toast } from "react-toastify";
import { useUserStore } from "@/toolkit/store/store";

export const useLoginMutation = (): UseMutationResult<
  any,
  unknown,
  any,
  unknown
> => {
  const { setToken, setUser } = useUserStore();

  return useMutation({
    mutationFn: loginFn,
    onSuccess: (res) => {
      if (res?.token) {
        setToken(res.token);
        setUser(res.user);
        toast.success("Login successful! Welcome back.");
      } else {
        toast.error("Invalid credentials! Please try again.");
      }
    },
    onError: () => {
      toast.error("Login failed. Please check your credentials and try again.");
    },
  });
};

export const useRegisterMutation = (): UseMutationResult<
  any,
  unknown,
  any,
  unknown
> => {
  const { setToken, setUser } = useUserStore();

  return useMutation({
    mutationFn: registerFn,
    onSuccess: (res) => {
      if (res?.token) {
        setToken(res.token);
        setUser(res.user);
        toast.success("Registration successful!");
      } else {
        toast.error("Registration failed! Please try again.");
      }
    },
    onError: () => {
      toast.error("Registration failed. Please try again.");
    },
  });
};

export const useOtpMutation = (): UseMutationResult<
  any,
  unknown,
  any,
  unknown
> => {
  return useMutation({
    mutationFn: verifyOtpFn,
    onSuccess: (res) => {
      if (res?.token) {
        Cookies.set("token", res.token, { path: "/", secure: true });
        toast.success("OTP verified successfully.");
      } else {
        toast.error("Invalid OTP! Please try again.");
      }
    },
    onError: () => {
      toast.error("OTP verification failed.");
    },
  });
};

export const useProfileQuery = (): UseQueryResult<any, unknown> => {
  return useQuery({
    queryKey: ["PROFILE"],
    queryFn: fetchProfile,
  });
};

export const useUpdatePasswordMutation = (): UseMutationResult<
  any,
  unknown,
  any,
  unknown
> => {
  return useMutation({
    mutationFn: updatePasswordFn,
    onSuccess: () => {
      toast.success("Password updated successfully.");
    },
    onError: () => {
      toast.error("Failed to update password.");
    },
  });
};
