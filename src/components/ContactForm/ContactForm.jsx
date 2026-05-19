import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function ContactForm() {

  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      console.log("Sending Form:", form);

      const res = await axios.post(
        `${API_URL}/api/addmessages`,
        form
      );

      console.log("Response:", res.data);

      // SUCCESS ALERT
      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message || "Message sent successfully ✅",
        confirmButtonColor: "#3085d6",
      });

      // CLEAR FORM
      setForm({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {

      console.log("Submit Error:", error);

      // ERROR ALERT
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong ❌",
        confirmButtonColor: "#d33",
      });

    } finally {

      setLoading(false);

    }
  };

  return (

    <form
      className="pdx-msg-form"
      onSubmit={handleSubmit}
    >

      {/* INPUT GROUP */}
      <div className="pdx-input-group">

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

      </div>

      {/* MESSAGE */}
      <textarea
        name="message"
        placeholder="Message"
        value={form.message}
        onChange={handleChange}
        required
      ></textarea>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="pdx-submit-btn"
        disabled={loading}
      >

        {loading
          ? "Sending..."
          : "Submit"}

      </button>

    </form>
  );
}

export default ContactForm;