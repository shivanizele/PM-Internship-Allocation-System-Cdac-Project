import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import api from "../../services/api";
import "./Dashboard.css";

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

            <div className="dashboard-header">

                <div>

                    <h1>👨‍💼 Admin Dashboard</h1>

                    <p>
                        Welcome to the PM Internship Allocation System.
                        Monitor internship statistics, manage allocations and
                        run the AI Recommendation Engine.
                    </p>

                </div>

            </div>

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

                <DashboardCard
                    title="Available Seats"
                    value={dashboard.availableSeats || 0}
                    color="#8B5CF6"
                />

            </div>

            <div className="allocation-box">

                <h2>🤖 AI Internship Allocation</h2>

                <p>

                    Run the Artificial Intelligence recommendation engine to
                    automatically allocate students to the most suitable
                    internships based on skills, qualifications, preferences,
                    and seat availability.

                </p>

                <button
                    className="allocate-btn"
                    onClick={runAllocation}
                >
                    🚀 Run AI Allocation
                </button>

            </div>

        </DashboardLayout>

    );

}

export default AdminDashboard;