import "./Navbar.css";
import { FaRobot } from "react-icons/fa";

function Navbar() {

    return (

        <nav className="navbar">

            <div className="logo">

                <FaRobot />

                <span>AI Internship</span>

            </div>

            <ul>

                <li>Home</li>
                <li>Features</li>
                <li>About</li>
                <li>Login</li>

            </ul>

        </nav>

    );

}

export default Navbar;