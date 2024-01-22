import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        aqua: "#23FCE2",
        "soft-blue": "#0b9aee",
      },
      letterSpacing: {
        slightlytight: "-0.01em",
        normal: "0.06em",
        wide: "0.1em",
        wider: "0.2em",
        widest: "0.3em",
      },
    },
    screens: {
      xs: "475px",
      smheight: { raw: "(max-height: 700px)" },
      xsheight: { raw: "(max-height: 600px)" },
      narrowwidth: { raw: "(max-width: 1250px)" },
      narrowheight: { raw: "(max-height: 650px)" },
      fullsizedevice: { raw: "(min-width: 1250px) and (min-height: 650px)" },
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}
export default config
