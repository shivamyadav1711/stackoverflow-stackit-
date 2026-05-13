"use client";

import { motion } from "framer-motion";
import { HTMLMotionProps } from "framer-motion";
import React from "react";

type Props = {
  children: React.ReactNode;
} & HTMLMotionProps<"button">;

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 } as any,
  animate: { "--x": "-100%", scale: 1 } as any,
  whileHover: { scale: 1.05 },
  transition: {
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
  },
};

export default function ShinyButton({ children, ...props }: Props) {
  return (
    <motion.button
      {...animationProps}
      {...props}
      className="relative overflow-hidden rounded-xl bg-black px-6 py-3 text-white"
    >
      {children}
    </motion.button>
  );
}