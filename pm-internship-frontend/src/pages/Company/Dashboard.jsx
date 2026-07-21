
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import api from "../../services/api";
import "./Dashboard.css";

function CompanyDashboard() {

    const companyId = localStorage.getItem("id");

    const [dashboard, setDashboard] = useState({});

    useEffect(() => {

        api.get(`/company/dashboard/${companyId}`)
            .then(res => setDashboard(res.data))
            .catch(err => console.log(err));

    }, [companyId]);

    return (

        <DashboardLayout>

            <h1>Company Dashboard</h1>

            <div className="dashboard-grid">

                <DashboardCard
                    title="My Internships"
                    value={dashboard.totalInternships || 0}
                    color="#2563EB"
                />

                <DashboardCard
                    title="Applications"
                    value={dashboard.totalApplications || 0}
                    color="#16A34A"
                />

                <DashboardCard
                    title="Selected Students"
                    value={dashboard.selectedStudents || 0}
                    color="#F59E0B"
                />

            </div>

        </DashboardLayout>

    );

}

export default CompanyDashboard;

