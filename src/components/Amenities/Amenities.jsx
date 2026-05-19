import React from "react";
import "./Amenities.css";
import {
  FaBath,
  FaWifi,
  FaClock,
  FaConciergeBell,
  FaParking,
  FaShuttleVan,
  FaDumbbell,
  FaSuitcase
} from "react-icons/fa";

const amenities = [
  { icon: <FaBath />, title: "Private Bath" },
  { icon: <FaWifi />, title: "High-speed Wifi" },
  { icon: <FaClock />, title: "24/7 Service" },
  { icon: <FaConciergeBell />, title: "Room Service" },
  { icon: <FaParking />, title: "Parking Space" },
  { icon: <FaShuttleVan />, title: "Shuttle Service" },
  { icon: <FaDumbbell />, title: "Gym & Spa" },
  { icon: <FaSuitcase />, title: "Luggage Storage" },
];

function Amenities() {
  return (
    <section className="amenities-section">
      <h2>AMENITIES</h2>
      <p className="subtitle">
        We've thought of it all. From the essentials to the little extras,
        your comfort is at the heart of everything we provide.
      </p>

      <div className="amenities-grid">
        {amenities.map((item, index) => (
          <div className="amenity-card" key={index}>
            <div className="icon">{item.icon}</div>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Amenities;