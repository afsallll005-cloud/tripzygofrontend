import React, { useEffect, useState, useRef } from "react";
import "./PackageCard.css";
import API from "../../services/api";

import {
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function PackageCards() {

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef();
  const navigate = useNavigate();

  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchPackages();
  }, []);

  // FETCH PACKAGES
  const fetchPackages = async () => {

    try {

      const res = await API.get("/packages");

      console.log("Packages:", res.data);

      setTours(res.data);

    } catch (err) {

      console.error("Fetch Error:", err);

    } finally {

      setLoading(false);

    }
  };

  // SCROLL LEFT
  const scrollLeft = () => {

    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });

  };

  // SCROLL RIGHT
  const scrollRight = () => {

    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });

  };

  // CARD CLICK
  const handleCardClick = (id) => {
    navigate(`/package/${id}`);
  };

  return (
    <div id="Packagecards">

      <section className="destination-section">

        {/* HEADER */}
        <div className="destination-header">

          <h2>
            Top Destinations
          </h2>

          {/* <p>
            Discover handpicked travel experiences
            crafted for unforgettable memories.
          </p> */}

        </div>

        {/* LOADING */}
        {loading && (
          <p className="loading-text">
            Loading packages...
          </p>
        )}

        {/* EMPTY */}
        {!loading && tours.length === 0 && (
          <p className="loading-text">
            No packages available
          </p>
        )}

        {/* PACKAGE SECTION */}
        <div className="destination-wrapper">

          <div
            className="destination-grid"
            ref={scrollRef}
          >

            {!loading &&
              tours.map((tour) => (

                <div
                  className="destination-card"
                  key={tour._id}
                  onClick={() => handleCardClick(tour._id)}
                >

                  {/* IMAGE */}
                  <img
                    src={
                      tour.image
                        ? `${API_URL}${tour.image}`
                        : "/fallback.jpg"
                    }
                    alt={tour.title}
                    onError={(e) => {
                      e.target.src = "/fallback.jpg";
                    }}
                  />

                  {/* PRICE */}
                  <div className="price-badge">
                    ₹ {tour.price}
                  </div>

                  {/* CONTENT */}
                  <div className="card-overlay">

                    <h3>
                      {tour.title}
                    </h3>

                    <p className="tour-days">
                      {tour.days}
                    </p>

                    <div className="bottom">

                      <span>
                        📍 {tour.location}
                      </span>

                      <span>
                        ⭐ {tour.rating || "4.8"}
                      </span>

                    </div>

                  </div>

                </div>

              ))}

          </div>

          {/* SCROLL BUTTONS */}
          <div className="scroll-buttons-bottom">

            <button onClick={scrollLeft}>
              <FaArrowLeft />
            </button>

            <button onClick={scrollRight}>
              <FaArrowRight />
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default PackageCards;