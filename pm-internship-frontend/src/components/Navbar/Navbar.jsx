import "./Navbar.css";
import { FaRobot } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="navbar">

            <div className="logo">

                <FaRobot />
                <span>AI Internship</span>

            </div>

            <ul>

                <li>
                    <a href="#home">Home</a>
                </li>

                <li>
                    <a href="#features">Features</a>
                </li>

                <li>
                    <a href="#about">About</a>
                </li>

                <li>
                    <Link to="/login">Login</Link>
                </li>

            </ul>

        </nav>

    );

}

export default Navbar;