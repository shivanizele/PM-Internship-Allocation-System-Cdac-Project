import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api, { openResume } from "../../services/api";
import "./StudentResume.css";

function StudentResume() {

    const studentId = localStorage.getItem("studentId");

    const [student, setStudent] = useState({});

    const [file, setFile] = useState(null);

    useEffect(() => {

        api.get(`/student/profile/${studentId}`)
            .then(res => setStudent(res.data))
            .catch(err => console.log(err));

    }, [studentId]);

    const uploadResume = async () => {

        if (!file) {
            alert("Please choose a PDF file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {

            await api.post(
                `/resume/upload/${studentId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("Resume uploaded successfully");

            // Reload profile to show latest resume
            const res = await api.get(`/student/profile/${studentId}`);
            setStudent(res.data);

            setFile(null);

        } catch (err) {

            console.log(err);
            alert("Upload failed");

        }

    };

    return (

        <DashboardLayout>

            <div className="resume-container">

                <h2>Resume</h2>

                {
                    student.resume ?

                    <div className="current-resume">

                        <h3>Current Resume</h3>

                        {/* <a
                            href={`http://localhost:8080/api/resume/${student.resume}`}
                            target="_blank"
                            rel="noreferrer"
                            className="view-btn"
                        >
                            📄 View Resume
                        </a> */}
<button className="resume-btn" onClick={() => openResume(student.resume).catch(() => console.log("Unable to open resume."))}>View Resume</button>
                    </div>

                    :

                    <p className="no-resume">
                        No Resume Uploaded
                    </p>

                }

                <hr />

                <h3>Upload New Resume</h3>

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <button onClick={uploadResume}>
                    Upload Resume
                </button>

            </div>

        </DashboardLayout>

    );

}

export default StudentResume;