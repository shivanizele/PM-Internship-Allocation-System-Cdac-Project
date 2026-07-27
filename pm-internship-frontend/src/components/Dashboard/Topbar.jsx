import "./Topbar.css";
import { FaUserCircle, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Topbar() {

    const fullName = localStorage.getItem("fullName");
    const role = localStorage.getItem("role");
    const [showMenu, setShowMenu] = useState(false);

    const navigate = useNavigate();

    const goHome = () => {

        localStorage.clear();   // Logout user

        navigate("/");          // Go to Landing Page

    };

    return (

        <div className="topbar">

            <div className="topbar-left">

                <button
                    className="home-btn"
                    onClick={goHome}
                >
                    <FaHome />
                    Home
                </button>

                <h2>{role} Dashboard</h2>

            </div>

            <div className="topbar-user">

    <div
        className="user-info"
        onClick={() => setShowMenu(!showMenu)}
    >
        <FaUserCircle size={28} />
        <span>{fullName}</span>
    </div>

    {showMenu && (
        <div className="user-dropdown">
            <button
                className="dropdown-btn"
                onClick={goHome}
            >
                Logout
            </button>
        </div>
    )}

</div>
        </div>

    );

}

export default Topbar;