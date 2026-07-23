import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";
import "./Internships.css";

function Internships() {

    const [internships, setInternships] = useState([]);
    const [student, setStudent] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [resume, setResume] = useState(null);
    const [appliedInternships, setAppliedInternships] = useState([]);

    const studentId = localStorage.getItem("studentId");

    useEffect(() => {

        loadInternships();

        loadStudent();

        loadApplications();

    }, []);

    const loadInternships = () => {

        api.get("/internships")
            .then(res => setInternships(res.data))
            .catch(err => console.log(err));

    };

    const loadStudent = () => {

        api.get(`/student/profile/${studentId}`)
            .then(res => setStudent(res.data))
            .catch(err => console.log(err));

    };

    const loadApplications = () => {

        api.get(`/applications/student/${studentId}`)
            .then(res => {

                const ids = res.data.map(app => app.internshipId);

                setAppliedInternships(ids);

            })
            .catch(err => console.log(err));

    };

    const openApplyModal = (internshipId) => {

        setSelectedInternship(internshipId);
        setResume(null);
        setShowModal(true);

    };

    const submitApplication = async () => {

        try {

            if (resume) {

                const formData = new FormData();

                formData.append("file", resume);

                await api.post(
                    `/resume/upload/${studentId}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );

                loadStudent();

            }

            await api.post("/applications", {

                studentId,

                internshipId: selectedInternship

            });

            alert("Application Submitted Successfully.");

            setAppliedInternships(prev => [

                ...prev,

                selectedInternship

            ]);

            setShowModal(false);

            setResume(null);

        }
        catch (err) {

            console.log(err);

            alert(

                err.response?.data ||

                "Already applied or error occurred."

            );

        }

    };

    return (

        <DashboardLayout>

            <h1>Available Internships</h1>

            <div className="internship-container">

                {

                    internships.map(i => (

                        <div
                            key={i.id}
                            className="internship-card"
                        >

                            <h2>{i.title}</h2>

                            <h4>{i.companyName}</h4>

                            <p>{i.description}</p>

                            <p>
                                <b>Location :</b> {i.location}
                            </p>

                            <p>
                                <b>Stipend :</b> ₹{i.stipend}
                            </p>

                            <p>
                                <b>CGPA :</b> {i.minimumCgpa}
                            </p>

                            <p>
                                <b>Duration :</b> {i.durationMonths} Months
                            </p>

                            {

                                appliedInternships.includes(i.id)

                                ?

                                <button
                                    className="applied-btn"
                                    disabled
                                >
                                    ✔ Already Applied
                                </button>

                                :

                                <button
                                    className="apply-btn"
                                    onClick={() => openApplyModal(i.id)}
                                >
                                    Apply
                                </button>

                            }

                        </div>

                    ))

                }

            </div>

            {

                showModal &&

                <div className="modal-overlay">

                    <div className="apply-modal">

                        <h2>
                            Apply for Internship
                        </h2>

                        <p className="subtitle">

                            Please review your resume before submitting.

                        </p>

                        <div className="resume-box">

                            <h3>
                                Current Resume
                            </h3>

                            {

                                student.resume

                                ?

                                <a

                                    href={`http://localhost:8080/api/resume/${student.resume}`}

                                    target="_blank"

                                    rel="noreferrer"

                                    className="resume-link"

                                >

                                    📄 View Resume

                                </a>

                                :

                                <p>

                                    No Resume Uploaded

                                </p>

                            }

                        </div>

                        <div className="upload-box">

                            <label>

                                Upload New Resume (Optional)

                            </label>

                            <input

                                type="file"

                                accept=".pdf"

                                onChange={(e) =>

                                    setResume(e.target.files[0])

                                }

                            />

                            <small>

                                Only PDF files are allowed.

                            </small>

                        </div>

                        <div className="modal-buttons">

                            <button

                                className="apply-btn"

                                onClick={submitApplication}

                            >

                                Apply

                            </button>

                            <button

                                className="cancel-btn"

                                onClick={() => {

                                    setShowModal(false);

                                    setResume(null);

                                }}

                            >

                                Cancel

                            </button>

                        </div>

                    </div>

                </div>

            }

        </DashboardLayout>

    );

}

export default Internships;