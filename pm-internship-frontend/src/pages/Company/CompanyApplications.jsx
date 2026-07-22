import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";
import "./CompanyApplications.css";

function CompanyApplications() {

    const { id } = useParams();

    const [applications, setApplications] = useState([]);

    const loadApplications = () => {

        api.get(`/applications/internship/${id}`)
            .then(res => setApplications(res.data))
            .catch(err => console.log(err));

    };

    useEffect(() => {
        loadApplications();
    }, [id]);

    const updateStatus = (applicationId, status) => {

        api.put(`/applications/${applicationId}/status?status=${status}`)
            .then(() => {

                alert("Application " + status + " successfully.");

                loadApplications();

            })
            .catch(err => {

                console.log(err);

                alert("Unable to update application.");

            });

    };

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
                        <th>Resume</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {applications.map(app => (

                        <tr key={app.id}>

                            <td>{app.studentName}</td>

                            <td>{app.internshipTitle}</td>

                            <td>{app.status}</td>

                            <td>{app.appliedAt}</td>

                            <td>

                                {app.resume ? (

                                    <a
    href={`http://localhost:8080/api/resume/${app.resume}`}
    target="_blank"
    rel="noopener noreferrer"
    className="resume-btn"
>
    View Resume
</a>

                                ) : (

                                    <span>No Resume</span>

                                )}

                            </td>

                            <td>

                                {app.status === "APPLIED" ? (

                                    <>

                                        <button
                                            className="accept-btn"
                                            onClick={() => updateStatus(app.id, "SELECTED")}
                                        >
                                            Accept
                                        </button>

                                        <button
                                            className="reject-btn"
                                            onClick={() => updateStatus(app.id, "REJECTED")}
                                        >
                                            Reject
                                        </button>

                                    </>

                                ) : (

                                    <span>{app.status}</span>

                                )}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </DashboardLayout>

    );

}

export default CompanyApplications;