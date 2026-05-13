"use client";

import { create } from "zustand";
import { account } from "@/models/client/config";

interface AuthState {
  user: any;
  loading: boolean;

  setUser: (user: any) => void;

  fetchUser: () => Promise<void>;

  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) =>
    set({
      user,
    }),

  fetchUser: async () => {
    try {
      const user = await account.get();

      set({
        user,
        loading: false,
      });
    } catch {
      set({
        user: null,
        loading: false,
      });
    }
  },

  logout: async () => {
    try {
      await account.deleteSession("current");

      set({
        user: null,
      });

      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  },
}));