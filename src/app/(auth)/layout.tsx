"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return <>{children}</>;
};

export default Layout;