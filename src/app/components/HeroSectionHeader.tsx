"use client";

import { motion } from "framer-motion";

import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiAppwrite,
} from "react-icons/si";

const icons = [
  FaReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  FaNodeJs,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  SiAppwrite,
];

export default function HeroSectionHeader() {
  return (
    <div className="relative flex h-[350px] w-[350px] items-center justify-center md:h-[500px] md:w-[500px]">
      
      {/* OUTER ROTATING RING */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "linear",
        }}
        className="absolute flex h-[280px] w-[280px] items-center justify-center rounded-full border border-cyan-400/30 md:h-[420px] md:w-[420px]"
      >
        {icons.map((Icon, index) => {
          const angle = (index / icons.length) * 360;

          return (
            <div
              key={index}
              className="absolute"
              style={{
                transform: `rotate(${angle}deg) translateY(-140px)`,
              }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-xl text-cyan-300 shadow-lg backdrop-blur-xl md:h-16 md:w-16 md:text-3xl"
                style={{
                  transform: `rotate(-${angle}deg)`,
                }}
              >
                <Icon />
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* INNER RING */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "linear",
        }}
        className="absolute h-[200px] w-[200px] rounded-full border border-purple-500/30 md:h-[300px] md:w-[300px]"
      />

      {/* GLOW */}
      <div className="absolute h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

      {/* CENTER LOGO */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
        className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-2xl font-bold text-black shadow-2xl shadow-cyan-500/50 md:h-32 md:w-32 md:text-3xl"
      >
        StackIt
      </motion.div>
    </div>
  );
}