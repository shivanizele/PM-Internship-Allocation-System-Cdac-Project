import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaClipboardList,
    FaRobot,
    FaBriefcase,
    FaArrowRight
} from "react-icons/fa";

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import api from "../../services/api";
import { isStudentProfileComplete } from "../../utils/studentProfile";
import "./Dashboard.css";

function StudentDashboard() {

    const studentId = localStorage.getItem("studentId");

    const [student, setStudent] = useState({});
    const [applications, setApplications] = useState([]);
    const [internships, setInternships] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        api.get(`/student/profile/${studentId}`)

            .then(res => {

                setStudent(res.data);

                const profileComplete =
                    isStudentProfileComplete(res.data);

                if (!profileComplete) {

                    alert(
                        "Please complete your profile before applying for internships."
                    );

                    navigate("/student/profile/edit");

                    return;

                }

                api.get(`/applications/student/${studentId}`)
                    .then(res => setApplications(res.data));

                api.get("/internships")
                    .then(res => setInternships(res.data));

            })

            .catch(err => console.log(err));

    }, [studentId, navigate]);

    return (

        <DashboardLayout>

            <div className="student-dashboard">

                {/* Header */}

                <div className="student-header">

                    <div>

                        <h1>

                            👋 Welcome,

                            <span>

                                {" "}

                                {student.fullName}

                            </span>

                        </h1>

                        <p>

                            Welcome to the AI-Powered Internship Allocation
                            System. Track your applications, discover new
                            internship opportunities and receive personalized
                            AI recommendations.

                        </p>

                    </div>

                </div>

                {/* Cards */}

                <div className="dashboard-grid">

                    <DashboardCard
                        title="Applications"
                        value={applications.length}
                        color="#2563EB"
                        icon={<FaClipboardList />}
                    />

                    <DashboardCard
                        title="AI Recommendations"
                        value="Top 5"
                        color="#16A34A"
                        icon={<FaRobot />}
                    />

                    <DashboardCard
                        title="Available Internships"
                        value={internships.length}
                        color="#F59E0B"
                        icon={<FaBriefcase />}
                    />

                </div>

                {/* Quick Actions */}

                <div className="quick-actions">

                    <h2>Quick Actions</h2>

                    <div className="action-grid">

                        <div
                            className="action-card"
                            onClick={() =>
                                navigate("/student/recommendations")
                            }
                        >

                            <FaRobot className="action-icon" />

                            <h3>

                                AI Recommendations

                            </h3>

                            <p>

                                Get AI-powered internship suggestions based on
                                your profile.

                            </p>

                            <button>

                                Explore

                                <FaArrowRight />

                            </button>

                        </div>

                        <div
                            className="action-card"
                            onClick={() =>
                                navigate("/student/internships")
                            }
                        >

                            <FaBriefcase className="action-icon" />

                            <h3>

                                Browse Internships

                            </h3>

                            <p>

                                View available internship opportunities from
                                companies.

                            </p>

                            <button>

                                View

                                <FaArrowRight />

                            </button>

                        </div>

                        <div
                            className="action-card"
                            onClick={() =>
                                navigate("/student/applications")
                            }
                        >

                            <FaClipboardList className="action-icon" />

                            <h3>

                                My Applications

                            </h3>

                            <p>

                                Check your internship applications and their
                                current status.

                            </p>

                            <button>

                                Open

                                <FaArrowRight />

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default StudentDashboard;