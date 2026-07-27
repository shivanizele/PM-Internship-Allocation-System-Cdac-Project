import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import api from "../../services/api";
import { isStudentProfileComplete } from "../../utils/studentProfile";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";


function StudentDashboard() {

    //const studentId = localStorage.getItem("id");
    const studentId = localStorage.getItem("studentId");
  //  const [profile, setProfile] = useState({});
    const [applications, setApplications] = useState([]);
    const [internships, setInternships] = useState([]);
    const navigate = useNavigate();
    // const studentId = localStorage.getItem("studentId");

    const [student, setStudent] = useState({});

    useEffect(() => {

api.get(`/student/profile/${studentId}`)
    .then(res => {

        setStudent(res.data);

        const profileComplete = isStudentProfileComplete(res.data);

        if (!profileComplete) {

            alert("Please complete your profile before applying for internships.");

            navigate("/student/profile/edit");

            return;
        }

        // Only after profile is complete
        api.get(`/applications/student/${studentId}`)
            .then(res => setApplications(res.data));

        api.get("/internships")
            .then(res => setInternships(res.data));

    })
    .catch(err => console.log(err));

}, [studentId, navigate]);
    return (

        <DashboardLayout>

            {/* <h1>Student Dashboard</h1> */}

            <h3>Welcome {student.fullName}</h3>

            <div className="dashboard-grid">

                <DashboardCard
                    title="Applications"
                    value={applications.length}
                    color="#2563EB"
                />

                <DashboardCard
                    title="AI Recommendations"
                    value="Top 5"
                    color="#16A34A"
                />

                <DashboardCard
                    title="Available Internships"
                    value={internships.length}
                    color="#F59E0B"
                />

            </div>

            <div style={{ marginTop: "24px" }}>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/student/recommendations")}
                >
                    Get AI Recommendations
                </button>
            </div>

        </DashboardLayout>

    );

}

export default StudentDashboard;
