import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import API from "../../../services/api";

import Sidebar from "../../../components/Sidebar/Sidebar";

import "./PackageHotels.css";

function PackageHotels() {

  const { id } = useParams();

  const navigate = useNavigate();

  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  const [hotels, setHotels] = useState([]);

  const [packageData, setPackageData] = useState(null);

  const [loading, setLoading] = useState(true);

  /* ================= FETCH HOTELS ================= */

  useEffect(() => {

    fetchHotels();

  }, [id]);

  const fetchHotels = async () => {

    try {

      setLoading(true);

      // HOTELS
      const hotelRes = await API.get(
        `/hotels/package/${id}`
      );

      console.log("HOTELS:", hotelRes.data);

      setHotels(hotelRes.data);

      // PACKAGE
      try {

        const packageRes = await API.get(
          `/packages/${id}`
        );

        console.log("PACKAGE:", packageRes.data);

        setPackageData(packageRes.data);

      } catch (err) {

        console.log("PACKAGE FETCH ERROR:", err);

      }

    } catch (err) {

      console.error("HOTEL FETCH ERROR:", err);

      alert("Failed to load hotels ❌");

    } finally {

      setLoading(false);

    }

  };

  return (
    <>

      {/* SIDEBAR */}
      <Sidebar />

      <div className="hotel-wrapper">

        {/* HERO */}
        <div className="hotel-hero-section">

          {/* BACKGROUND IMAGE */}
          <div className="hotel-hero-overlay"></div>

          <div className="hotel-hero-content">

            <span className="hotel-tag">
              Luxury Collection
            </span>

            <h1 className="hotel-main-title">

              Premium Hotels <br />
              For Your Journey

            </h1>

            <p className="hotel-subtitle">

              Explore handpicked luxury stays
              crafted for unforgettable travel experiences.

            </p>

            <div className="hotel-top-buttons">

              <button
                className="hero-btn primary"
                onClick={() =>
                  navigate(`/add-hotel/${id}`)
                }
              >
                Add New Hotel
              </button>

              <button
                className="hero-btn secondary"
                onClick={() =>
                  navigate("/view-packages")
                }
              >
                Back Packages
              </button>

            </div>

          </div>

        </div>

        {/* PACKAGE INFO */}
        {packageData && (

          <div className="package-info-card">

            <div className="package-info-left">

              <h2>
                {packageData.title}
              </h2>

              <p>
                {packageData.description}
              </p>

            </div>

            <div className="package-info-right">

              <span>
                📍 {packageData.destination}
              </span>

              <span>
                ⏳ {packageData.durationDays || 5} Days
              </span>

              <span>
                ₹ {packageData.price}
              </span>

            </div>

          </div>

        )}

        {/* LOADING */}
        {loading && (

          <div className="hotel-loading-box">

            <h2>
              Loading Hotels...
            </h2>

          </div>

        )}

        {/* EMPTY */}
        {!loading && hotels.length === 0 && (

          <div className="hotel-empty-box">

            <img
              src="/fallback.jpg"
              alt="empty"
              className="hotel-empty-img"
            />

            <h2>
              No Hotels Found
            </h2>

            <p>
              Start by adding luxury hotels
              for this package.
            </p>

            <button
              className="hotel-add-btn"
              onClick={() =>
                navigate(`/add-hotel/${id}`)
              }
            >
              Add Hotel
            </button>

          </div>

        )}

        {/* HOTEL GRID */}
        {!loading && hotels.length > 0 && (

          <div className="hotel-grid">

            {hotels.map((hotel) => (

              <div
                className="hotel-card"
                key={hotel._id}
              >

                {/* IMAGE */}
                <div className="hotel-image-wrapper">

                  <img
                    src={
                      hotel.images?.[0]
                        ? `${API_URL}${hotel.images[0]}`
                        : "/fallback.jpg"
                    }
                    alt={hotel.name}
                    className="hotel-image"
                    onError={(e) => {
                      e.target.src = "/fallback.jpg";
                    }}
                  />

                  {/* OVERLAY */}
                  <div className="hotel-overlay"></div>

                  {/* PRICE */}
                  <div className="hotel-price">

                    <small>
                      PER <br />
                      NIGHT
                    </small>

                    <h3>
                      ₹ {hotel.hotelPrice?.toLocaleString() || 0}
                    </h3>
                  </div>

                </div>

                {/* CONTENT */}
                <div className="hotel-content">

                  <div className="hotel-header">

                    <h2 className="hotel-name">
                      {hotel.name}
                    </h2>

                    <span className="hotel-rating">
                      ⭐ {hotel.rating || 4.8}
                    </span>

                  </div>

                  {/* LOCATION */}
                  <p className="hotel-location">

                    📍 {hotel.city || "Luxury City"}

                  </p>

                  {/* DESCRIPTION */}
                  <p className="hotel-description">

                    {hotel.description ||
                      "Experience world-class hospitality with elegant interiors, premium facilities, and unforgettable comfort."}

                  </p>

                  {/* AMENITIES */}
                  <div className="hotel-amenities">

                    {hotel.amenities?.length > 0 ? (

                      hotel.amenities
                        .slice(0, 4)
                        .map((item, index) => (

                          <span key={index}>
                            {item}
                          </span>

                        ))

                    ) : (

                      <>

                        <span>Free WiFi</span>

                        <span>Pool</span>

                        <span>Breakfast</span>

                        <span>Spa</span>

                      </>

                    )}

                  </div>

                  {/* BUTTONS */}
                  <div className="hotel-btn-group">

                    <button
                      className="hotel-btn"
                      onClick={() =>
                        navigate(
                          `/add-room/${hotel._id}`
                        )
                      }
                    >
                      VIEW ROOMS →
                    </button>

                    <button
                      className="hotel-secondary-btn"
                      onClick={() =>
                        navigate(`/hotel/${hotel._id}`)
                      }
                    >
                      DETAILS
                    </button>

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

export default PackageHotels;