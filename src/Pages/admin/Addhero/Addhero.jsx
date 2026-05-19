import React, { useState } from "react";
import "./AddHero.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Swal from "sweetalert2";

function AddHero() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    mainDescription: "",
    title: "",
    desc: "",
    days: "",
    amount: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("mainDescription", formData.mainDescription);
    data.append("title", formData.title);
    data.append("desc", formData.desc);
    data.append("days", formData.days);
    data.append("amount", formData.amount);
    data.append("heroimage", image);

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/addhero`, {
        method: "POST",
        body: data,
      });

      await res.json();

      Swal.fire({
        icon: "success",
        title: "Hero Uploaded Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      // reset form
      setFormData({
        mainDescription: "",
        title: "",
        desc: "",
        days: "",
        amount: "",
      });
      setImage(null);

    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Upload Failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashContainer">
      <Sidebar />

      <div className="add-hero">
        <h2>Add Hero Section</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="mainDescription"
            placeholder="Main Description"
            value={formData.mainDescription}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="days"
            placeholder="Days (e.g. 7 Days - 10 Days)"
            value={formData.days}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="desc"
            placeholder="Description"
            value={formData.desc}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Hero"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddHero;