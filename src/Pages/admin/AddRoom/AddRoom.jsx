import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../services/api";
import Sidebar from "../../../components/Sidebar/Sidebar";
import './AddRoom.css'

function AddRoom() {

  const { hotelId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    maxPeople: "",
    facilities: "",
    roomImages: []
  });

  const [loading, setLoading] = useState(false);

  /* INPUT */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* FILE */
  const handleFile = (e) => {
    setForm({
      ...form,
      roomImages: e.target.files
    });
  };

  /* SUBMIT */
  const submit = async (e) => {
    e.preventDefault();

    if (!hotelId) {
      alert("Hotel ID missing ❌");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      data.append("hotelId", hotelId);
      data.append("name", form.name);
      data.append("price", Number(form.price));
      data.append("maxPeople", Number(form.maxPeople));
      data.append("facilities", form.facilities); // comma string

      for (let i = 0; i < form.roomImages.length; i++) {
        data.append("roomImages", form.roomImages[i]);
      }

      await API.post("/rooms", data);

      alert("Room Added Successfully ✅");

      setForm({
        name: "",
        price: "",
        maxPeople: "",
        facilities: "",
        roomImages: []
      });

      // navigate(-1);

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to add room ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
   <>
  <Sidebar />

  <div className="add-room-container">
    <div className="add-room-card">

      <h2>Add Room</h2>

      <form className="add-room-form" onSubmit={submit}>

        <input
          name="name"
          placeholder="Room Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          name="maxPeople"
          type="number"
          placeholder="Max People"
          value={form.maxPeople}
          onChange={handleChange}
          required
        />

        <input
          name="facilities"
          placeholder="wifi,ac,tv"
          value={form.facilities}
          onChange={handleChange}
        />

        <input
          type="file"
          multiple
          onChange={handleFile}
        />

        <button
          className="add-room-btn"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Room"}
        </button>

      </form>

      <div className="room-actions">

        <button
          className="view-rooms-btn"
          onClick={() => navigate(`/hotel-rooms/${hotelId}`)}
        >
          View Rooms
        </button>

        <button
          className="back-room-btn"
          onClick={() => navigate(-1)}
        >
          ⬅ Back
        </button>

      </div>

    </div>
  </div>
</>
  );
}

export default AddRoom;