import "./Sidebar.css";
import logo from "../../assets/images/mainlogo.jpeg";
import {
  FaHome,
  FaUserGraduate,
  FaBuilding,
  FaBriefcase,
  FaClipboardList,
  FaSignOutAlt,
  FaRobot,
  FaFileAlt,
  FaPlusCircle
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar() {

  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (

    <div className="sidebar">

      {/* Logo */}

      <NavLink to="/" className="sidebar-logo">

    <img
        src={logo}
        alt="InternConnect Logo"
        className="sidebar-logo-img"
    />

    <div className="logo-text">
        <h2>InternConnect</h2>
        <p>AI Internship Allocation</p>
    </div>

</NavLink>

      {/* ================= ADMIN ================= */}

      {role === "ADMIN" && (

        <div className="menu">

          <NavLink to="/admin">
            <FaHome />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/students">
            <FaUserGraduate />
            <span>Students</span>
          </NavLink>

          <NavLink to="/admin/companies">
            <FaBuilding />
            <span>Companies</span>
          </NavLink>

          <NavLink to="/admin/internships">
            <FaBriefcase />
            <span>Internships</span>
          </NavLink>

          <NavLink to="/admin/allocations">
            <FaClipboardList />
            <span>Allocations</span>
          </NavLink>

        </div>

      )}

      {/* ================= STUDENT ================= */}

      {role === "STUDENT" && (

        <div className="menu">

          <NavLink to="/student">
            <FaHome />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/student/profile">
            <FaUserGraduate />
            <span>Profile</span>
          </NavLink>

          <NavLink to="/student/internships">
            <FaBriefcase />
            <span>Internships</span>
          </NavLink>

          <NavLink to="/student/recommendations">
            <FaRobot />
            <span>AI Recommendations</span>
          </NavLink>

          <NavLink to="/student/applications">
            <FaClipboardList />
            <span>Applications</span>
          </NavLink>

          <NavLink to="/student/resume">
            <FaFileAlt />
            <span>Resume</span>
          </NavLink>

        </div>

      )}

      {/* ================= COMPANY ================= */}

      {role === "COMPANY" && (

        <div className="menu">

          <NavLink to="/company">
            <FaHome />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/company/profile">
            <FaBuilding />
            <span>Profile</span>
          </NavLink>

          <NavLink to="/company/internships">
            <FaBriefcase />
            <span>Internships</span>
          </NavLink>

          <NavLink to="/company/add-internship">
            <FaPlusCircle />
            <span>Add Internship</span>
          </NavLink>

        </div>

      )}

      {/* Logout */}

      <button className="logout-btn" onClick={logout}>
        <FaSignOutAlt />
        <span>Logout</span>
      </button>

    </div>

  );

}

export default Sidebar;