import "@theme-toggles/react/css/Horizon.css";
import { Horizon } from "@theme-toggles/react";
import { useTheme } from "../hooks/useThemeConfig";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Horizon
      placeholder=""
      className="fixed bottom-5 right-5 bg-transparent w-[3rem] h-[3rem] text-[#ffe668] dark:text-[#F6B17A] text-3xl bg-opacity-80 backdrop-blur-[0.5rem]  shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all"
      duration={750}
      onToggle={toggleTheme}
      toggled={theme === "dark"}
    />
  );
}
