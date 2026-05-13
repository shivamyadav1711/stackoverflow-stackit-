"use client";

import dynamic from "next/dynamic";

const Cloud = dynamic(
  () => import("react-icon-cloud").then((mod) => mod.Cloud),
  {
    ssr: false,
  }
);

const slugs = [
  "react",
  "nextdotjs",
  "typescript",
  "javascript",
  "tailwindcss",
  "nodejs",
  "mongodb",
  "firebase",
  "appwrite",
  "git",
  "github",
  "figma",
  "vercel",
  "python",
  "cplusplus",
  "java",
  "docker",
];

const images = slugs.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/white`
);

export default function IconCloud() {
  return (
    <div className="flex items-center justify-center">
      <Cloud
        options={{
          reverse: true,
          depth: 1,
          wheelZoom: false,
          imageScale: 2,
          activeCursor: "pointer",
          tooltip: "native",
          initial: [0.1, -0.1],
          clickToFront: 500,
          tooltipDelay: 0,
          outlineColour: "#0000",
          maxSpeed: 0.03,
          minSpeed: 0.02,
        }}
      >
        {images.map((image) => (
          <img
            key={image}
            src={image}
            alt=""
            width="70"
            height="70"
          />
        ))}
      </Cloud>
    </div>
  );
}