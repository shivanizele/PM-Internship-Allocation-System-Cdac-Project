import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import api from "../../services/api";
import "./Dashboard.css";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState({
        totalStudents: 0,
        totalCompanies: 0,
        totalInternships: 0,
        totalApplications: 0,
        totalAllocations: 0,
        placementPercentage: 0
    });

    useEffect(() => {

        api.get("/admin/dashboard")
            .then(res => setDashboard(res.data))
            .catch(err => console.log(err));

    }, []);

    return (

        <DashboardLayout>

            <h1>Admin Dashboard</h1>

            <div className="dashboard-grid">

                <DashboardCard
                    title="Students"
                    value={dashboard.totalStudents}
                    color="#2563EB"
                />

                <DashboardCard
                    title="Companies"
                    value={dashboard.totalCompanies}
                    color="#16A34A"
                />

                <DashboardCard
                    title="Internships"
                    value={dashboard.totalInternships}
                    color="#F59E0B"
                />

                <DashboardCard
                    title="Applications"
                    value={dashboard.totalApplications}
                    color="#9333EA"
                />

                <DashboardCard
                    title="Allocations"
                    value={dashboard.totalAllocations}
                    color="#DC2626"
                />

                <DashboardCard
                    title="Placement %"
                    value={`${dashboard.placementPercentage.toFixed(2)} %`}
                    color="#0891B2"
                />

            </div>

        </DashboardLayout>

    );

}

export default AdminDashboard;