import React, { useState } from "react";
import "./AddAbout.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import toast from "react-hot-toast";

function AddAbout() {
  const [formData, setFormData] = useState({
    aboutTitle: "",
    aboutDesc: "",
  });

  const [images, setImages] = useState({
    aboutLeftimage: null,
    aboutRightimage: null,
  });

  const [loading, setLoading] = useState(false);

  // TEXT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // FILE CHANGE
  const handleFileChange = (e) => {
    setImages({
      ...images,
      [e.target.name]: e.target.files[0],
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("aboutTitle", formData.aboutTitle);
    data.append("aboutDesc", formData.aboutDesc);

    if (images.aboutLeftimage) {
      data.append("aboutLeftimage", images.aboutLeftimage);
    }

    if (images.aboutRightimage) {
      data.append("aboutRightimage", images.aboutRightimage);
    }

    setLoading(true);
    const toastId = toast.loading("Uploading about section...");

    try {
        const res = await fetch(`${API_URL}/addAbout`,  {
        method: "POST",
        body: data,
      });

      await res.json();

      toast.success("About section added successfully ✅", {
        id: toastId,
      });

      // RESET
      setFormData({
        aboutTitle: "",
        aboutDesc: "",
      });

      setImages({
        aboutLeftimage: null,
        aboutRightimage: null,
      });

    } catch (error) {
      console.log(error);
      toast.error("Upload failed ❌", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />

      <div className="add-about">
        <h2>Add About Section</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="aboutTitle"
            placeholder="Enter title"
            value={formData.aboutTitle}
            onChange={handleChange}
            required
          />

          <textarea
            name="aboutDesc"
            placeholder="Enter description"
            value={formData.aboutDesc}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            name="aboutLeftimage"
            accept="image/*"
            onChange={handleFileChange}
          />

          <input
            type="file"
            name="aboutRightimage"
            accept="image/*"
            onChange={handleFileChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload About"}
          </button>

        </form>
      </div>
    </>
  );
}

export default AddAbout;