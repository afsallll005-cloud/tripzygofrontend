import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const goProfile = () => {
    navigate("/UserProfile");
    setMenuOpen(false);
  };

  return (
    <nav className="navx-root">

      {/* LEFT - LOGO ONLY */}
      <div className="navx-left">
        {/* <img src="/images/Loggo.png" alt="logo" className="navx-logo-imgg" /> */}
        <img src="/images/TripzyGoLogo.png" alt="logo" className="navx-logo-img" />

        {/* <h4 className="navx-logo-text">TRIPZYGO</h4> */}
      </div>

      {/* HAMBURGER (NOW RIGHT SIDE) */}
      <div
        className={`navx-hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* MENU */}
      <div className={`navx-menu ${menuOpen ? "show" : ""}`}>

        <ul className="navx-links">

          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><a href="/#About" onClick={() => setMenuOpen(false)}>About us</a></li>
          <li><a href="/#Packagecards" onClick={() => setMenuOpen(false)}>Packages</a></li>
          <li><Link to="/ExpenseChecke" onClick={() => setMenuOpen(false)}>Expense</Link></li>
          <li><Link to="/support" onClick={() => setMenuOpen(false)}>Support</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contacts</Link></li>

          {/* USER PROFILE INSIDE MENU */}
          {isLoggedIn && (
            <li className="mobile-user-profile" onClick={goProfile}>
              <FaUserCircle />
              <span>{user?.name}</span>
            </li>
          )}

          {!isLoggedIn && (
            <li className="mobile-login">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </li>
          )}

        </ul>
      </div>

      {/* DESKTOP RIGHT ACTIONS */}
      <div className="navx-actions">

        {!isLoggedIn ? (
          <Link to="/login" className="navx-login-btn">
            Login
          </Link>
        ) : (
          <div className="navx-user" onClick={goProfile}>
            <span className="navx-username">{user?.name}</span>
            <FaUserCircle className="navx-profile-icon" />
          </div>
        )}

      </div>

      {/* OVERLAY */}
      {menuOpen && (
        <div className="navx-overlay" onClick={() => setMenuOpen(false)} />
      )}

    </nav>
  );
}

export default Navbar;