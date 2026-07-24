import "./Footer.css";
import googlePlay from "../../assets/images/google-play.png";
import qrCode from "../../assets/images/qr.png";
function Footer() {
    return (
        <footer id="contact" className="footer">

            {/* Top Section */}
            <div className="footer-top">

                <div className="footer-logo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Ministry_of_Corporate_Affairs_India.svg/1280px-Ministry_of_Corporate_Affairs_India.svg.png" alt="AI Internship Logo" />
                </div>

                <div className="visitor-card">
                    <h3>Total Visitors</h3>
                    <h1>5,65,88,293</h1>
                </div>

                <div className="footer-logo right-logo">
                    <img src="https://bisag-n.gov.in/images/logos/bisag_logo.png" alt="College Logo" />
                </div>

            </div>

            {/* Main Footer */}
            <div className="footer-container">

                {/* About */}
                <div className="footer-section">
                    <h2>About AI Internship Allocation System</h2>

                    <p>
                        The AI Internship Allocation System streamlines internship allocation by
                        matching students with suitable companies based on their skills,
                        preferences, and eligibility. The platform provides a transparent,
                        efficient, and automated process while reducing manual effort for
                        students, companies, and administrators. Students can apply, track
                        applications, and receive internship updates through a centralized
                        platform.
                    </p>
                </div>

                {/* Links */}
                <div className="footer-section">
                    <h2>Get to Know</h2>

                    <ul>
                        <li><a href="#">Benefits</a></li>
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">Gallery</a></li>
                        <li><a href="#">Notifications</a></li>
                        <li><a href="#">Raise a Ticket</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Download */}
                <div className="footer-section">
                    <h2>Download Mobile App</h2>

                    <p>
                        Click below to download our mobile application or scan the QR code.
                    </p>

                    <div className="playstore-box">

                        <img
                            src={googlePlay}
                            alt="Google Play"
                            className="playstore"
                        />

                        <img
                            src={qrCode}
                            alt="QR Code"
                            className="qr"
                        />

                    </div>

                </div>

                {/* Contact */}
                <div className="footer-section contact">

                    <h2>Contact Us</h2>

                    <p>📍 AI Internship Cell</p>

                    <p>
                        CDAC ACTS, Pune <br />
                        Maharashtra - 411001
                    </p>

                    <p>✉ support@aiinternship.com</p>

                    <p>✉ help@aiinternship.com</p>

                    <p>☎ +91 9876543210</p>

                </div>

            </div>

            {/* Bottom */}

            <div className="footer-bottom">

                <p>
                    ©2026 <strong>AI Internship Allocation System</strong>, All Rights
                    Reserved.
                </p>

                <p>
                    Developed by <strong>CDAC Project Team</strong>
                </p>

            </div>

        </footer>
    );
}

export default Footer;