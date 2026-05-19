import React, { useEffect, useState } from "react";
import "./About.css";
import { motion } from "framer-motion";

function About() {
  const API_URL = import.meta.env.VITE_API_URL; // ✅ ADD THIS

  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/addAbout`)
      .then((res) => res.json())
      .then((data) => {
        setAbout(data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!about) return <p>Loading...</p>;

  // animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 }
    }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <div id="About">
      <section className="auraAboutShell">
        <div className="auraAboutGrid">

          {/* Left Image */}
          <motion.div
            className="auraAboutImageBox"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src={`${API_URL}/images/${about.aboutLeftimage}`}
              alt="travel"
              className="auraAboutImg"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="auraAboutContent"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="auraAboutTag">ABOUT TRIPZYGO</span>

            <h1 className="auraAboutTitle">
              {about.aboutTitle}
            </h1>

            <p className="auraAboutText">
              {about.aboutDesc}
            </p>

            <motion.button
              className="auraAboutBtn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              EXPLORE PACKAGES ↗
            </motion.button>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="auraAboutTallImage"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src={`${API_URL}/images/${about.aboutRightimage}`}
              alt="destination"
              className="auraTallImg"
            />
          </motion.div>

        </div>

        {/* Why Section */}
        <motion.div
          className="auraWhySection"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="auraWhyTitle">Why Travel with Tripzygo?</h2>

          <div className="auraWhyGrid">

            <motion.div className="auraWhyCard" whileHover={{ y: -8 }}>
              <h3>Expert Travel Planning</h3>
              <p>
                Our experienced team designs personalized travel packages that
                match your interests, budget, and dream destinations.
              </p>
            </motion.div>

            <motion.div className="auraWhyCard" whileHover={{ y: -8 }}>
              <h3>Flexible Travel Packages</h3>
              <p>
                From mountains and beaches to city tours and cultural trips,
                Tripzygo offers flexible packages for every traveler.
              </p>
            </motion.div>

          </div>
        </motion.div>

      </section>
    </div>
  );
}

export default About;