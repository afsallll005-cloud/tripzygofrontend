import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import API from "../../services/api";

import Sidebar from "../../components/Sidebar/Sidebar";

import "./Packages.css";

function Packages() {

  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  const [packages, setPackages] = useState([]);

  const [loading, setLoading] = useState(true);

  /* ================= FETCH PACKAGES ================= */

  useEffect(() => {

    fetchPackages();

  }, []);

  const fetchPackages = async () => {

    try {

      const res = await API.get("/packages");

      console.log("Packages:", res.data);

      setPackages(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  return (
    <>

      {/* SIDEBAR */}
      <Sidebar />

      <div className="PackageContainerpack">

        {/* HEADER */}
        <div className="package-top-section">

          <h1 className="package-main-heading">
            Travel Packages
          </h1>

          <p className="package-subtitle">
            Explore luxury destinations and
            unforgettable travel experiences.
          </p>

        </div>

        {/* LOADING */}
        {loading && (

          <div className="package-loading">

            <h2>
              Loading Packages...
            </h2>

          </div>

        )}

        {/* NO PACKAGES */}
        {!loading && packages.length === 0 && (

          <div className="package-loading">

            <h2>
              No Packages Found
            </h2>

          </div>

        )}

        {/* PACKAGE GRID */}
        {!loading && packages.length > 0 && (

          <div className="package-grid">

            {packages.map((pkg) => (

              <div
                key={pkg._id}
                className="package-card"
              >

                {/* IMAGE */}
                <div className="package-image-wrapper">

                  <img
                    src={
                      pkg.image
                        ? `${API_URL}${pkg.image}`
                        : "/fallback.jpg"
                    }
                    alt={pkg.title}
                    className="package-image"
                    onError={(e) => {
                      e.target.src = "/fallback.jpg";
                    }}
                  />

                  {/* PRICE */}
                  <div className="package-price-badge">

                    <span>
                      ₹ {pkg.price || "25000"}
                    </span>

                  </div>

                </div>

                {/* CONTENT */}
                <div className="package-content">

                  <h3 className="package-title">
                    {pkg.title}
                  </h3>

                  <p className="package-location">

                    📍 {pkg.destination || pkg.location}

                  </p>

                  <p className="package-description">

                    {pkg.description
                      ? pkg.description.slice(0, 90) + "..."
                      : "Luxury travel package crafted for unforgettable experiences."}

                  </p>

                  {/* INFO */}
                  <div className="package-info-row">

                    <span>
                      ⏳ {pkg.durationDays || 5} Days
                    </span>

                    <span>
                      ⭐ 4.8
                    </span>

                  </div>

                  {/* BUTTONS */}
                  <div className="package-btn-group">

                    <Link
                      to={`/package/${pkg._id}`}
                      className="package-view-btn"
                    >
                      View Details
                    </Link>

                    <Link
                      to={`/add-hotel/${pkg._id}`}
                      className="package-hotel-btn"
                    >
                      Add Hotels
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </>
  );
}

export default Packages;