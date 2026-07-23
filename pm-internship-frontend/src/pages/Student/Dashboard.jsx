import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import api from "../../services/api";
import "./Dashboard.css";

function StudentDashboard() {

    //const studentId = localStorage.getItem("id");
    const studentId = localStorage.getItem("studentId");
    const [profile, setProfile] = useState({});
    const [applications, setApplications] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [internships, setInternships] = useState([]);

    useEffect(() => {

        api.get(`/student/profile/${studentId}`)
            .then(res => setProfile(res.data));

        api.get(`/applications/student/${studentId}`)
            .then(res => setApplications(res.data));

        api.get(`/recommend/${studentId}`)
            .then(res => setRecommendations(res.data));

        api.get("/internships")
            .then(res => setInternships(res.data));

    }, [studentId]);

    return (

        <DashboardLayout>

            {/* <h1>Student Dashboard</h1> */}

            <h3>Welcome {profile.fullName}</h3>

            <div className="dashboard-grid">

                <DashboardCard
                    title="Applications"
                    value={applications.length}
                    color="#2563EB"
                />

                <DashboardCard
                    title="AI Recommendations"
                    value={recommendations.length}
                    color="#16A34A"
                />

                <DashboardCard
                    title="Available Internships"
                    value={internships.length}
                    color="#F59E0B"
                />

            </div>

        </DashboardLayout>

    );

}

export default StudentDashboard;