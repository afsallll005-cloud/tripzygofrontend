import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import API from "../../../services/api";

import {
  FaUsers,
  FaHotel,
  FaSuitcaseRolling,
  FaMoneyBillWave,
  FaArrowUp,
  FaClock,
  FaMapMarkedAlt,
  FaBed,
} from "react-icons/fa";

function Dashboard() {

  /* ================= STATES ================= */

  const [stats, setStats] = useState({
    packages: 5,
    hotels: 15,
    rooms: 38,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {

      setLoading(true);

      /* FETCH ALL DATA */
      const packageRes = await API.get("/packages");
      const hotelRes = await API.get("/hotels");
      const roomRes = await API.get("/rooms");

      /* TOTAL COUNTS */
      setStats({
        packages: packageRes.data.length,
        hotels: hotelRes.data.length,
        rooms: roomRes.data.length,

        // Example revenue calculation
        revenue: roomRes.data.reduce(
          (total, room) => total + Number(room.price || 0),
          0
        ),
      });

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="dashboardMain">

        {/* HEADER */}
        <div className="dashboardHeader">

          <div>
            <h1>Admin Dashboard</h1>

            <p>
              Manage travel packages, hotels, rooms and bookings
            </p>
          </div>

          {/* <div className="dashboardProfile">
            <img
              src="https://i.pravatar.cc/100"
              alt="admin"
            />

            <div>
              <h4>Admin</h4>
              <span>Travel Management</span>
            </div>
          </div> */}

        </div>

        {/* STATS */}
        <div className="statsGrid">

          {/* PACKAGES */}
          <div className="statsCard">

            <div className="statsIcon blue">
              <FaSuitcaseRolling />
            </div>

            <div>
              <h2>
                {loading ? "..." : stats.packages}
              </h2>

              <p>Total Packages</p>
            </div>

            <span className="growth">
              <FaArrowUp /> Active
            </span>

          </div>

          {/* HOTELS */}
          <div className="statsCard">

            <div className="statsIcon green">
              <FaHotel />
            </div>

            <div>
              <h2>
                {loading ? "..." : stats.hotels}
              </h2>

              <p>Total Hotels</p>
            </div>

            <span className="growth">
              <FaArrowUp /> Live
            </span>

          </div>

          {/* ROOMS */}
          <div className="statsCard">

            <div className="statsIcon orange">
              <FaBed />
            </div>

            <div>
              <h2>
                {loading ? "..." : stats.rooms}
              </h2>

              <p>Total Rooms</p>
            </div>

            <span className="growth">
              <FaArrowUp /> Available
            </span>

          </div>

          {/* REVENUE */}
          <div className="statsCard">

            <div className="statsIcon purple">
              <FaMoneyBillWave />
            </div>

            <div>
              <h2>
                ₹{loading ? "..." : stats.revenue}
              </h2>

              <p>Total Revenue</p>
            </div>

            <span className="growth">
              <FaArrowUp /> Income
            </span>

          </div>

        </div>

        {/* CONTENT */}
        <div className="dashboardContent">

          {/* QUICK ACTIONS */}
          {/* <div className="dashboardCard">

            <div className="cardHeader">
              <h3>Quick Actions</h3>
            </div>

            <div className="actionsGrid">

              <button className="actionBtn">
                <FaSuitcaseRolling />
                Add Package
              </button>

              <button className="actionBtn">
                <FaHotel />
                Add Hotel
              </button>

              <button className="actionBtn">
                <FaBed />
                Add Room
              </button>

              <button className="actionBtn">
                <FaMapMarkedAlt />
                Destinations
              </button>

              <button className="actionBtn">
                <FaClock />
                Manage Bookings
              </button>

              <button className="actionBtn">
                <FaUsers />
                Customers
              </button>

            </div>

          </div> */}

        </div>

      </div>
    </div>
  );
}

export default Dashboard;