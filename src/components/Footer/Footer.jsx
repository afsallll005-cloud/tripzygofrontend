import React from 'react'
import './Footer.css'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

function Footer() {

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <footer className="tz-footer">

            <div className="tz-footer-container">

                {/* Giant Text */}
                <div className="tz-giant-text-container">

                    <motion.h1
                        className="tz-giant-text"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        TRIPZYGO
                    </motion.h1> <div></div>
                </div>

                <div className="tz-main-layout">

                    {/* LEFT COLUMN */}
                    <motion.div
                        className="tz-info-col"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >

                        <div className="tz-text-block">
                            <span className="tz-overline">BEGIN YOUR JOURNEY</span>
                            <p>
                                Explore the wonders of the great outdoors with our premier hiking website.
                                Immerse yourself in stunning vistas, tranquil forests, and invigorating trails.
                            </p>

                            <div className="tz-overline-foot">
                                <a href="">Home</a>
                                <a href="">About</a>
                                <a href="">Package</a>
                                <a href="">Hotels</a>
                                <a href="">Rooms</a>
                            </div>
                        </div>

                        <div className="tz-social-block">
                            <span className="tz-small-label">
                                Exploring together:<br />stories from our recent trips
                            </span>

                            <div className="tz-social-icons">
                                <a href="#"><FaInstagram /></a>
                                <a href="#"><FaFacebookF /></a>
                                <a href="#"><FaYoutube /></a>
                            </div>
                        </div>

                    </motion.div>

                    {/* RIGHT GRID */}
                    <div className="tz-bento-grid">

                        {[
                            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800",
                            "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800",
                            "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800",
                            "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800",
                            "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=800"
                        ].map((img, i) => (
                            <motion.div
                                key={i}
                                className={`tz-grid-item item-${i + 1}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <img src={img} alt="travel" />
                            </motion.div>
                        ))}

                        {/* Contact Box */}
                        <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
                            <motion.div
                                className="tz-contact-box"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <h3>Contact</h3>
                                <p>Got a question?<br />Don't hesitate to ask us.</p>
                                <div className="tz-arrow-bottom">↘</div>
                            </motion.div>
                        </Link>

                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer