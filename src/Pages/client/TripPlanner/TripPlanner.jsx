import React, { useState } from "react";
import "./TripPlanner.css";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaWallet,
  FaPlaneDeparture,
  FaClock,
  FaMagic,
} from "react-icons/fa";
import Footer from "../../../components/Footer/Footer";

const itineraryData = {
  Goa: [
    {
      day: "Day 1",
      activities: [
        {
          time: "09:00",
          act: "Arrive at Goa Airport & hotel check-in",
          cost: "—",
        },
        {
          time: "12:00",
          act: "Lunch at beach shack",
          cost: "₹800",
        },
        {
          time: "15:00",
          act: "Explore Baga & Calangute Beach",
          cost: "—",
        },
        {
          time: "20:00",
          act: "Sunset dinner at Thalassa",
          cost: "₹1,400",
        },
      ],
    },
  ],

  Delhi: [
    {
      day: "Day 1",
      activities: [
        {
          time: "09:00",
          act: "Visit India Gate & Rashtrapati Bhavan",
          cost: "—",
        },
        {
          time: "12:00",
          act: "Lunch at Connaught Place",
          cost: "₹1,000",
        },
        {
          time: "15:00",
          act: "Explore Red Fort & Chandni Chowk",
          cost: "₹500",
        },
        {
          time: "20:00",
          act: "Street food tour",
          cost: "₹700",
        },
      ],
    },
  ],

  Rajasthan: [
    {
      day: "Day 1",
      activities: [
        {
          time: "08:00",
          act: "Explore Jaipur City Palace",
          cost: "₹400",
        },
        {
          time: "11:00",
          act: "Visit Hawa Mahal",
          cost: "₹200",
        },
        {
          time: "14:00",
          act: "Traditional Rajasthani lunch",
          cost: "₹900",
        },
        {
          time: "18:00",
          act: "Camel ride & desert sunset",
          cost: "₹1,200",
        },
      ],
    },
  ],

  Kashmir: [
    {
      day: "Day 1",
      activities: [
        {
          time: "09:00",
          act: "Shikara ride on Dal Lake",
          cost: "₹600",
        },
        {
          time: "12:00",
          act: "Lunch at Srinagar cafe",
          cost: "₹700",
        },
        {
          time: "15:00",
          act: "Explore Mughal Gardens",
          cost: "₹300",
        },
        {
          time: "20:00",
          act: "Houseboat dinner",
          cost: "₹1,500",
        },
      ],
    },
  ],

  Meghalaya: [
    {
      day: "Day 1",
      activities: [
        {
          time: "08:00",
          act: "Visit Shillong Peak",
          cost: "₹200",
        },
        {
          time: "11:00",
          act: "Explore Elephant Falls",
          cost: "₹150",
        },
        {
          time: "14:00",
          act: "Lunch with local cuisine",
          cost: "₹700",
        },
        {
          time: "17:00",
          act: "Walk around Umiam Lake",
          cost: "₹400",
        },
      ],
    },
  ],

  Mumbai: [
    {
      day: "Day 1",
      activities: [
        {
          time: "09:00",
          act: "Visit Gateway of India",
          cost: "—",
        },
        {
          time: "12:00",
          act: "Lunch at Marine Drive",
          cost: "₹1,000",
        },
        {
          time: "15:00",
          act: "Explore Colaba Causeway",
          cost: "₹500",
        },
        {
          time: "20:00",
          act: "Mumbai nightlife experience",
          cost: "₹1,500",
        },
      ],
    },
  ],

  default: [
    {
      day: "Day 1",
      activities: [
        {
          time: "09:00",
          act: "Arrive & check in",
          cost: "—",
        },
        {
          time: "12:00",
          act: "Local lunch experience",
          cost: "₹700",
        },
        {
          time: "15:00",
          act: "Explore nearby attractions",
          cost: "₹300",
        },
        {
          time: "20:00",
          act: "Welcome dinner",
          cost: "₹1,000",
        },
      ],
    },
  ],
};

function TripPlanner() {
  const [pace, setPace] = useState("Moderate");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    destination: "Goa",
    date: "2026-05-10",
    days: 4,
    travellers: 2,
    budget: 30000,
    style: "Leisure",
  });

  const [itinerary, setItinerary] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateItinerary = () => {
    setLoading(true);

    setTimeout(() => {
      const data =
        itineraryData[formData.destination] || itineraryData.default;

      let finalData = [...data];

      if (formData.days > data.length) {
        for (let i = data.length; i < formData.days; i++) {
          finalData.push({
            day: `Day ${i + 1}`,
            activities: [
              {
                time: "09:00",
                act: "Leisure day — explore at your own pace",
                cost: `₹${Math.round(
                  formData.budget / formData.days
                ).toLocaleString("en-IN")}`,
              },
            ],
          });
        }
      }

      setItinerary(finalData.slice(0, formData.days));

      setLoading(false);
    }, 1200);
  };

  return (
    <div className="tripPlanner">
      <div className="plannerHeader">
        {/* <span className="plannerBadge">AI Powered</span> */}

        <h1>Smart Trip Planner</h1>

        <p>
          Create personalized travel itineraries with destination planning,
          budget estimation, and day-wise experiences.
        </p>
      </div>

      <div className="plannerCard">
        <div className="plannerGrid">
          {/* Destination */}
          <div className="inputGroup">
            <label>Destination</label>

            <div className="inputBox">
              <FaMapMarkerAlt />

              <select
                name="destination"
                value={formData.destination}
                onChange={handleChange}
              >
                <option value="Goa">Goa</option>
                <option value="Delhi">Delhi</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Kashmir">Kashmir</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mumbai">Mumbai</option>
              </select>
            </div>
          </div>

          {/* Date */}
          <div className="inputGroup">
            <label>Travel Date</label>

            <div className="inputBox">
              <FaCalendarAlt />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Days */}
          <div className="inputGroup">
            <label>Number of Days</label>

            <div className="inputBox">
              <FaClock />

              <input
                type="number"
                name="days"
                value={formData.days}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Travellers */}
          <div className="inputGroup">
            <label>Travellers</label>

            <div className="inputBox">
              <FaUsers />

              <input
                type="number"
                name="travellers"
                value={formData.travellers}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Budget */}
          <div className="inputGroup">
            <label>Budget</label>

            <div className="inputBox">
              <FaWallet />

              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Style */}
          <div className="inputGroup">
            <label>Travel Style</label>

            <div className="inputBox">
              <FaPlaneDeparture />

              <select
                name="style"
                value={formData.style}
                onChange={handleChange}
              >
                <option>Adventure</option>
                <option>Leisure</option>
                <option>Cultural</option>
                <option>Romantic</option>
                <option>Family</option>
                <option>Budget</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pace */}
        {/* <div className="paceWrapper">
          <label>Trip Pace</label>

          <div className="paceButtons">
            {["Relaxed", "Moderate", "Packed"].map((item) => (
              <button
                key={item}
                className={pace === item ? "paceBtn active" : "paceBtn"}
                onClick={() => setPace(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div> */}

        {/* Button */}
        <button className="generateBtn" onClick={generateItinerary}>
          <FaMagic />
          Generate My Itinerary
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="loadingBox">
          <div className="loader"></div>
          Crafting your perfect itinerary...
        </div>
      )}

      {/* Output */}
      {!loading && itinerary.length > 0 && (
        <div className="itineraryWrapper">
          <div className="itineraryHeader">
            <h2>
              {formData.destination} · {formData.style} Trip
            </h2>

            <p>
              {formData.days} Days · {formData.travellers} Travellers · Budget ₹
              {Number(formData.budget).toLocaleString("en-IN")}
            </p>
          </div>

          {itinerary.map((day, index) => (
            <div className="dayCard" key={index}>
              <div className="dayTitle">{day.day}</div>

              {day.activities.map((activity, i) => (
                <div className="activityRow" key={i}>
                  <div className="time">{activity.time}</div>

                  <div className="dot"></div>

                  <div className="activityContent">
                    <h4>{activity.act}</h4>

                    <span>Est. {activity.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <Footer/>
    </div>
  );
}

export default TripPlanner;