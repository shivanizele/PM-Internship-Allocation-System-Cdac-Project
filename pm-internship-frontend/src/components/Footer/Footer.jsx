import "./Footer.css";
import {
    FaMapMarkerAlt,
    FaEnvelope,
    FaPhoneAlt,
    FaFacebookF,
    FaLinkedinIn,
    FaGithub,
    FaArrowRight
} from "react-icons/fa";

function Footer() {

    return (

        <footer id="contact" className="footer">

            <div className="footer-container">

                {/* About */}

                <div className="footer-section">

                    <h2>InterConnect</h2>

                    <p>
                        AI Internship Allocation System helps students discover
                        suitable internships using Artificial Intelligence while
                        enabling companies and administrators to efficiently
                        manage the internship allocation process.
                    </p>

                </div>


                {/* Quick Links */}

                <div className="footer-section">

                    <h3>Quick Links</h3>

                    <ul>

                        <li>
                            <a href="#home">
                                <FaArrowRight /> Home
                            </a>
                        </li>

                        <li>
                            <a href="#features">
                                <FaArrowRight /> Features
                            </a>
                        </li>

                        <li>
                            <a href="#about">
                                <FaArrowRight /> About
                            </a>
                        </li>

                        <li>
                            <a href="#faq">
                                <FaArrowRight /> FAQ
                            </a>
                        </li>

                    </ul>

                </div>


                {/* Contact */}

                <div className="footer-section">

                    <h3>Contact</h3>

                    <p>
                        <FaMapMarkerAlt />
                        Pune, Maharashtra
                    </p>

                    <p>
                        <FaEnvelope />
                        support@interconnect.com
                    </p>

                    <p>
                        <FaPhoneAlt />
                        +91 9876543210
                    </p>

                </div>


                {/* Social */}

                <div className="footer-section">

                    <h3>Follow Us</h3>

                    <div className="social-icons">

                        <a href="#">
                            <FaFacebookF />
                        </a>

                        <a href="#">
                            <FaLinkedinIn />
                        </a>


                    </div>

                </div>

            </div>


            <div className="footer-bottom">

                <p>
                    © 2026 <strong>InterConnect - AI Internship Allocation System</strong>.
                    All Rights Reserved.
                </p>

                <p>
                    Developed by <strong>CDAC Project Team</strong>
                </p>

            </div>

        </footer>

    );

}

export default Footer;