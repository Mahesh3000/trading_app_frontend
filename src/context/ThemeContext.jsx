import React, { createContext, useState, useContext, useEffect } from "react";

// Default theme can be 'light', 'dark', or 'system'
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); // default to light

  // Change theme based on system preference
  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    if (theme === "system") {
      setTheme(systemTheme);
    }
  }, [theme]);

  // Update the local storage when theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
