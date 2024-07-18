import { useEffect, useState } from "react";
import "../assets/style/darkmode.css";

const Darkmode = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("selectedTheme") || ""
  );

  const setLightMode = () => {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("selectedTheme", "");
    setTheme("");
  };

  const setDarkMode = () => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("selectedTheme", "dark");
    setTheme("dark");
  };

  useEffect(() => {
    const selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === "dark") {
      setDarkMode();
    } else {
      setLightMode();
    }

    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("selectedTheme");
      if (newTheme === "dark") {
        setDarkMode();
      } else {
        setLightMode();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };

  return (
    <div className="absolute right-0 py-3 dark:bg-stone-800">
      <label htmlFor="darkmode-toggle" className="darkmode mr-4">
        <input
          type="checkbox"
          id="darkmode-toggle"
          className="darkmode_input hidden "
          onChange={toggleTheme}
          checked={theme === "dark"}
          aria-label="Toggle dark mode"
        />
        <span className="slider w-14 h-7 rounded-full block dark:bg-zinc-500"></span>
      </label>
    </div>
  );
};

export default Darkmode;
