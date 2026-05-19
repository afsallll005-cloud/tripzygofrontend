import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import {
  FaUserCircle,
  FaMapMarkerAlt
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import API from "../../../services/api";

import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/Navbar/Navbar";

function UserProfile() {

  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  // FETCH PROFILE
  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await API.get(
          "/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setUser(res.data);

      } catch (err) {

        console.log(
          err.response?.data || err.message
        );

      }

    };

    if (token) fetchProfile();

  }, [token]);

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");

    window.location.reload();

  };

  return (

    <>

      <div className="container">

        <Navbar />

        <div className="uxp-profile-root">

          <div className="uxp-layout-grid">

            {/* SIDEBAR */}
            <aside className="uxp-sidebar-panel">

              <FaUserCircle className="uxp-avatar-icon" />

              <h2 className="uxp-user-name">
                {user?.name}
              </h2>

              <p className="uxp-user-role">
                {user?.role}
              </p>

              <div className="uxp-user-location">
                <FaMapMarkerAlt />
                Kerala, India
              </div>

              {/* ADMIN DASHBOARD BUTTON */}
              {
                user?.role === "admin" && (

                  <button
                    className="uxp-dashboard-btn"
                    onClick={() => navigate("/dashboard")}
                  >
                    View Dashboard
                  </button>

                )
              }

              {/* LOGOUT BUTTON */}
              <button
                className="uxp-logout-action"
                onClick={logout}
              >
                Logout
              </button>

            </aside>

            {/* MAIN CONTENT */}
            <section className="uxp-main-panel">

              <div className="uxp-header-bar">

                <h1 className="uxp-header-title">
                  {user?.name}
                </h1>

                <span className="uxp-status-pill">
                  Active
                </span>

              </div>

              {/* USER INFO */}
              <div className="uxp-info-block">

                <h3 className="uxp-section-title">
                  Contact Information
                </h3>

                <div className="uxp-info-line">
                  <span>Email</span>
                  <p>{user?.email}</p>
                </div>

                <div className="uxp-info-line">
                  <span>Role</span>
                  <p>{user?.role}</p>
                </div>

                <div className="uxp-info-line">
                  <span>Location</span>
                  <p>Kerala, India</p>
                </div>

              </div>

            </section>

          </div>

        </div>

        <Footer />

      </div>

    </>

  );

}

export default UserProfile;