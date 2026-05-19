import React, { useEffect, useState } from "react";
import "./Hero.css";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Hero() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        console.log("API URL:", API_URL);

        const res = await fetch(`${API_URL}/api/addhero`);

        console.log("Response Status:", res.status);

        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }

        const data = await res.json();

        console.log("Hero Data:", data);

        setHeroes(data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, [API_URL]);

  return (
    <>
      {/* HERO TOP */}
      <section className="hero">
        <div className="hero-top">
          <h1>
            ARMONIA <br />
            EXCURSIONS
          </h1>

          <div className="hero-right">
            <p>
              Curated journeys crafted for unforgettable experiences —
              discover the world with elegance and ease.
            </p>

            <a href="/#Packagecards">
              <button className="hero-rightside-Button">
                EXPLORE DESTINATIONS →
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* TRAVEL SECTION */}
      <section className="travel-section">

        {loading && <p>Loading experiences...</p>}

        {!loading && heroes.length === 0 && (
          <p>No travel data available</p>
        )}

        {!loading &&
          heroes.length > 0 &&
          heroes.map((item) => (
            <div className="ts-card" key={item._id}>

              <div className="ts-place">
                <h2>{item.mainDescription}</h2>
              </div>

              <img
                src={
                  item.heroimage
                    ? `${API_URL}${item.heroimage}`
                    : "/fallback.jpg"
                }
                alt="travel"
                className="ts-img"
                onError={(e) => {
                  e.target.src = "/fallback.jpg";
                }}
              />

              <div className="ts-info">

                <p className="ts-days">
                  ({item.days})
                </p>

                <h3 className="ts-heading">
                  {item.title}
                </h3>

                <p className="ts-price">
                  Starting from:{" "}
                  <span>${item.amount}</span>/person
                </p>

                <p className="ts-desc">
                  {item.desc}
                </p>

                <a href="/#Packagecards">
                  <button className="ts-btn">
                    More details
                  </button>
                </a>

              </div>
            </div>
          ))}
      </section>

      {/* FILTER SECTION */}
      <section className="fz-filter-section">

        <div className="fz-filter-title">
          Explore with AI
        </div>

        <div className="fz-filter-container">

          <div className="fz-filter-boxx">
            <FaMapMarkerAlt className="fz-icon" />

            <select>
              <option>Your Destination</option>
              <option>Delhi</option>
              <option>Rajasthan</option>
              <option>Kashmir</option>
              <option>Mumbai</option>
            </select>
          </div>

          <div className="fz-filter-boxx">
            <FaCalendarAlt className="fz-icon" />
            <input type="date" />
          </div>

          <div className="fz-filter-boxx">
            <FaClock className="fz-icon" />

            <select>
              <option>Total Duration</option>
              <option>1-3 Days</option>
              <option>4-7 Days</option>
            </select>
          </div>

          <Link to="/TripPlanner">
            <button className="fz-filter-btn">
              <FaSearch /> Check Availability
            </button>
          </Link>

        </div>
      </section>
    </>
  );
}

export default Hero;