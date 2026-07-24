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

            <h1>Company Dashboard</h1>

            <h3>Welcome, {company.companyName}</h3>

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

        </DashboardLayout>

    );

}

export default CompanyDashboard;