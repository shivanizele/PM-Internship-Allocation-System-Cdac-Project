import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import api from "../../services/api";
import "./Dashboard.css";

function CompanyDashboard() {

    const navigate = useNavigate();

    const companyId = localStorage.getItem("companyId");

    const [company, setCompany] = useState({});
    const [internships, setInternships] = useState([]);
    const [applications, setApplications] = useState([]);

    useEffect(() => {

        // Company Profile
        api.get(`/company/profile/${companyId}`)
            .then(res => {

                setCompany(res.data);

                // First Login -> Complete Profile
                if (
                    !res.data.companyName ||
                    !res.data.industry ||
                    !res.data.address ||
                    !res.data.website
                ) {
                    navigate("/company/profile/edit");
                }

            })
            .catch(err => console.log(err));

        // My Internships
        api.get(`/internships/company/${companyId}`)
            .then(res => setInternships(res.data))
            .catch(err => console.log(err));

        // Applications
        api.get(`/applications/company/${companyId}`)
            .then(res => setApplications(res.data))
            .catch(err => console.log(err));

    }, [companyId, navigate]);

    return (

    <DashboardLayout>

        <div className="dashboard-page">

            {/* Header */}

            <div className="dashboard-header">

                <div>

                    <h1>🏢 Company</h1>

                    <p>
                        Welcome ,
                        <strong> {company.companyName || "Company"} </strong>
                    </p>

                </div>

                <button
                    className="dashboard-btn"
                    onClick={() => navigate("/company/add-internship")}
                >
                    + Post Internship
                </button>

            </div>

            {/* Statistics */}

            <div className="dashboard-grid">

                <DashboardCard
                    title="My Internships"
                    value={internships.length}
                    color="#2563EB"
                />

                <DashboardCard
                    title="Applications"
                    value={applications.length}
                    color="#16A34A"
                />

                <DashboardCard
                    title="Selected Students"
                    value={
                        applications.filter(
                            app => app.status === "SELECTED"
                        ).length
                    }
                    color="#F59E0B"
                />

            </div>

            {/* Company Overview */}

            <div className="dashboard-section">

                <div className="company-card">

                    <h2>🏢 Company Information</h2>

                    <div className="company-grid">

                        <div>

                            <label>Company Name</label>

                            <span>{company.companyName || "-"}</span>

                        </div>

                        <div>

                            <label>Industry</label>

                            <span>{company.industry || "-"}</span>

                        </div>

                        <div>

                            <label>Website</label>

                            <span>{company.website || "-"}</span>

                        </div>

                        <div>

                            <label>Address</label>

                            <span>{company.address || "-"}</span>

                        </div>

                    </div>

                </div>

            </div>

            {/* Recent Applications */}

            <div className="dashboard-section">

                <div className="applications-card">

                    <div className="section-title">

                        <h2>📄 Recent Applications</h2>

                        <button
                            className="view-all-btn"
                            onClick={() => navigate("/company/applications")}
                        >
                            View All
                        </button>

                    </div>

                    <table className="dashboard-table">

                        <thead>

                            <tr>

                                <th>Student</th>
                                <th>Internship</th>
                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {applications.length > 0 ? (

                                applications.slice(0, 5).map(app => (

                                    <tr key={app.id}>

                                        <td>{app.studentName}</td>

                                        <td>{app.internshipTitle}</td>

                                        <td>

                                            <span
                                                className={`status-badge ${app.status.toLowerCase()}`}
                                            >
                                                {app.status}
                                            </span>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="3">

                                        No applications received.

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    </DashboardLayout>

);

}

export default CompanyDashboard;