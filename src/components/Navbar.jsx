import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      if (theme === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", theme);
    } catch (e) {
      /* ignore */
    }
  }, [theme]);

  return (
    <nav className="flex items-center justify-between bg-white/60 dark:bg-black/60 backdrop-blur-xl p-3 sticky top-0 z-50">
      <div className="flex gap-3">
        <NavItem to="/" label="Dashboard" />
        <NavItem to="/health" label="Health" />
        <NavItem to="/emergency" label="Emergency" />
        <NavItem to="/test" label="🧪 Test" />
        <NavItem to="/settings" label="Settings" />
      </div>

      <div className="flex items-center gap-3">
        <button
          aria-label="Toggle theme"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}

function NavItem({ to, label }) {
  return (
    <Link to={to} className="px-4 py-1 rounded-lg hover:bg-cyan-500 hover:text-black transition-all">
      {label}
    </Link>
  );
}
