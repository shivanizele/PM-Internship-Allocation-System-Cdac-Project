
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import api from "../../services/api";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState({});

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = () => {

        api.get("/admin/dashboard")
            .then(res => setDashboard(res.data));

    };

    const runAllocation = () => {

        api.post("/admin/allocate")
            .then(res => {

                alert(res.data);

                loadDashboard();

            });

    };

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
                    title="Allocations"
                    value={dashboard.totalAllocations}
                    color="#DC2626"
                />

            </div>

            <br />

            <button
                className="allocate-btn"
                onClick={runAllocation}
            >
                Run AI Allocation
            </button>

        </DashboardLayout>

    );

}

export default AdminDashboard;

