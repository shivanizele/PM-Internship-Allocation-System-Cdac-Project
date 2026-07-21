import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";

function CompanyApplications() {

    const { id } = useParams();

    const [applications, setApplications] = useState([]);

    useEffect(() => {

        api.get(`/applications/internship/${id}`)
            .then(res => {
                console.log(res.data);
                setApplications(res.data);
            })
            .catch(err => console.log(err));

    }, [id]);

    return (

        <DashboardLayout>

            <h2>Applications Received</h2>

            <table className="internship-table">

                <thead>

                    <tr>
                        <th>Student</th>
                        <th>Internship</th>
                        <th>Status</th>
                        <th>Applied On</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        applications.map(app => (

                            <tr key={app.id}>

                                <td>{app.studentName}</td>
                                <td>{app.internshipTitle}</td>
                                <td>{app.status}</td>
                                <td>{app.appliedAt}</td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </DashboardLayout>

    );

}

export default CompanyApplications;