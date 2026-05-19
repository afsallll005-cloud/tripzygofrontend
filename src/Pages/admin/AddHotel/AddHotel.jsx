import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../../../services/api";

import Sidebar from "../../../components/Sidebar/Sidebar";

import "./AddHotel.css";

function AddHotel() {

  const navigate = useNavigate();

  const { id } = useParams(); // packageId

  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  const [packages, setPackages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [previewImages, setPreviewImages] = useState([]);

  const [form, setForm] = useState({

    name: "",
    city: "",
    packageId: "",
    amenities: "",
    hotelPrice: "",
    latitude: "",
    longitude: "",
    images: [],

  });

  /* ================= LOAD PACKAGES ================= */

  useEffect(() => {

    fetchPackages();

  }, []);

  const fetchPackages = async () => {

    try {

      const res = await API.get("/packages");

      setPackages(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  /* ================= AUTO SELECT PACKAGE ================= */

  useEffect(() => {

    if (id) {

      setForm((prev) => ({

        ...prev,
        packageId: id,

      }));

    }

  }, [id]);

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {

    setForm({

      ...form,
      [e.target.name]: e.target.value,

    });

  };

  /* ================= HANDLE FILE ================= */

  const handleFile = (e) => {

    const files = Array.from(e.target.files);

    setForm({

      ...form,
      images: files,

    });

    // preview
    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages(previews);

  };

  /* ================= SUBMIT ================= */

  const submit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const data = new FormData();

      data.append("name", form.name);

      data.append("city", form.city);

      data.append("packageId", form.packageId);

      data.append("hotelPrice", form.hotelPrice);

      data.append("amenities", form.amenities);

      data.append("latitude", form.latitude);

      data.append("longitude", form.longitude);

      // IMAGES
      for (let i = 0; i < form.images.length; i++) {

        data.append("images", form.images[i]);

      }

      await API.post("/hotels", data, {

        headers: {
          "Content-Type": "multipart/form-data",
        },

      });

      alert("Hotel Added Successfully ✅");

      // RESET
      setForm({

        name: "",
        city: "",
        packageId: id || "",
        amenities: "",
          hotelPrice: "",
        latitude: "",
        longitude: "",
        images: [],

      });

      setPreviewImages([]);

    } catch (err) {

      console.error(err);

      alert("Failed to add hotel ❌");

    } finally {

      setLoading(false);

    }

  };

  return (
    <>

      {/* SIDEBAR */}
      <Sidebar />

      <div className="add-hotel-container">

        <div className="add-hotel-card">

          {/* TITLE */}
          <div className="hotel-top">

            <h2>
              Add Hotel
            </h2>

            <p>
              Create luxury stays connected
              to your travel packages.
            </p>

          </div>

          {/* FORM */}
          <form
            className="add-hotel-form"
            onSubmit={submit}
          >

            {/* HOTEL NAME */}
            <div className="form-group">

              <label>
                Hotel Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter Hotel Name"
                value={form.name}
                onChange={handleChange}
                required
              />

            </div>

            {/* CITY */}
            <div className="form-group">

              <label>
                City
              </label>

              <input
                type="text"
                name="city"
                placeholder="Enter City"
                value={form.city}
                onChange={handleChange}
                required
              />

            </div>

            {/* PACKAGE */}
            <div className="form-group">

              <label>
                Select Package
              </label>

              <select
                name="packageId"
                value={form.packageId}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Package
                </option>

                {packages.map((p) => (

                  <option
                    key={p._id}
                    value={p._id}
                  >
                    {p.title}
                  </option>

                ))}

              </select>

            </div>

            <div className="form-group">

              <label>
                Hotel Price
              </label>

              <input
                type="number"
                name="hotelPrice"
                placeholder="Enter Hotel Price"
                value={form.hotelPrice}
                onChange={handleChange}
                required
              />

            </div>

            {/* AMENITIES */}
            <div className="form-group">

              <label>
                Amenities
              </label>

              <input
                type="text"
                name="amenities"
                placeholder="wifi,pool,parking"
                value={form.amenities}
                onChange={handleChange}
              />

            </div>

            {/* LOCATION */}
            <div className="location-grid">

              <div className="form-group">

                <label>
                  Latitude
                </label>

                <input
                  type="text"
                  name="latitude"
                  placeholder="Latitude"
                  value={form.latitude}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>
                  Longitude
                </label>

                <input
                  type="text"
                  name="longitude"
                  placeholder="Longitude"
                  value={form.longitude}
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* IMAGE */}
            <div className="form-group">

              <label>
                Upload Hotel Images
              </label>

              <input
                type="file"
                multiple
                onChange={handleFile}
              />

            </div>

            {/* PREVIEW */}
            {previewImages.length > 0 && (

              <div className="preview-grid">

                {previewImages.map((img, index) => (

                  <img
                    key={index}
                    src={img}
                    alt="preview"
                    className="preview-image"
                  />

                ))}

              </div>

            )}

            {/* BUTTONS */}
            <div className="hotel-btn-group">

              <button
                type="submit"
                className="add-hotel-btn"
                disabled={loading}
              >

                {loading
                  ? "Adding..."
                  : "Add Hotel"}

              </button>

              <button
                type="button"
                className="view-hotels-btn"
                onClick={() =>
                  navigate(
                    `/package-hotels/${form.packageId}`
                  )
                }
                disabled={!form.packageId}
              >
                View Hotels
              </button>

            </div>

          </form>

        </div>

      </div>

    </>
  );
}

export default AddHotel;