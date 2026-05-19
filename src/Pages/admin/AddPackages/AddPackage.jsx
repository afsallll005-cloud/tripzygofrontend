import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../services/api";
import "./AddPackage.css";
import Sidebar from "../../../components/Sidebar/Sidebar";

function AddPackages() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    destination: "",
    price: "",
    description: "",
    rating: "",
    location: "",
    durationDays: "",
    img: null
  });

  const [loading, setLoading] = useState(false);

  /* HANDLE INPUT */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  /* HANDLE FILE */
  const handleFile = (e) => {
    setForm((prev) => ({
      ...prev,
      img: e.target.files[0]
    }));
  };

  /* SUBMIT */
  const submit = async (e) => {
    e.preventDefault();

    // 🔒 Basic validation
    if (!form.img) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      // Append all fields dynamically
      Object.keys(form).forEach((key) => {
        if (key === "price" || key === "rating" || key === "durationDays") {
          data.append(key, Number(form[key]));
        } else {
          data.append(key, form[key]);
        }
      });

      await API.post("/packages", data);

      alert("Package Added ✅");

      /* RESET */
      setForm({
        title: "",
        destination: "",
        price: "",
        description: "",
        rating: "",
        location: "",
        durationDays: "",
        img: null
      });

      /* CLEAR FILE INPUT */
      const fileInput = document.getElementById("fileInput");
      if (fileInput) fileInput.value = "";

      navigate("/view-packages");

    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error adding package ❌");
    } finally {
      setLoading(false);
    }
  };

  return (

    <>
    <Sidebar/>
    <div className="add-package-container">
    <div className="add-package-card">

      <h2 className="add-package-title">
        Add Travel Package
      </h2>

      <form className="add-package-form" onSubmit={submit}>

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <input
          name="rating"
          type="number"
          placeholder="Rating (1-5)"
          value={form.rating}
          onChange={handleChange}
          min="1"
          max="5"
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
          name="durationDays"
          type="number"
          placeholder="Duration (days)"
          value={form.durationDays}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <label className="file-input-wrapper">
          Upload Package Image
          <br /><br />

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFile}
            required
          />
        </label>

        <button
          className="add-package-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Package"}
        </button>

      </form>
    </div>
  </div>

  </>
  );
}

export default AddPackages;