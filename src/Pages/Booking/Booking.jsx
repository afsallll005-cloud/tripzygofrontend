import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.css";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn
} from "react-icons/fa";

import Swal from "sweetalert2";

import Footer from "../../components/Footer/Footer";

function Booking() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    time: ""
  });

  const [errors, setErrors] = useState({});

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    // CLEAR ERROR WHEN USER TYPES
    setErrors({
      ...errors,
      [e.target.name]: ""
    });

  };

  // TIME SLOT SELECT
  const handleTimeSelect = (time) => {

    setForm({
      ...form,
      time
    });

    setErrors({
      ...errors,
      time: ""
    });

  };

  // FORM VALIDATION
  const validateForm = () => {

    let newErrors = {};

    if (!form.checkIn) {
      newErrors.checkIn = "Check-in date is required";
    }

    if (!form.checkOut) {
      newErrors.checkOut = "Check-out date is required";
    }

    if (!form.time) {
      newErrors.time = "Please select a time slot";
    }

    // CHECK DATE VALIDATION
    if (
      form.checkIn &&
      form.checkOut &&
      new Date(form.checkOut) <= new Date(form.checkIn)
    ) {
      newErrors.checkOut =
        "Check-out date must be after check-in";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  // LOGIN + VALIDATION CHECK
  const handlePaymentNavigation = (e) => {

    e.preventDefault();

    // VALIDATE FORM
    if (!validateForm()) {

      // Swal.fire({
      //   icon: "error",
      //   title: "Validation Error",
      //   text: "Please fill all booking details correctly",
      // });

      return;
    }

    // LOGIN CHECK
    const token = localStorage.getItem("token");

    if (!token) {

      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to continue payment",
      });

      navigate("/login");

    } else {

      Swal.fire({
        icon: "success",
        title: "Booking Details Saved",
        text: "Proceeding to payment page",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/paymentstaticpage");
      }, 1500);

    }
  };

  return (
    <>
      <div className="bookingPage">

        {/* HERO */}
        <div className="bookingHeader">
          <h1>Complete Your Booking</h1>
          <p>
            Secure your dream travel experience
            in just a few steps
          </p>
        </div>

        {/* STEPS */}
        <div className="bookingSteps">

          <div className="step done">
            <div className="circle">✓</div>
            <span>Package</span>
          </div>

          <div className="line"></div>

          <div className="step done">
            <div className="circle">✓</div>
            <span>Hotel</span>
          </div>

          <div className="line"></div>

          <div className="step done">
            <div className="circle">✓</div>
            <span>Room</span>
          </div>

          <div className="line"></div>

          <div className="step active">
            <div className="circle">4</div>
            <span>Booking</span>
          </div>

          <div className="line light"></div>

          <div className="step">
            <div className="circle">5</div>
            <span>Payment</span>
          </div>

          <div className="line light"></div>

          <div className="step">
            <div className="circle">6</div>
            <span>Confirm</span>
          </div>

        </div>

        {/* WRAPPER */}
        <div className="bookingWrapper">

          <div className="bookingCard">

            {/* LEFT */}
            <div className="bookingLeft">

              <h2>TripzyGo</h2>

              <p className="subText">
                We assist you anytime for a smooth travel experience.
              </p>

              <div className="infoBlock">
                <h4>Contact</h4>
                <p>contact@tripzygo.com</p>
              </div>

              <div className="infoBlock">
                <h4>Social</h4>

                <div className="socialIcons">
                  <FaFacebookF />
                  <FaInstagram />
                  <FaLinkedinIn />
                </div>

              </div>

              <div className="infoBlock">
                <h4>Support</h4>
                <p>
                  Flights • Hotels • Packages • Itinerary
                </p>
              </div>

            </div>

            {/* RIGHT */}
            <div className="bookingRight">

              <h2>Booking Details</h2>

              <form className="bookingForm">

                {/* DATE SECTION */}
                <div className="dateSection">

                  <label>Check In</label>

                  <input
                    type="date"
                    name="checkIn"
                    value={form.checkIn}
                    onChange={handleChange}
                  />

                  {errors.checkIn && (
                    <small className="errorText">
                      {errors.checkIn}
                    </small>
                  )}

                  <label>Check Out</label>

                  <input
                    type="date"
                    name="checkOut"
                    value={form.checkOut}
                    onChange={handleChange}
                  />

                  {errors.checkOut && (
                    <small className="errorText">
                      {errors.checkOut}
                    </small>
                  )}

                </div>

                {/* TIME SLOT */}
                <div className="timeSlots">

                  <p>Select Time Slot</p>

                  <div className="times">

                    <button
                      type="button"
                      className={
                        form.time === "9:00 AM"
                          ? "activeTime"
                          : ""
                      }
                      onClick={() =>
                        handleTimeSelect("9:00 AM")
                      }
                    >
                      9:00 AM
                    </button>

                    <button
                      type="button"
                      className={
                        form.time === "10:00 AM"
                          ? "activeTime"
                          : ""
                      }
                      onClick={() =>
                        handleTimeSelect("10:00 AM")
                      }
                    >
                      10:00 AM
                    </button>

                    <button
                      type="button"
                      className={
                        form.time === "11:00 AM"
                          ? "activeTime"
                          : ""
                      }
                      onClick={() =>
                        handleTimeSelect("11:00 AM")
                      }
                    >
                      11:00 AM
                    </button>

                  </div>

                  {errors.time && (
                    <small className="errorText">
                      {errors.time}
                    </small>
                  )}

                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="bookBtn"
                  onClick={handlePaymentNavigation}
                >
                  Continue to Payment
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Booking;