import { useEffect, useState } from "react";

import API from "../../../services/api";

import Sidebar from "../../../components/Sidebar/Sidebar";

import { useNavigate } from "react-router-dom";

import "./ViewPackage.css";

function ViewPackages() {

  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  const [packages, setPackages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showDeleted, setShowDeleted] = useState(false);

  const navigate = useNavigate();

  /* ================= FETCH PACKAGES ================= */

  useEffect(() => {

    fetchPackages();

  }, [showDeleted]);

  const fetchPackages = async () => {

    try {

      setLoading(true);

      const res = await API.get(
        `/packages?deleted=${showDeleted}`
      );

      console.log("PACKAGES:", res.data);

      setPackages(res.data);

    } catch (err) {

      console.log("FETCH ERROR:", err);

    } finally {

      setLoading(false);

    }

  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this package?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/packages/${id}`);

      alert("Package Deleted ✅");

      fetchPackages();

    } catch (err) {

      console.log(err);

      alert("Delete Failed ❌");

    }

  };

  /* ================= RESTORE ================= */

  const handleRestore = async (id) => {

    try {

      await API.put(`/packages/restore/${id}`);

      alert("Package Restored ✅");

      fetchPackages();

    } catch (err) {

      console.log(err);

      alert("Restore Failed ❌");

    }

  };

  return (
    <div className="vp-maincontainer">

      {/* SIDEBAR */}
      <Sidebar />

      <div className="vp-container">

        {/* TOP BAR */}
        <div className="vp-topbar">

          <div>

            <h2 className="vp-title">

              {showDeleted
                ? "Deleted Packages"
                : "All Packages"}

            </h2>

            <p className="vp-subtitle">

              Manage all travel destinations
              and luxury packages.

            </p>

          </div>

          <div className="vp-actions">

            <button
              className="btn revolt"
              onClick={() =>
                setShowDeleted(!showDeleted)
              }
            >

              {showDeleted
                ? "Show Active"
                : "Revolt (Trash)"}

            </button>

            {!showDeleted && (

              <button
                className="btn add"
                onClick={() =>
                  navigate("/add-package")
                }
              >
                Add Package
              </button>

            )}

          </div>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="vp-loading">

            <h2>
              Loading Packages...
            </h2>

          </div>

        ) : packages.length === 0 ? (

          <div className="vp-loading">

            <h2>
              No Packages Found
            </h2>

          </div>

        ) : (

          /* GRID */
          <div className="vp-grid">

            {packages.map((pkg) => (

              <div
                className="vp-card"
                key={pkg._id}
              >

                {/* IMAGE */}
                <div className="vp-image-wrapper">

                  <img
                    src={
                      pkg.image
                        ? `${API_URL}${pkg.image}`
                        : "/fallback.jpg"
                    }
                    alt={pkg.title}
                    className="vp-img"
                    onError={(e) => {
                      e.target.src = "/fallback.jpg";
                    }}
                  />

                  {/* PRICE */}
                  <div className="vp-price">

                    ₹ {pkg.price}

                  </div>

                </div>

                {/* CONTENT */}
                <div className="vp-content">

                  <h3>
                    {pkg.title}
                  </h3>

                  <p className="vp-destination">

                    📍 {pkg.destination}

                  </p>

                  {/* META */}
                  <div className="vp-meta">

                    <span>
                      ⏳ {pkg.durationDays || 5} Days
                    </span>

                    <span>
                      ⭐ {pkg.rating || 4.8}
                    </span>

                  </div>

                  {/* DESCRIPTION */}
                  <p className="vp-desc">

                    {pkg.description
                      ? pkg.description.slice(0, 100) + "..."
                      : "Luxury travel package with premium destinations and unforgettable experiences."}

                  </p>

                  {/* BUTTONS */}
                  <div className="vp-btns">

                    {!showDeleted ? (

                      <>

                        <button
                          className="edit-btn"
                          onClick={() =>
                            navigate(
                              `/edit-package/${pkg._id}`
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(pkg._id)
                          }
                        >
                          Delete
                        </button>

                      </>

                    ) : (

                      <button
                        className="restore-btn"
                        onClick={() =>
                          handleRestore(pkg._id)
                        }
                      >
                        Restore
                      </button>

                    )}

                    {/* ADD HOTELS */}
                    {!showDeleted && (

                      <button
                        className="hotel-btn"
                        onClick={() =>
                          navigate(
                            `/add-hotel/${pkg._id}`
                          )
                        }
                      >
                        Add Hotels
                      </button>

                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default ViewPackages;