import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api, { openResume } from "../../services/api";
import "./CompanyApplications.css";


function CompanyApplications() {
    const { id } = useParams();
    const [applications, setApplications] = useState([]);
    const [rankings, setRankings] = useState([]);
    const [loadingRankings, setLoadingRankings] = useState(false);
    const [error, setError] = useState("");

    const loadApplications = () => {
        api.get(`/applications/internship/${id}`)
            .then(res => setApplications(res.data))
            .catch(err => setError(err.response?.data || "Unable to load applications."));
    };

    useEffect(() => { loadApplications(); }, [id]);

    const updateStatus = async (applicationId, status) => {
        try {
            await api.put(`/applications/${applicationId}/status?status=${status}`);
            loadApplications();
        } catch (err) {
            setError(err.response?.data || "Unable to update application.");
        }
    };

    const loadRankings = async () => {
        setLoadingRankings(true);
        setError("");
        try {
            const response = await api.get(`/applications/internship/${id}/ranking`);
            setRankings(response.data || []);
        } catch (err) {
            setError(err.response?.data || "Unable to generate applicant rankings.");
        } finally {
            setLoadingRankings(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="applications-header mb-3">
                <h2 className="mb-0">Applications Received</h2>

                <button
                    className="ai-ranking-btn"
                    onClick={loadRankings}
                    disabled={loadingRankings}
                >
                    {loadingRankings ? "Ranking applicants..." : "View AI Applicant Ranking"}
                </button>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="table-responsive">
                <table className="internship-table">
                    <thead><tr><th>Student</th><th>Internship</th><th>Status</th><th>Applied On</th><th>Resume</th><th>Action</th></tr></thead>
                    <tbody>{applications.map(app => (
                        <tr key={app.id}>
                            <td>{app.studentName}</td><td>{app.internshipTitle}</td><td>{app.status}</td>
                            <td>{new Date(app.appliedAt).toLocaleDateString("en-IN")}</td>
                            <td>{app.resume ? <button className="resume-btn" onClick={() => openResume(app.resume).catch(() => setError("Unable to open resume."))}>View Resume</button> : "No Resume"}</td>
                            <td>{app.status === "APPLIED" ? <><button className="accept-btn" onClick={() => updateStatus(app.id, "SHORTLISTED")}>Shortlist</button><button className="reject-btn" onClick={() => updateStatus(app.id, "REJECTED")}>Reject</button></> : <span>{app.status}</span>}</td>
                        </tr>
                    ))}</tbody>
                </table>
            </div>

            {rankings.length > 0 && <div className="mt-5">
                <h3>AI-Assisted Applicant Ranking</h3>
                <div className="table-responsive"><table className="internship-table">
                    <thead><tr><th>Rank</th><th>Student</th><th>CGPA</th><th>Skills</th><th>Match</th><th>Matched</th><th>Missing</th><th>Status</th></tr></thead>
                    <tbody>{rankings.map((item, index) => <tr key={item.applicationId}>
                        <td>{index + 1}</td><td>{item.studentName}<br /><small>{item.email}</small></td><td>{item.cgpa ?? "—"}</td>
                        <td>{item.skills?.join(", ") || "—"}</td><td><strong>{Math.round(item.matchScore)}%</strong></td>
                        <td>{item.matchedSkills?.join(", ") || "—"}</td><td>{item.missingSkills?.join(", ") || "—"}</td><td>{item.status}</td>
                    </tr>)}</tbody>
                </table></div>
            </div>}
        </DashboardLayout>
    );
}

export default CompanyApplications;
