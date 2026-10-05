import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    function checkLogin() {
      setIsLoggedIn(!!localStorage.getItem("token"));
    }

    window.addEventListener("storage", checkLogin);

    // Check whenever the page becomes active
    window.addEventListener("focus", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("focus", checkLogin);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  }

  return (
    <header className="navbar">

      <NavLink to="/" className="brand">
        <span className="brand-mark">TF</span>

        <span>
          TECHFEST
          <br />
          2026
        </span>
      </NavLink>

      <nav className="nav-links">

        <NavLink to="/">Home</NavLink>

        <NavLink to="/events">Events</NavLink>

        <NavLink to="/register">Register</NavLink>

        <NavLink to="/gallery">Gallery</NavLink>

        <NavLink to="/contact">Contact</NavLink>

        <div className="auth-links">

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="nav-logout"
            >
              LOGOUT
            </button>
          ) : (
            <>
              <NavLink to="/login">LOGIN</NavLink>

              <NavLink to="/signup">
                SIGN UP
              </NavLink>
            </>
          )}

        </div>

      </nav>

      <button
        className="theme-btn"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "light" ? "☾ DARK" : "☀ LIGHT"}
      </button>

    </header>
  );
}

export default Navbar;