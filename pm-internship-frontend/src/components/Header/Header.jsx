import { Link } from "react-router-dom";
import logo from "../../assets/images/mainlogo.jpeg";
import {
    FaHome,
    FaBriefcase,
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
           

            {/* Main Header */}
            <header className="main-header">
                <div className="logo-area">

                    <img
                            src={logo}
                            alt="InternConnect Logo"
                            className="sidebar-logo-img"
                        />
                    <div className="portal-title">
                        <h2>InternConnect</h2>
                        <p>Smart Internship Allocation Platform</p>
                    </div>
                </div>

                <div className="header-buttons">

    <Link
        to="/login"
        className="login-btn"
    >

        <FaUserCircle />

        Login

    </Link>

    <Link
        to="/register"
        className="register-btn"
    >

        Register

    </Link>

</div>
            </header>

{/* Navigation */}

            <nav className="menu-bar">

                <a href="/">
                    <FaHome />
                    Home
                </a>

                <a href="/#features">
                    <FaBriefcase />
                    Features
                </a>

                <a href="/#about">
                    <FaInfoCircle />
                    About
                </a>

                <a href="/#contact">
                    <FaEnvelope />
                    Contact
                </a>

                <a href="/#faq">
               <FaQuestionCircle />
                FAQ
                </a>

            </nav>
        </>
    );
}