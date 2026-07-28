import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";
import "./MyApplications.css";

function MyApplications() {

    const studentId = localStorage.getItem("studentId");

    const [applications, setApplications] = useState([]);

    useEffect(() => {

        api.get(`/applications/student/${studentId}`)
            .then(res => setApplications(res.data))
            .catch(err => console.log(err));

    }, [studentId]);

    const getStatusClass = (status) => {

        switch (status?.toUpperCase()) {

            case "APPROVED":
            case "ACCEPTED":
                return "status approved";

            case "REJECTED":
                return "status rejected";

            case "PENDING":
            default:
                return "status pending";
        }

    };

    return (

        <DashboardLayout>

            <div className="applications-page">

                <div className="page-header">

                    <h1>📋 My Applications</h1>

                    <p>
                        Track all your internship applications and their current status.
                    </p>

                </div>

                <div className="applications-card">

                    <table className="applications-table">

                        <thead>

                            <tr>

                                <th>Internship</th>
                                <th>Status</th>
                                <th>Applied On</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                applications.length > 0 ?

                                    applications.map(app => (

                                        <tr key={app.id}>

                                            <td>
                                                {app.internshipTitle}
                                            </td>

                                            <td>

                                                <span className={getStatusClass(app.status)}>
                                                    {app.status}
                                                </span>

                                            </td>

                                            <td>

                                                {new Date(app.appliedAt).toLocaleDateString("en-IN")}

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td colSpan="3" className="no-data">

                                            🚀 You haven't applied for any internships yet.

                                        </td>

                                    </tr>

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default MyApplications;