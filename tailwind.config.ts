import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "#F0F0F0",
        navy: "#1A1A1A",
        ink: "#1A1A1A",
        brand: "#C8FF00",
        lime: "#C8FF00",
        limeHover: "#B8EF00",
        cta: "#C8FF00",
        surface: "#FFFFFF",
        surface2: "#F7F7F5",
        muted: "#6B6B6B",
        muted2: "#9CA3AF",
        border: "rgba(0,0,0,0.05)",
        borderHover: "rgba(0,0,0,0.1)",
        success: "#16A34A",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(0,0,0,0.04)",
        card: "0 4px 20px rgba(0,0,0,0.06)",
        cardHover: "0 12px 40px rgba(0,0,0,0.08)",
        glass: "0 2px 12px rgba(0,0,0,0.04)",
      },
      backgroundColor: {
        glass: "rgba(255,255,255,0.72)",
      },
      fontFamily: {
        heading: ["var(--font-syne)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter2: "-0.03em",
      },
      borderRadius: {
        card: "20px",
        cardLg: "24px",
        btn: "14px",
        pill: "999px",
      },
      keyframes: {
        bounceTiny: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        kenburns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        bounceTiny: "bounceTiny 0.5s ease",
        float: "float 3s ease-in-out infinite",
        kenburns: "kenburns 20s ease-in-out infinite alternate",
        shimmer: "shimmer 1.5s infinite",
        marquee: "marquee 25s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
