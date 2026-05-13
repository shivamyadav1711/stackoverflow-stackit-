"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import HeroSectionHeader from "./HeroSectionHeader";

import { useEffect } from "react";

import { useAuthStore } from "@/store/Auth";

export default function HeroSection() {
  const {
    user,
    fetchUser,
  } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e3a8a_0%,#000_55%)]" />

      {/* CYAN GLOW */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
        }}
        className="absolute left-20 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"
      />

      {/* PURPLE GLOW */}
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 50, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
        }}
        className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl"
      />

      {/* MAIN */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-24 lg:grid-cols-2">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
            Beautiful{" "}
            <span className="text-cyan-400">
              Developer
            </span>
            <br />
            Community Platform
          </h1>

          <p className="max-w-xl text-lg text-gray-300 md:text-2xl">
            A modern Stack Overflow clone built with
            Next.js, Appwrite, Tailwind CSS and
            stunning animations.
          </p>

          {/* BUTTON */}
          <div className="flex gap-5">

            {user ? (
              <Link
                href="/questions"
                className="rounded-2xl bg-cyan-400 px-10 py-4 text-lg font-bold text-black transition hover:scale-105"
              >
                Explore Questions
              </Link>
            ) : (
              <Link
                href="/login"
                className="rounded-2xl bg-cyan-400 px-10 py-4 text-lg font-bold text-black transition hover:scale-105"
              >
                Get Started
              </Link>
            )}

          </div>
        </motion.div>

        {/* RIGHT */}
        <div className="flex items-center justify-center">
          <HeroSectionHeader />
        </div>
      </div>
    </section>
  );
}