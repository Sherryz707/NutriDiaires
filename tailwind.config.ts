import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple_dark: {
          10: "2b1e56",
          50: "#271b4d",
          100: "#221845",
          200: "#1e153c",
          300: "#1a1234",
          400: "#160f2b",
          500: "#110c22",
          600: "#0d091a",
          700: "#090611",
          800: "#040309",
          900: "#000000",
        },
        bg_clr: "var(--bg_clr)",
        bg_lvl1_clr: "var(--bg_lvl1_clr)",
        shadow_post: "var(--shadow_post)",
        text_clr: "var(--text_clr)",
        from_gradient: "var(--from_gradient)",
        to_gradient: "var(--to_gradient)",
        img_grayscale: "var(--image_grayscale)",
        imgOpacity: "var(--image_opacity)",
        gray_text: "var(--gray_text)",
        primary: "var(--primary)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
