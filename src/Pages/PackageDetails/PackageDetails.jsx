import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import API from "../../services/api";

import "./PackageDetails.css";

import Navbar from "../../components/Navbar/Navbar";
import VisitorReviews from "../../components/VisitorReviews/VisitorReviews";
import Footer from "../../components/Footer/Footer";
import ContactForm from "../../components/ContactForm/ContactForm";

import {
  FaCheckCircle,
  FaRegTimesCircle,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaClock,
} from "react-icons/fa";

function PackageDetails() {

  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  const { id } = useParams();

  const [data, setData] = useState({});

  const [loading, setLoading] = useState(true);

  /* ================= FETCH PACKAGE ================= */

  useEffect(() => {

    const fetchPackage = async () => {

      try {

        const res = await API.get(`/packages/${id}`);

        console.log("PACKAGE RESPONSE:", res.data);

        console.log("HOTELS ARRAY:", res.data.hotels);

        setData(res.data);

      } catch (err) {

        console.log("FETCH ERROR:", err);

      } finally {

        setLoading(false);

      }

    };

    fetchPackage();

  }, [id]);

  /* ================= LOADING ================= */

  if (loading) {

    return (

      <h2 style={{ padding: "40px" }}>
        Loading...
      </h2>

    );

  }

  return (
    <div className="container">

      {/* NAVBAR */}
      <Navbar />

      <div className="pdx-wrapper">

        {/* HERO SECTION */}
        <div className="vogue-hero">

          {data.image && (

            <img
              src={
                data.image
                  ? `${API_URL}${data.image}`
                  : "/fallback.jpg"
              }
              alt={data.title}
              className="vogue-hero-img"
              onError={(e) => {

                console.log("IMAGE ERROR:", data.image);

                e.target.src = "/fallback.jpg";

              }}
            />

          )}

          <div className="vogue-hero-overlay"></div>

          {/* HERO CONTENT */}
          <motion.div
            className="vogue-hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >

            <span className="vogue-hero-tag">

              {data.destination || "Luxury Collection"}

            </span>

            <h1>
              DREAM <br />
              DESTINATIONS
            </h1>

            <p>
              Design journeys that transform moments
              into lasting memories
            </p>

            <button className="vogue-hero-btn">
              Explore Package
            </button>

          </motion.div>

        </div>

        {/* CONTENT AREA */}
        <div className="pdx-content-shell">

          <div className="pdx-main-grid">

            {/* LEFT */}
            <div className="pdx-left-col">

              <h1 className="pdx-h1title">
                {data.title}
              </h1>

              <p className="pdx-description">
                {data.description}
              </p>

              {/* META */}
              <div className="pdx-meta-grid">

                <div>

                  <FaMapMarkerAlt className="meta-icon" />

                  <span>
                    <b>Destination:</b> {data.destination}
                  </span>

                </div>

                <div>

                  <FaRupeeSign className="meta-icon" />

                  <span>
                    <b>Price:</b> ₹ {data.price}
                  </span>

                </div>

                <div>

                  <FaClock className="meta-icon" />

                  <span>
                    <b>Duration:</b> {data.durationDays} Days
                  </span>

                </div>

              </div>

              <hr className="pdx-divider" />

              {/* INCLUDES */}
              <div className="pdx-list-sectionn">

                <h2>
                  Includes
                </h2>

                <ul className="pdx-feature-list">

                  <li>
                    <FaCheckCircle className="icon-check" />
                    Premium luxury stay with comfort
                  </li>

                  <li>
                    <FaCheckCircle className="icon-check" />
                    Guided tours with expert professionals
                  </li>

                  <li>
                    <FaCheckCircle className="icon-check" />
                    Complimentary breakfast with fresh options
                  </li>

                  <li>
                    <FaCheckCircle className="icon-check" />
                    Airport pickup and drop service
                  </li>

                </ul>

              </div>

              {/* EXCLUDES */}
              <div className="pdx-list-sectionn">

                <h2>
                  Excludes
                </h2>

                <ul className="pdx-feature-list">

                  <li>
                    <FaRegTimesCircle className="icon-cross" />
                    International and domestic flight tickets
                  </li>

                  <li>
                    <FaRegTimesCircle className="icon-cross" />
                    Personal expenses during the entire trip
                  </li>

                  <li>
                    <FaRegTimesCircle className="icon-cross" />
                    Travel insurance not included in package
                  </li>

                </ul>

              </div>

            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="pdx-sidebar">

              <div className="pdx-form-sticky">

                <h3>
                  Send Enquiry
                </h3>

                <div className="pdx-accent-line"></div>

                <ContactForm />

              </div>

            </aside>

          </div>

          {/* HOTEL SECTION */}
          <div className="pdx-section-contain">

            <h2 className="pdx-section-heading">
              HOTELS
            </h2>

            <p className="pdx-section-p">
              Handpicked stays where comfort meets elegance,
              offering a refined experience in every destination.
            </p>

          </div>

          {/* HOTEL GRID */}
          <div id="HotelCardsHerorrr">

            {/* DEBUG */}
            {console.log("FULL DATA:", data)}
            {console.log("HOTELS:", data.hotels)}

            <div className="vogue-room-gallery">

              {data.hotels?.length > 0 ? (

                data.hotels.map((hotel, index) => {

                  console.log("HOTEL:", hotel);

                  return (

                    <div
                      key={hotel._id || index}
                      className="vogue-chamber-card"
                    >

                      {/* IMAGE */}
                      <div className="vogue-media-wrapper">

                        <img
                          src={
                            hotel.images?.[0]
                              ? `${API_URL}${hotel.images[0]}`
                              : "/fallback.jpg"
                          }
                          alt={hotel.name}
                          className="vogue-chamber-img"
                          onError={(e) => {

                            console.log(
                              "HOTEL IMAGE ERROR:",
                              hotel.images?.[0]
                            );

                            e.target.src = "/fallback.jpg";

                          }}
                        />

                        {/* PRICE */}
                        <div className="vogue-price-badge">

                          <span className="vogue-per-night">
                            PER <br />
                            NIGHT
                          </span>

                          <span className="vogue-price-val">

                            ₹ {hotel.price || data.price}

                          </span>

                        </div>

                      </div>

                      {/* CONTENT */}
                      <h3 className="vogue-chamber-name">

                        {hotel.name}

                      </h3>

                      <div className="vogue-amenity-row">

                        <span>
                          Luxury Stay
                        </span>

                        <span>
                          Premium Comfort
                        </span>

                      </div>

                      <Link
                        to={`/hotel/${hotel._id}`}
                        className="vogue-book-anchor"
                      >
                        VIEW ROOMS →
                      </Link>

                    </div>

                  );

                })

              ) : (

                <>

                  {console.log("NO HOTELS AVAILABLE")}

                  <p className="loading-text">
                    No hotels available
                  </p>

                </>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* REVIEWS */}
      <VisitorReviews />

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default PackageDetails;