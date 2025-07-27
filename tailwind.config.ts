import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "Consolas", "Monaco", "monospace"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Cyberpunk theme colors
        "neon-green": "#00ff41",
        "neon-cyan": "#00ffff",
        "neon-pink": "#ff0080",
        "neon-yellow": "#ffff00",
        "cyber-blue": "#0080ff",
        "matrix-green": "#00ff00",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
        "spin-slow": "spin 3s linear infinite",
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "glitch": "glitch 0.3s ease-in-out",
        "scan-line": "scanLine 2s linear infinite",
        "matrix-rain": "matrixRain 20s linear infinite",
        "cyber-pulse": "cyberPulse 2s ease-in-out infinite",
        "neon-glow": "neonGlow 1.5s ease-in-out infinite alternate",
        "data-stream": "dataStream 3s linear infinite",
        "terminal-cursor": "terminalCursor 1s step-end infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        scanLine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100vw)" },
        },
        matrixRain: {
          "0%": { transform: "translateY(-100vh)" },
          "100%": { transform: "translateY(100vh)" },
        },
        cyberPulse: {
          "0%, 100%": { 
            boxShadow: "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor",
            opacity: "1"
          },
          "50%": { 
            boxShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
            opacity: "0.8"
          },
        },
        neonGlow: {
          "0%": { 
            textShadow: "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor",
            filter: "brightness(1)"
          },
          "100%": { 
            textShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
            filter: "brightness(1.2)"
          },
        },
        dataStream: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(10px)", opacity: "0" },
        },
        terminalCursor: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
      },
      gridTemplateColumns: {
        "20": "repeat(20, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        "20": "repeat(20, minmax(0, 1fr))",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "neon": "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor",
        "neon-lg": "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
        "cyber": "0 4px 14px 0 rgba(0, 255, 65, 0.39)",
        "cyber-lg": "0 10px 25px 0 rgba(0, 255, 65, 0.5)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
