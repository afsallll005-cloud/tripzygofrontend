import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import API from "../../services/api";

import Navbar from "../../components/Navbar/Navbar";
import Amenities from "../../components/Amenities/Amenities";
import Footer from "../../components/Footer/Footer";

import "./HotelDetails.css";

import {
  FaMapMarkerAlt,
  FaClock,
  FaSearch,
} from "react-icons/fa";

function HotelDetails() {

  const { id } = useParams();

  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  const [hotel, setHotel] = useState({});
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    maxPrice: "",
    guests: "",
  });

  // FETCH HOTEL
  useEffect(() => {

    API.get(`/hotels/${id}`)

      .then((res) => {

        console.log("Hotel Details:", res.data);

        setHotel(res.data);
        setLoading(false);

      })

      .catch((err) => {

        console.error("Fetch Error:", err);

        setLoading(false);

      });

  }, [id]);

  // FILTER CHANGE
  const handleFilterChange = (e) => {

    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  // FILTERED ROOMS
  const filteredRooms =
    hotel.rooms?.filter((room) => {

      return (

        (!filters.search ||
          room.name
            .toLowerCase()
            .includes(filters.search.toLowerCase())) &&

        (!filters.maxPrice ||
          room.price <= Number(filters.maxPrice)) &&

        (!filters.guests ||
          room.maxPeople >= Number(filters.guests))

      );

    }) || [];

  // LOADING
  if (loading) {

    return (
      <h2 style={{ padding: "40px" }}>
        Loading Hotel...
      </h2>
    );

  }

  return (
    <>

      {/* NAVBAR */}
      <div className="container">
        <Navbar />
      </div>

      <div className="vogue-hotel-root">

        {/* HERO SECTION */}
        <div className="vogue-hero">

          <img
            src={
              hotel.hotelImages?.[0]
                ? `${API_URL}${hotel.hotelImages[0]}`
                : "/images/hotell.jpg"
            }
            alt={hotel.name}
            className="vogue-hero-img"
            onError={(e) => {
              e.target.src = "/images/hotell.jpg";
            }}
          />

          <div className="vogue-hero-overlay"></div>

          {/* HERO CONTENT */}
          <motion.div
            className="vogue-hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >

            <span className="vogue-hero-tag">
              Luxury Collection
            </span>

            <h1>
              Experience <br />
              Timeless Comfort
            </h1>

            <p>
              Discover rooms designed for elegance,
              crafted for unforgettable stays.
            </p>

            <button className="vogue-hero-btn">
              Explore Rooms
            </button>

          </motion.div>

        </div>

        {/* FILTER SECTION */}
        <section className="fzz-filter-section">

          <div className="fz-filter-title">
            Find Rooms
          </div>

          <div className="fz-filter-container">

            {/* SEARCH */}
            <div className="fz-filter-boxx">

              <FaMapMarkerAlt className="fz-icon" />

              <input
                type="text"
                name="search"
                placeholder="Search rooms..."
                value={filters.search}
                onChange={handleFilterChange}
              />

            </div>

            {/* MAX PRICE */}
            <div className="fz-filter-boxx">

              <FaClock className="fz-icon" />

              <input
                type="number"
                name="maxPrice"
                placeholder="Max Price (₹)"
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />

            </div>

            {/* GUESTS */}
            <div className="fz-filter-boxx">

              <FaMapMarkerAlt className="fz-icon" />

              <select
                name="guests"
                value={filters.guests}
                onChange={handleFilterChange}
              >

                <option value="">
                  Guests
                </option>

                <option value="1">
                  1+
                </option>

                <option value="2">
                  2+
                </option>

                <option value="3">
                  3+
                </option>

                <option value="4">
                  4+
                </option>

              </select>

            </div>

            {/* BUTTON */}
            <button className="fz-filter-btn">

              <FaSearch />

              Check Availability

            </button>

          </div>

        </section>

        {/* HEADER */}
        <header className="vogue-header-section">

          <span className="vogue-pre-title">
            LUXURY ROOMS
          </span>

          <h1 className="vogue-main-heading">

            WHERE LUXURY MEETS <br />
            UNFORGETTABLE MOMENTS

          </h1>

        </header>

        {/* HOTEL INFO */}
        {/* <div className="hotel-info-box">

          <h2>
            {hotel.name}
          </h2>

          <p>
            📍 {hotel.location}
          </p>

          <p>
            ⭐ {hotel.rating || "4.8"}
          </p>

        </div> */}

        {/* ROOM COUNT */}
        <div className="vogue-results-count">

          {filteredRooms.length} of{" "}
          {hotel.rooms?.length || 0} Rooms Available

        </div>

        {/* ROOMS */}
        <main className="vogue-room-gallery">

          {filteredRooms.length > 0 ? (

            filteredRooms.map((room) => (

              <motion.article
                key={room._id}
                className="vogue-chamber-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >

                {/* ROOM IMAGE */}
                <div className="vogue-media-wrapper">

                  <img
                    src={
                      room.roomImages?.[0]
                        ? `${API_URL}${room.roomImages[0]}`
                        : "/fallback.jpg"
                    }
                    alt={room.name}
                    className="vogue-chamber-img"
                    onError={(e) => {
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
                      ₹ {room.price}
                    </span>

                  </div>

                </div>

                {/* ROOM INFO */}
                <div className="vogue-chamber-info">

                  <h3 className="vogue-chamber-name">
                    {room.name}
                  </h3>

                  <div className="vogue-amenity-row">

                    <span>
                      {room.maxPeople} Guests
                    </span>

                    <span>
                      Luxury Room
                    </span>

                    <span>
                      Premium Bathroom
                    </span>

                  </div>

                  <Link
                    to={`/booking/${room._id}`}
                    className="vogue-book-anchor"
                  >
                    BOOK THIS ROOM
                  </Link>

                </div>

              </motion.article>

            ))

          ) : (

            <p className="vogue-no-results">
              No rooms match your filters.
            </p>

          )}

        </main>

        {/* EXTRA COMPONENTS */}
        <Amenities />

        <Footer />

      </div>

    </>
  );
}

export default HotelDetails;