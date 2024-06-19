import { useEffect, useState } from "react";

const useSystemTheme = () => {
  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setTheme(mediaQuery.matches ? "dark" : "light");

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return theme;
};

export default useSystemTheme;
