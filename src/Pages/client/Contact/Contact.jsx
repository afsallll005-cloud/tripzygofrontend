import React from "react";
import "./Contact.css";

import { motion } from "framer-motion";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

function Contact() {
  return (
    <>

     <div className="container">
      <Navbar />

      <div className="contact-section">

        <div className="contact-heading">

          <motion.h1
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            CONTACT
          </motion.h1>

          <motion.h1
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            WITH ME
          </motion.h1>

        </div>

        <div className="contact-wrapper">

          <div className="contact-info">
            <p className="contact-address">
              TripzyGo,<br />
              Angadippuram, Perinthalmanna<br />
              Malappuram, Kerala, 679321
            </p>
          </div>

          <div className="contact-form-area">

            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Full Name" />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="Email" />
            </div>

            <div className="form-group message-group">
              <label>Message</label>
              <textarea placeholder="Write your message..."></textarea>
            </div>

            <div className="send-btn-wrapper">
              <button className="send-btn">Send Message</button>
            </div>

          </div>

        </div>
      </div>
      

      <Footer />

      </div>
    </>
  );
}

export default Contact;