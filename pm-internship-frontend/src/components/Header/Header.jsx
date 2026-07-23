import { Link } from "react-router-dom";
import {
    FaHome,
    FaBuilding,
    FaInfoCircle,
    FaEnvelope,
    FaUserCircle,
    FaQuestionCircle,
} from "react-icons/fa";
import "./Header.css";

export default function Header() {
    return (
        <>
            {/* Top Black Strip */}
            <div className="gov-strip">
                <div className="gov-left">
                    <img src="https://pminternship.mca.gov.in/assets/aug_2025_assets/indian_flag.svg" alt="India" />
                    <span>भारत सरकार / Government Of India

                    </span>
                </div>

                <div className="gov-right">
                    <span>A-</span>
                    <span>A</span>
                    <span>A+</span>
                </div>
            </div>

            {/* Main Header */}
            <header className="main-header">
                <div className="logo-area">

                    <img
                        src="https://pminternship.mca.gov.in/assets/img/MCA.svg"
                        alt="College Logo"
                        className="college-logo"
                    />

                    <div className="portal-title">
                        <h2>Internship Matching System</h2>
                        <p>Smart Internship Allocation Platform</p>
                    </div>
                </div>

                <Link to="/login" className="login-btn">
                    <FaUserCircle /> Login / Register
                </Link>
            </header>

            {/* Navigation */}
            <nav className="menu-bar">

                <Link to="/">
                    <FaHome /> Home
                </Link>

                <Link to="/internships">
                    <FaBuilding /> Internships
                </Link>

                <Link to="/companies">
                    <FaBuilding /> Companies
                </Link>

                <Link to="/faq">
                    <FaQuestionCircle /> FAQ
                </Link>

                <Link to="/about">
                    <FaInfoCircle /> About
                </Link>

                <Link to="/contact">
                    <FaEnvelope /> Contact
                </Link>

            </nav>
        </>
    );
}