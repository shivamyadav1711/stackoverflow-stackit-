"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { account } from "@/models/client/config";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await account.createEmailPasswordSession(
        email,
        password
      );

      alert("Login successful");

      router.push("/");

      router.refresh();
    } catch (error: any) {
      console.log(error);

      alert(error.message);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl">

        <h1 className="mb-8 text-center text-5xl font-bold text-cyan-400">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl border border-white/10 bg-white/10 p-4 text-white outline-none"
            required
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-xl border border-white/10 bg-white/10 p-4 text-white outline-none"
            required
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-400 p-4 text-xl font-bold text-black"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}