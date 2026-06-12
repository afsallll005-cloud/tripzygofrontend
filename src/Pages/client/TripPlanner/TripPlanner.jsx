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

  {
    day: "Day 2",
    activities: [
      {
        time: "08:00",
        act: "Breakfast at hotel",
        cost: "₹400",
      },
      {
        time: "10:00",
        act: "Water sports at Baga Beach",
        cost: "₹2,000",
      },
      {
        time: "14:00",
        act: "Lunch at Britto's",
        cost: "₹1,000",
      },
      {
        time: "18:00",
        act: "Visit Fort Aguada",
        cost: "₹100",
      },
      {
        time: "21:00",
        act: "Nightlife at Tito's Lane",
        cost: "₹1,500",
      },
    ],
  },

  {
    day: "Day 3",
    activities: [
      {
        time: "08:00",
        act: "South Goa sightseeing",
        cost: "₹500",
      },
      {
        time: "10:00",
        act: "Visit Colva Beach",
        cost: "—",
      },
      {
        time: "13:00",
        act: "Lunch at beach restaurant",
        cost: "₹900",
      },
      {
        time: "16:00",
        act: "Explore Cabo de Rama Fort",
        cost: "₹100",
      },
      {
        time: "19:30",
        act: "Beachside dinner",
        cost: "₹1,200",
      },
    ],
  },

  {
    day: "Day 4",
    activities: [
      {
        time: "07:00",
        act: "Dudhsagar Waterfalls trip",
        cost: "₹2,500",
      },
      {
        time: "13:00",
        act: "Lunch near Dudhsagar",
        cost: "₹700",
      },
      {
        time: "16:00",
        act: "Spice Plantation tour",
        cost: "₹800",
      },
      {
        time: "20:00",
        act: "Dinner at local Goan restaurant",
        cost: "₹1,000",
      },
    ],
  },

  {
    day: "Day 5",
    activities: [
      {
        time: "09:00",
        act: "Shopping at Anjuna Flea Market",
        cost: "₹1,500",
      },
      {
        time: "13:00",
        act: "Lunch at Anjuna Beach",
        cost: "₹800",
      },
      {
        time: "16:00",
        act: "Relax at Vagator Beach",
        cost: "—",
      },
      {
        time: "19:00",
        act: "Farewell sunset cruise",
        cost: "₹1,200",
      },
      {
        time: "22:00",
        act: "Pack and prepare for departure",
        cost: "—",
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

  {
    day: "Day 2",
    activities: [
      {
        time: "09:00",
        act: "Visit Qutub Minar",
        cost: "₹600",
      },
      {
        time: "12:00",
        act: "Lunch at Hauz Khas Village",
        cost: "₹1,200",
      },
      {
        time: "15:00",
        act: "Explore Hauz Khas Fort & Lake",
        cost: "—",
      },
      {
        time: "19:00",
        act: "Shopping at Select Citywalk Mall",
        cost: "₹2,000",
      },
    ],
  },

  {
    day: "Day 3",
    activities: [
      {
        time: "08:30",
        act: "Visit Humayun's Tomb",
        cost: "₹600",
      },
      {
        time: "11:30",
        act: "Explore Lodhi Garden",
        cost: "—",
      },
      {
        time: "13:00",
        act: "Lunch at Khan Market",
        cost: "₹1,000",
      },
      {
        time: "17:00",
        act: "Visit Lotus Temple",
        cost: "—",
      },
      {
        time: "20:00",
        act: "Dinner at a fine-dining restaurant",
        cost: "₹1,500",
      },
    ],
  },

  {
    day: "Day 4",
    activities: [
      {
        time: "09:00",
        act: "Akshardham Temple visit",
        cost: "₹500",
      },
      {
        time: "13:00",
        act: "Lunch near Akshardham",
        cost: "₹800",
      },
      {
        time: "15:00",
        act: "National Museum tour",
        cost: "₹300",
      },
      {
        time: "19:00",
        act: "Explore Dilli Haat",
        cost: "₹1,000",
      },
    ],
  },

  {
    day: "Day 5",
    activities: [
      {
        time: "09:00",
        act: "Shopping at Sarojini Nagar Market",
        cost: "₹2,000",
      },
      {
        time: "13:00",
        act: "Lunch at local café",
        cost: "₹800",
      },
      {
        time: "15:00",
        act: "Visit Agrasen ki Baoli",
        cost: "—",
      },
      {
        time: "18:00",
        act: "Evening walk at Connaught Place",
        cost: "—",
      },
      {
        time: "20:00",
        act: "Farewell dinner",
        cost: "₹1,500",
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

  {
    day: "Day 2",
    activities: [
      {
        time: "08:00",
        act: "Visit Amber Fort",
        cost: "₹500",
      },
      {
        time: "11:30",
        act: "Explore Jal Mahal",
        cost: "—",
      },
      {
        time: "13:30",
        act: "Lunch at local restaurant",
        cost: "₹800",
      },
      {
        time: "16:00",
        act: "Shopping at Johari Bazaar",
        cost: "₹1,500",
      },
      {
        time: "20:00",
        act: "Dinner with cultural show",
        cost: "₹1,200",
      },
    ],
  },

  {
    day: "Day 3",
    activities: [
      {
        time: "07:00",
        act: "Travel to Udaipur",
        cost: "₹1,500",
      },
      {
        time: "12:00",
        act: "Lunch near Lake Pichola",
        cost: "₹900",
      },
      {
        time: "15:00",
        act: "Boat ride on Lake Pichola",
        cost: "₹600",
      },
      {
        time: "18:00",
        act: "Visit City Palace Udaipur",
        cost: "₹400",
      },
      {
        time: "20:00",
        act: "Dinner overlooking the lake",
        cost: "₹1,200",
      },
    ],
  },

  {
    day: "Day 4",
    activities: [
      {
        time: "08:00",
        act: "Explore Sajjangarh (Monsoon Palace)",
        cost: "₹300",
      },
      {
        time: "11:00",
        act: "Visit Saheliyon Ki Bari",
        cost: "₹100",
      },
      {
        time: "13:00",
        act: "Traditional lunch",
        cost: "₹800",
      },
      {
        time: "16:00",
        act: "Explore local handicraft markets",
        cost: "₹1,000",
      },
      {
        time: "19:00",
        act: "Cultural folk dance performance",
        cost: "₹700",
      },
    ],
  },

  {
    day: "Day 5",
    activities: [
      {
        time: "07:00",
        act: "Travel to Jaisalmer",
        cost: "₹2,000",
      },
      {
        time: "13:00",
        act: "Lunch in Jaisalmer",
        cost: "₹900",
      },
      {
        time: "15:00",
        act: "Explore Jaisalmer Fort",
        cost: "₹300",
      },
      {
        time: "18:00",
        act: "Desert safari and camel ride",
        cost: "₹1,800",
      },
      {
        time: "21:00",
        act: "Overnight desert camp",
        cost: "₹2,500",
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

  {
    day: "Day 2",
    activities: [
      {
        time: "08:00",
        act: "Visit Gulmarg",
        cost: "₹1,500",
      },
      {
        time: "11:00",
        act: "Gondola cable car ride",
        cost: "₹900",
      },
      {
        time: "13:00",
        act: "Lunch with mountain views",
        cost: "₹800",
      },
      {
        time: "15:00",
        act: "Explore meadows & photography",
        cost: "—",
      },
      {
        time: "19:00",
        act: "Return to Srinagar",
        cost: "₹500",
      },
    ],
  },

  {
    day: "Day 3",
    activities: [
      {
        time: "07:00",
        act: "Day trip to Pahalgam",
        cost: "₹1,200",
      },
      {
        time: "10:00",
        act: "Visit Betaab Valley",
        cost: "₹400",
      },
      {
        time: "13:00",
        act: "Lunch by Lidder River",
        cost: "₹700",
      },
      {
        time: "15:00",
        act: "Horse riding in Aru Valley",
        cost: "₹1,000",
      },
      {
        time: "20:00",
        act: "Dinner at local restaurant",
        cost: "₹1,000",
      },
    ],
  },

  {
    day: "Day 4",
    activities: [
      {
        time: "08:00",
        act: "Visit Sonamarg",
        cost: "₹1,500",
      },
      {
        time: "11:00",
        act: "Explore Thajiwas Glacier",
        cost: "₹800",
      },
      {
        time: "13:30",
        act: "Lunch at Sonamarg",
        cost: "₹700",
      },
      {
        time: "16:00",
        act: "Nature walk & sightseeing",
        cost: "—",
      },
      {
        time: "19:00",
        act: "Return to Srinagar",
        cost: "₹500",
      },
    ],
  },

  {
    day: "Day 5",
    activities: [
      {
        time: "09:00",
        act: "Shopping at Lal Chowk Market",
        cost: "₹2,000",
      },
      {
        time: "12:00",
        act: "Lunch at traditional Kashmiri restaurant",
        cost: "₹900",
      },
      {
        time: "15:00",
        act: "Visit Pari Mahal",
        cost: "₹200",
      },
      {
        time: "17:00",
        act: "Relax by Dal Lake",
        cost: "—",
      },
      {
        time: "20:00",
        act: "Farewell Kashmiri dinner",
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

  {
    day: "Day 2",
    activities: [
      {
        time: "07:00",
        act: "Travel to Cherrapunji",
        cost: "₹800",
      },
      {
        time: "10:00",
        act: "Visit Nohkalikai Falls",
        cost: "₹100",
      },
      {
        time: "13:00",
        act: "Lunch in Cherrapunji",
        cost: "₹700",
      },
      {
        time: "15:00",
        act: "Explore Mawsmai Cave",
        cost: "₹150",
      },
      {
        time: "18:00",
        act: "Sunset at Seven Sisters Falls",
        cost: "₹100",
      },
    ],
  },

  {
    day: "Day 3",
    activities: [
      {
        time: "06:00",
        act: "Trek to Double Decker Living Root Bridge",
        cost: "₹500",
      },
      {
        time: "12:00",
        act: "Lunch at Nongriat Village",
        cost: "₹600",
      },
      {
        time: "14:00",
        act: "Visit Rainbow Falls",
        cost: "₹200",
      },
      {
        time: "18:00",
        act: "Return to Cherrapunji",
        cost: "₹500",
      },
    ],
  },

  {
    day: "Day 4",
    activities: [
      {
        time: "08:00",
        act: "Visit Dawki & Umngot River",
        cost: "₹1,000",
      },
      {
        time: "11:00",
        act: "Boat ride on crystal-clear Umngot River",
        cost: "₹500",
      },
      {
        time: "13:00",
        act: "Lunch at Dawki",
        cost: "₹700",
      },
      {
        time: "16:00",
        act: "Explore India-Bangladesh Border viewpoint",
        cost: "—",
      },
      {
        time: "19:00",
        act: "Return to Shillong",
        cost: "₹800",
      },
    ],
  },

  {
    day: "Day 5",
    activities: [
      {
        time: "09:00",
        act: "Visit Laitlum Canyon",
        cost: "₹100",
      },
      {
        time: "12:00",
        act: "Shopping at Police Bazaar",
        cost: "₹1,500",
      },
      {
        time: "14:00",
        act: "Lunch at local café",
        cost: "₹800",
      },
      {
        time: "16:00",
        act: "Explore Don Bosco Museum",
        cost: "₹200",
      },
      {
        time: "19:00",
        act: "Farewell dinner in Shillong",
        cost: "₹1,200",
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

  {
    day: "Day 2",
    activities: [
      {
        time: "08:00",
        act: "Visit Elephanta Caves",
        cost: "₹600",
      },
      {
        time: "12:00",
        act: "Lunch near Gateway of India",
        cost: "₹900",
      },
      {
        time: "15:00",
        act: "Explore Chhatrapati Shivaji Maharaj Terminus",
        cost: "₹100",
      },
      {
        time: "18:00",
        act: "Walk along Bandra Bandstand",
        cost: "—",
      },
      {
        time: "20:00",
        act: "Dinner at Bandra",
        cost: "₹1,200",
      },
    ],
  },

  {
    day: "Day 3",
    activities: [
      {
        time: "09:00",
        act: "Visit Siddhivinayak Temple",
        cost: "—",
      },
      {
        time: "11:00",
        act: "Explore Haji Ali Dargah",
        cost: "—",
      },
      {
        time: "13:00",
        act: "Lunch at Worli",
        cost: "₹800",
      },
      {
        time: "16:00",
        act: "Visit Nehru Science Centre",
        cost: "₹250",
      },
      {
        time: "19:00",
        act: "Sunset at Worli Sea Face",
        cost: "—",
      },
    ],
  },

  {
    day: "Day 4",
    activities: [
      {
        time: "08:00",
        act: "Explore Sanjay Gandhi National Park",
        cost: "₹300",
      },
      {
        time: "11:00",
        act: "Visit Kanheri Caves",
        cost: "₹250",
      },
      {
        time: "13:00",
        act: "Lunch near Borivali",
        cost: "₹700",
      },
      {
        time: "16:00",
        act: "Shopping at Linking Road",
        cost: "₹2,000",
      },
      {
        time: "20:00",
        act: "Street food tour in Bandra",
        cost: "₹800",
      },
    ],
  },

  {
    day: "Day 5",
    activities: [
      {
        time: "09:00",
        act: "Visit Juhu Beach",
        cost: "—",
      },
      {
        time: "12:00",
        act: "Lunch at Juhu",
        cost: "₹900",
      },
      {
        time: "15:00",
        act: "Explore Film City (guided tour)",
        cost: "₹1,200",
      },
      {
        time: "18:00",
        act: "Relax at Marine Drive",
        cost: "—",
      },
      {
        time: "20:00",
        act: "Farewell dinner with sea view",
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
