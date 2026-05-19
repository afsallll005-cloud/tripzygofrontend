import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import API from "../../../services/api";

import Sidebar from "../../../components/Sidebar/Sidebar";

import "./ViewRooms.css";

function ViewRooms() {

  const { hotelId } = useParams();

  const navigate = useNavigate();

  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  const [rooms, setRooms] = useState([]);

  const [hotel, setHotel] = useState(null);

  const [loading, setLoading] = useState(true);

  /* ================= FETCH ROOMS ================= */

  useEffect(() => {

    fetchRooms();

  }, [hotelId]);

  const fetchRooms = async () => {

    try {

      setLoading(true);

      // ROOMS
      const roomRes = await API.get(
        `/rooms/hotel/${hotelId}`
      );

      console.log("ROOMS:", roomRes.data);

      setRooms(roomRes.data);

      // HOTEL DETAILS
      try {

        const hotelRes = await API.get(
          `/hotels/${hotelId}`
        );

        console.log("HOTEL:", hotelRes.data);

        setHotel(hotelRes.data);

      } catch (err) {

        console.log("HOTEL FETCH ERROR:", err);

      }

    } catch (err) {

      console.error(err);

      alert("Failed to load rooms ❌");

    } finally {

      setLoading(false);

    }

  };

  return (
    <>

      {/* SIDEBAR */}
      <Sidebar />

      <div className="rooms-page">

        {/* HERO SECTION */}
        <div className="rooms-hero">

          <div className="rooms-overlay"></div>

          <div className="rooms-hero-content">

            <span className="rooms-tag">
              Luxury Collection
            </span>

            <h1 className="rooms-main-title">

              Elegant Rooms <br />
              Crafted For Comfort

            </h1>

            <p className="rooms-subtitle">

              Discover premium stays designed
              with modern luxury and unforgettable experiences.

            </p>

            <div className="rooms-hero-buttons">

              <button
                className="hero-btn primary"
                onClick={() =>
                  navigate(`/add-room/${hotelId}`)
                }
              >
                Add New Room
              </button>

              <button
                className="hero-btn secondary"
                onClick={() => navigate(-1)}
              >
                Back
              </button>

            </div>

          </div>

        </div>

        {/* HOTEL INFO */}
        {hotel && (

          <div className="hotel-info-card">

            <div className="hotel-info-left">

              <h2>
                {hotel.name}
              </h2>

              <p>
                {hotel.description ||
                  "Experience luxury hospitality with elegant rooms, premium comfort, and unforgettable stays."}
              </p>

            </div>

            <div className="hotel-info-right">

              <span>
                📍 {hotel.city}
              </span>

              <span>
                ⭐ {hotel.rating || 4.8}
              </span>

              <span>
                🏨 Luxury Stay
              </span>

            </div>

          </div>

        )}

        {/* LOADING */}
        {loading && (

          <div className="room-loading-box">

            <h2>
              Loading Rooms...
            </h2>

          </div>

        )}

        {/* EMPTY */}
        {!loading && rooms.length === 0 && (

          <div className="room-empty-box">

            <img
              src="/fallback.jpg"
              alt="empty"
              className="room-empty-img"
            />

            <h2>
              No Rooms Found
            </h2>

            <p>
              Add luxury rooms for this hotel.
            </p>

            <button
              className="room-add-btn"
              onClick={() =>
                navigate(`/add-room/${hotelId}`)
              }
            >
              Add Room
            </button>

          </div>

        )}

        {/* ROOM GRID */}
        {!loading && rooms.length > 0 && (

          <div className="rooms-grid">

            {rooms.map((room) => (

              <div
                key={room._id}
                className="room-card"
              >

                {/* IMAGE */}
                <div className="room-image-wrapper">

                  {room.roomImages?.length > 0 ? (

                    <img
                      src={`${API_URL}${room.roomImages[0]}`}
                      alt={room.name}
                      className="room-image"
                      onError={(e) => {
                        e.target.src = "/fallback.jpg";
                      }}
                    />

                  ) : (

                    <img
                      src="/fallback.jpg"
                      alt="fallback"
                      className="room-image"
                    />

                  )}

                  {/* OVERLAY */}
                  <div className="room-overlay"></div>

                  {/* PRICE */}
                  <div className="room-price-tag">

                    ₹ {room.price}

                  </div>

                </div>

                {/* CONTENT */}
                <div className="room-content">

                  <div className="room-header">

                    <h3 className="room-name">
                      {room.name}
                    </h3>

                    <span className="room-rating">
                      ⭐ 4.9
                    </span>

                  </div>

                  {/* DETAILS */}
                  <div className="room-details">

                    <p>
                      👤 Max People:
                      <strong>
                        {" "} {room.maxPeople}
                      </strong>
                    </p>

                    <p>
                      🛏 Luxury Room
                    </p>

                  </div>

                  {/* FACILITIES */}
                  <div className="room-facilities-box">

                    {room.facilities?.length > 0 ? (

                      room.facilities
                        .slice(0, 4)
                        .map((facility, index) => (

                          <span
                            key={index}
                            className="facility-badge"
                          >
                            {facility}
                          </span>

                        ))

                    ) : (

                      <>

                        <span className="facility-badge">
                          Free WiFi
                        </span>

                        <span className="facility-badge">
                          AC
                        </span>

                        <span className="facility-badge">
                          Breakfast
                        </span>

                        <span className="facility-badge">
                          TV
                        </span>

                      </>

                    )}

                  </div>

                  {/* BUTTONS */}
                  <div className="room-btn-group">

                    <button
                      className="room-btn"
                      onClick={() =>
                        navigate(`/booking/${room._id}`)
                      }
                    >
                      BOOK NOW
                    </button>

                    <button
                      className="room-secondary-btn"
                      onClick={() =>
                        navigate(`/edit-room/${room._id}`)
                      }
                    >
                      EDIT
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

export default ViewRooms;