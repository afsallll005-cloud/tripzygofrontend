import React, { useState } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaSuitcaseRolling,
  FaHotel,
  FaPlane,
  FaUser,
  FaHeadset,
  FaSearch,
  FaBed,
  FaPlus,
  FaBars,
  FaTimes
} from "react-icons/fa";

function Sidebar() {

  const [open, setOpen] = useState(false);

  return (
    <>

      {/* MOBILE TOPBAR */}
      <div className="mobile-topbar">

        <h2 className="mobile-logo">TripzyGo</h2>

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* SIDEBAR */}
      <div className={`sidebar ${open ? "show-sidebar" : ""}`}>

        <h2 className="logo">TripzyGo</h2>

        <div className="menu">

          <p className="menu-title">MAIN</p>

          <NavLink
            to="/dashboard"
            className="menu-item"
            onClick={() => setOpen(false)}
          >
            <FaHome /> Dashboard
          </NavLink>

          <NavLink
            to="/view-packages"
            className="menu-item"
            onClick={() => setOpen(false)}
          >
            <FaSuitcaseRolling /> Packages
          </NavLink>

          <NavLink
            to="/hotels"
            className="menu-item"
            onClick={() => setOpen(false)}
          >
            <FaHotel /> Hotels
          </NavLink>

          <NavLink
            to="/rooms"
            className="menu-item"
            onClick={() => setOpen(false)}
          >
            <FaBed /> Rooms
          </NavLink>

          <NavLink
            to="/bookings"
            className="menu-item"
            onClick={() => setOpen(false)}
          >
            <FaPlane /> Bookings
          </NavLink>

          <NavLink
            to="/addHero"
            className="menu-item"
            onClick={() => setOpen(false)}
          >
            <FaPlus /> Add Hero
          </NavLink>

          <NavLink
            to="/addAbout"
            className="menu-item"
            onClick={() => setOpen(false)}
          >
            <FaPlus /> Add About
          </NavLink>

          <p className="menu-title">USER</p>

          <NavLink
            to="/profile"
            className="menu-item"
            onClick={() => setOpen(false)}
          >
            <FaUser /> Profile
          </NavLink>

          <NavLink
            to="/SupportPage"
            className="menu-item"
            onClick={() => setOpen(false)}
          >
            <FaHeadset /> Support
          </NavLink>

          <p className="menu-title">SEARCH</p>

          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search destinations..."
            />
          </div>

        </div>

      </div>

    </>
  );

}

export default Sidebar;