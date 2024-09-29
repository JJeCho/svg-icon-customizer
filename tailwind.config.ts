import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "rotate-reverse": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        scale: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
        pulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        wobble: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(3deg)" },
          "50%": { transform: "rotate(0deg)" },
          "75%": { transform: "rotate(-3deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        flip: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        slide: {
          "0%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(20px)" },
          "100%": { transform: "translateX(0px)" },
        },
        skew: {
          "0%, 100%": { transform: "skew(0deg)" },
          "50%": { transform: "skew(10deg)" },
        },
        stretch: {
          "0%, 100%": { transform: "scaleX(1)" },
          "50%": { transform: "scaleX(1.2)" },
        },
        beat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%, 28%": { transform: "scale(1.3)" },
        },
      },
      animation: {
        "rotate-slow": "rotate 5s linear infinite",
        "rotate-fast": "rotate 3s linear infinite",
        scale: "scale 2s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
        bounce: "bounce 0.5s ease-in-out infinite",
        wobble: "wobble 2s ease-in-out infinite",
        twinkle: "twinkle 1s ease-in-out infinite",
        flip: "flip 2s linear infinite",
        slide: "slide 3s ease-in-out infinite",
        "spin-reverse": "rotate-reverse 4s linear infinite",
        skew: "skew 2s ease-in-out infinite",
        stretch: "stretch 3s ease-in-out infinite",
        beat: "beat 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;