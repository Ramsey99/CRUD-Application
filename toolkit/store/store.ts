import Cookies from "js-cookie";
import { create } from "zustand";

interface UserState {
  token: string | null;
  setToken: (token: string | null) => void;
  user: { id: string } | null;
  setUser: (user: { id: string } | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  token: Cookies.get("token") || null,
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,

  setToken: (token) => {
    if (token) {
      Cookies.set("token", token, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });
    } else {
      Cookies.remove("token");
    }
    console.log("Token Updated:", token);
    set({ token });
  },

  setUser: (user) => {
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    }
    console.log("User Updated:", user);
    set({ user });
  },
  logout: () => {
    Cookies.remove("token");
    localStorage.clear();
    set({ token: null, user: null });
  },
}));
