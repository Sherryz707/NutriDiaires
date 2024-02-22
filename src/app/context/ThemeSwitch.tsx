"use client";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme,resolvedTheme } = useTheme();
// Generate a unique id for the select element
  const selectId = useRef("themeSwitch_0");
  selectId.current = "themeSwitch_" + Math.random().toString(36).substr(2, 9);
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);


  return (
    <div className="flex items-center">
      <label htmlFor={selectId.current} className="sr-only">Select Theme</label>
      <select
        id={selectId.current}
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="bg-bg_lvl1_clr rounded-md text-text_clr p-1 font-medium"
      >
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="pink">Light</option>
      </select>
    </div>
  );
};

export default ThemeSwitch;
