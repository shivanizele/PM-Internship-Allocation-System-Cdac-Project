import "./Sidebar.css";
import {
    FaHome,
    FaUserGraduate,
    FaBuilding,
    FaBriefcase,
    FaClipboardList,
    FaSignOutAlt
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Sidebar() {

    const role = localStorage.getItem("role");

    return (

        <div className="sidebar">

            <h2>AI Internship</h2>

            {role === "ADMIN" && (

                <>

                    <Link to="/admin"><FaHome /> Dashboard</Link>

                    <Link to="/admin/students">
                        <FaUserGraduate /> Students
                    </Link>

                    <Link to="/admin/companies">
                        <FaBuilding /> Companies
                    </Link>

                    <Link to="/admin/internships">
                        <FaBriefcase /> Internships
                    </Link>

                    <Link to="/admin/allocations">
                        <FaClipboardList /> Allocations
                    </Link>
                    <Link to="/company/internships">
                       My Internships</Link>
                       <Link to="/company/add-internship">Add Internship</Link>

                </>

            )}

            {role === "STUDENT" && (

                <>

                    <Link to="/student">
                        <FaHome /> Dashboard
                    </Link>

                    <Link to="/student/profile">
                        <FaUserGraduate /> Profile
                    </Link>

                    <Link to="/student/internships">
                        <FaBriefcase /> Internships
                    </Link>

                    <Link to="/student/applications">
                        <FaClipboardList /> Applications
                    </Link>

                </>

            )}

            {role === "COMPANY" && (

                <>

                    <Link to="/company">
                        <FaHome /> Dashboard
                    </Link>

                    <Link to="/company/profile">
                        <FaBuilding /> Profile
                    </Link>

                    <Link to="/company/internships">
                        <FaBriefcase /> Internships
                    </Link>

                </>

            )}

            <button
                className="logout-btn"
                onClick={() => {

                    localStorage.clear();
                    window.location = "/login";

                }}
            >
                <FaSignOutAlt />
                Logout

            </button>

        </div>

    );

}

export default Sidebar;