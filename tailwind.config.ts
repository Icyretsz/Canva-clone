import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '0.5': '0.5px',
      },
      width: {
        '1640': '1640px',
        '88': '352px'
      },
      height: {
        '924': '924px'
      },
      border: {

      },
      padding: {
        '28px': '28px',
        '432px': '432px'
      },
      fontSize: {
        '10px': '10px',
        '8px': '8px',
        '6px': '6px',
        '4px': '4px',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-gradient": "linear-gradient(90deg, rgba(102,83,168,1) 0%, rgba(3,221,171,1) 49%, rgba(0,212,255,1) 100%)"
      },
    },
  },
  plugins: [],
};
export default config;
