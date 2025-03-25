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
import { useUserStore } from "@/toolkit/store/store";
import { useRouter } from "next/router";

export const useLoginMutation = (): UseMutationResult<
  any,
  unknown,
  any,
  unknown
> => {
  const { setToken, setUser } = useUserStore();
  const router = useRouter();

  return useMutation({
    mutationFn: loginFn,
    onSuccess: (res) => {
      if (res?.token) {
        Cookies.set("token", res.token, { expires: 7 });
        setToken(res.token);
        setUser(res.user);
      }
    },
    onError: () => {},
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
      console.log("Register Mutation Response:", res);
      if (res?.user) {
        setUser(res.user);
        console.log("user:", res.user);
      }
    },
    onError: (error: any) => {
      console.error("Register Mutation Error:", error);
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
    onSuccess: () => {},
    onError: () => {},
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
    onSuccess: () => {},
    onError: () => {},
  });
};
