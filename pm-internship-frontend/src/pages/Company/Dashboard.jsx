import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import api from "../../services/api";
import "./Dashboard.css";


function Dashboard() {

    const [company, setCompany] = useState(null);
    const [internships, setInternships] = useState([]);

    useEffect(() => {

        loadCompany();

    }, []);

    const loadCompany = async () => {

        try {

            const id = localStorage.getItem("id");

            const companyRes = await api.get(`/company/profile/${id}`);

            setCompany(companyRes.data);

            const internshipRes = await api.get(`/company/${id}/internships`);

            setInternships(internshipRes.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    if (!company) {

        return (

            <DashboardLayout>

                <h2>Loading...</h2>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <h1>Company Dashboard</h1>

            <div className="dashboard-grid">

                <DashboardCard
                    title="Company"
                    value={company.companyName}
                    color="#2563EB"
                />

                <DashboardCard
                    title="Internships"
                    value={internships.length}
                    color="#10B981"
                />

                <DashboardCard
                    title="Industry"
                    value={company.industry}
                    color="#F59E0B"
                />

            </div>

        </DashboardLayout>

    );

}

export default Dashboard;