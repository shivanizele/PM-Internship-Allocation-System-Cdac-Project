import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";

function MyApplications() {

    const studentId = localStorage.getItem("studentId");

    const [applications, setApplications] = useState([]);

    useEffect(() => {

    console.log("Student ID =", studentId);

    api.get(`/applications/student/${studentId}`)
        .then(res => {
            console.log(res.data);
            setApplications(res.data);
        })
        .catch(err => {
            console.log(err);
            console.log(err.response);
        });

}, [studentId]);

    return (

        <DashboardLayout>

            <h2>My Applications</h2>

            <table className="internship-table">

                <thead>

                    <tr>

                        <th>Internship</th>
                        <th>Status</th>
                        <th>Applied On</th>

                    </tr>

                </thead>

                <tbody>

                    {applications.map(app => (

                        <tr key={app.id}>

                            <td>{app.internshipTitle}</td>
                            <td>{app.status}</td>
                            <td>{app.appliedAt}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </DashboardLayout>

    );
}

export default MyApplications;