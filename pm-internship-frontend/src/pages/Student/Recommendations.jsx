import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";
import { isStudentProfileComplete } from "../../utils/studentProfile";
import "./Internships.css";

function Recommendations() {

    const navigate = useNavigate();
    const studentId = localStorage.getItem("studentId");

    const [student, setStudent] = useState({});
    const [recommendations, setRecommendations] = useState([]);
    const [appliedInternships, setAppliedInternships] = useState([]);
    const [loading, setLoading] = useState(false);
    const [applyingId, setApplyingId] = useState(null);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        loadStudent();
        loadApplications();
    }, []);

    const loadStudent = () => {
        api.get(`/student/profile/${studentId}`)
            .then(res => {
                setStudent(res.data);

                if (!isStudentProfileComplete(res.data)) {
                    alert("Please complete your profile before using AI recommendations.");
                    navigate("/student/profile/edit");
                }
            })
            .catch(err => {
                console.log(err);
                setError("Unable to load student profile.");
            });
    };

    const loadApplications = () => {
        api.get(`/applications/student/${studentId}`)
            .then(res => {
                const internshipIds = res.data.map(app => app.internshipId);
                setAppliedInternships(internshipIds);
            })
            .catch(err => console.log(err));
    };

    const fetchRecommendations = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get(`/ai/recommend/${studentId}`);
            setRecommendations(response.data || []);
            setLoaded(true);
        } catch (err) {
            console.log(err);

            if (err.response?.status === 401) {
                setError("Your session has expired. Please log in again.");
            } else if (err.response?.status === 403) {
                setError("You are not authorized to access these recommendations.");
            } else {
                setError(err.response?.data || "Unable to generate AI recommendations right now.");
            }

            setRecommendations([]);
            setLoaded(true);
        } finally {
            setLoading(false);
        }
    };

    const applyToInternship = async (internshipId) => {
        setApplyingId(internshipId);

        try {
            await api.post("/applications", {
                studentId,
                internshipId
            });

            setAppliedInternships(prev => [...prev, internshipId]);
            alert("Application submitted successfully.");
        } catch (err) {
            console.log(err);
            alert(err.response?.data || "Unable to submit application.");
        } finally {
            setApplyingId(null);
        }
    };

    return (
        <DashboardLayout>
            <div className="recommendation-header">
                <div>
                    <h1>AI Recommendations</h1>
                    <p className="mb-0">
                        Analyze your uploaded resume and get the top 5 internship matches.
                    </p>
                </div>

                <button
                    className="btn btn-primary ai-recommendation-btn"
                    onClick={fetchRecommendations}
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Get AI Recommendations"}
                </button>
            </div>

            {!student.resume && (
                <div className="alert alert-warning">
                    No resume uploaded yet. Upload your resume before requesting AI recommendations.
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {loaded && !loading && !error && recommendations.length === 0 && (
                <div className="alert alert-info">
                    No recommendations available right now.
                </div>
            )}

            <div className="internship-container">
                {recommendations.map(item => (
                    <div
                        key={item.internshipId}
                        className="internship-card"
                    >
                        <div className="d-flex justify-content-between align-items-start gap-3">
                            <div>
                                <h2>{item.title}</h2>
                                <h4>{item.companyName}</h4>
                            </div>
                            <span className="badge bg-success fs-6">
                                {Math.round(item.matchScore)}% Match
                            </span>
                        </div>

                        <p>{item.reason}</p>

                        <div className="mb-3">
                            <strong>Matched Skills</strong>
                            {item.matchedSkills?.length ? (
                                <ul className="mt-2 mb-0">
                                    {item.matchedSkills.map(skill => (
                                        <li key={`${item.internshipId}-${skill}`}>{"\u2713"} {skill}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mb-0 mt-2">No direct skill overlap found.</p>
                            )}
                        </div>

                        <div className="mb-3">
                            <strong>Missing Skills</strong>
                            {item.missingSkills?.length ? (
                                <ul className="mt-2 mb-0">
                                    {item.missingSkills.map(skill => (
                                        <li key={`${item.internshipId}-missing-${skill}`}>{skill}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mb-0 mt-2">No major skill gaps identified.</p>
                            )}
                        </div>

                        {appliedInternships.includes(item.internshipId) ? (
                            <button
                                className="applied-btn"
                                disabled
                            >
                                Already Applied
                            </button>
                        ) : (
                            <button
                                className="apply-btn"
                                onClick={() => applyToInternship(item.internshipId)}
                                disabled={applyingId === item.internshipId}
                            >
                                {applyingId === item.internshipId ? "Applying..." : "Apply Now"}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </DashboardLayout>
    );
}

export default Recommendations;
