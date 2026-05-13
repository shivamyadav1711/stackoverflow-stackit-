"use client";

import { useState } from "react";
import { account } from "@/models/client/config";
import { ID } from "appwrite";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: any) => {
    e.preventDefault();

    try {
      await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      alert("Signup Successful");

      router.push("/login");
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSignup}
        className="flex w-[400px] flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
      >
        <h1 className="text-center text-3xl font-bold">
          Signup
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="rounded-lg bg-white/10 p-3 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="rounded-lg bg-white/10 p-3 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="rounded-lg bg-white/10 p-3 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="rounded-lg bg-cyan-400 p-3 font-bold text-black"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}