import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../../../services/api";

import Sidebar from "../../../components/Sidebar/Sidebar";

import "./EditPackage.css";

function EditPackage() {

  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  const { id } = useParams();

  const navigate = useNavigate();

  // FORM STATE
  const [form, setForm] = useState({
    title: "",
    destination: "",
    location: "",
    price: "",
    rating: "",
    description: "",
    durationDays: "",
    img: null,
  });

  // IMAGE PREVIEW
  const [preview, setPreview] = useState("");

  // LOADING
  const [loading, setLoading] = useState(false);

  // FETCH PACKAGE
  useEffect(() => {

    fetchPackage();

  }, [id]);

  // GET PACKAGE DETAILS
  const fetchPackage = async () => {

    try {

      const res = await API.get(`/packages/${id}`);

      console.log("Package Data:", res.data);

      const data = res.data;

      setForm({
        title: data.title || "",
        destination: data.destination || "",
        location: data.location || "",
        price: data.price || "",
        rating: data.rating || "",
        description: data.description || "",
        durationDays: data.durationDays || "",
        img: null,
      });

      // IMAGE PREVIEW
      if (data.image) {

        setPreview(`${API_URL}${data.image}`);

      }

    } catch (err) {

      console.error("Fetch Error:", err);

      alert("Failed to load package ❌");

    }
  };

  // HANDLE INPUT
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  // HANDLE FILE
  const handleFile = (e) => {

    const file = e.target.files[0];

    setForm({
      ...form,
      img: file,
    });

    // LOCAL PREVIEW
    if (file) {

      setPreview(URL.createObjectURL(file));

    }
  };

  // SUBMIT UPDATE
  const submit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const data = new FormData();

      // APPEND FORM DATA
      Object.keys(form).forEach((key) => {

        if (form[key] !== null) {

          // CONVERT NUMBER FIELDS
          if (
            key === "price" ||
            key === "rating" ||
            key === "durationDays"
          ) {

            data.append(key, Number(form[key]));

          } else {

            data.append(key, form[key]);

          }
        }
      });

      console.log("Updating Package...");

      await API.put(`/packages/${id}`, data);

      alert("Package Updated Successfully ✅");

      navigate("/view-packages");

    } catch (err) {

      console.error("Update Error:", err);

      alert("Update Failed ❌");

    } finally {

      setLoading(false);

    }
  };

  return (
    <>

      {/* SIDEBAR */}
      <Sidebar />

      <div className="edit-package-container">

        <div className="edit-package-card">

          {/* TITLE */}
          <h2>
            Edit Package
          </h2>

          {/* FORM */}
          <form
            className="edit-package-form"
            onSubmit={submit}
          >

            {/* TITLE */}
            <input
              type="text"
              name="title"
              placeholder="Package Title"
              value={form.title}
              onChange={handleChange}
              required
            />

            {/* DESTINATION */}
            <input
              type="text"
              name="destination"
              placeholder="Destination"
              value={form.destination}
              onChange={handleChange}
              required
            />

            {/* LOCATION */}
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              required
            />

            {/* PRICE */}
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
            />

            {/* RATING */}
            <input
              type="number"
              step="0.1"
              name="rating"
              placeholder="Rating"
              value={form.rating}
              onChange={handleChange}
              required
            />

            {/* DURATION */}
            <input
              type="number"
              name="durationDays"
              placeholder="Duration Days"
              value={form.durationDays}
              onChange={handleChange}
              required
            />

            {/* DESCRIPTION */}
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>

            {/* IMAGE PREVIEW */}
            {preview && (

              <div className="package-preview-wrapper">

                <img
                  src={preview}
                  alt="Preview"
                  className="package-preview"
                  onError={(e) => {
                    e.target.src = "/fallback.jpg";
                  }}
                />

              </div>

            )}

            {/* FILE INPUT */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
            />

            {/* BUTTONS */}
            <div className="edit-package-btns">

              <button
                type="submit"
                className="update-package-btn"
                disabled={loading}
              >

                {loading
                  ? "Updating..."
                  : "Update Package"}

              </button>

              <button
                type="button"
                className="cancel-package-btn"
                onClick={() =>
                  navigate("/view-packages")
                }
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>

    </>
  );
}

export default EditPackage;