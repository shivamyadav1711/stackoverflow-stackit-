"use client";

import { useAuthStore } from "@/store/Auth";

export default function LogoutButton() {
  const logout = useAuthStore(
    (state) => state.logout
  );

  return (
    <button
      onClick={logout}
      className="rounded-2xl bg-red-500 px-6 py-3 font-bold text-white transition hover:scale-105"
    >
      Logout
    </button>
  );
}