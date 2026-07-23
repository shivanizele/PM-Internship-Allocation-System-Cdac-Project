import "./Topbar.css";
import { FaUserCircle, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Topbar() {

    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

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

                <FaUserCircle size={28} />

                <span>Welcome, {email}</span>

            </div>

        </div>

    );

}

export default Topbar;