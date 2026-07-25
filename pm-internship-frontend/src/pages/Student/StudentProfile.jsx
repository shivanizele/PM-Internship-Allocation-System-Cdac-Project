import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";
import "./StudentProfile.css";

function StudentProfile() {

    const studentId = localStorage.getItem("studentId");

    const [student, setStudent] = useState({});

    const navigate = useNavigate();

    useEffect(() => {

        api.get(`/student/profile/${studentId}`)
            .then(res => setStudent(res.data))
            .catch(err => console.log(err));

    }, [studentId]);

    return (

        <DashboardLayout>

            <div className="profile-container">

                <h2>Student Profile</h2>

                <table className="profile-table">

                    <tbody>

                        <tr>
                            <td>Name</td>
                            <td>{student.fullName}</td>
                        </tr>

                        <tr>
                            <td>Email</td>
                            <td>{student.email}</td>
                        </tr>

                        <tr>
                            <td>College</td>
                            <td>{student.collegeName}</td>
                        </tr>

                        <tr>
                            <td>Branch</td>
                            <td>{student.branch}</td>
                        </tr>

                        <tr>
                            <td>CGPA</td>
                            <td>{student.cgpa}</td>
                        </tr>

                        <tr>
                            <td>Location</td>
                            <td>{student.location}</td>
                        </tr>

                        <tr>
                            <td>Profile Status</td>
                            <td>{student.profileComplete ? "Complete" : "Incomplete"}</td>
                        </tr>
                        

<tr>
    <td>Skills</td>
    <td>
        {student.skills?.map((skill, index) => (
            <span key={index} className="skill-chip">
                {skill}
            </span>
        ))}
    </td>
</tr>

                        <tr>
                            <td>Highest Qualification</td>
                            <td>{student.qualification?.highestQualification || "-"}</td>
                        </tr>

                        <tr>
                            <td>Degree</td>
                            <td>{student.qualification?.degree || "-"}</td>
                        </tr>

                        <tr>
                            <td>Specialization / Branch</td>
                            <td>{student.qualification?.specialization || "-"}</td>
                        </tr>

                        <tr>
                            <td>College / University</td>
                            <td>{student.qualification?.collegeOrUniversity || "-"}</td>
                        </tr>

                        <tr>
                            <td>Passing Year</td>
                            <td>{student.qualification?.passingYear || "-"}</td>
                        </tr>

                        <tr>
                            <td>Percentage / CGPA</td>
                            <td>{student.qualification?.percentageOrCgpa || "-"}</td>
                        </tr>

                        <tr>
                            <td>10th Percentage</td>
                            <td>{student.qualification?.tenthPercentage || "-"}</td>
                        </tr>

                        <tr>
                            <td>12th / Diploma Percentage</td>
                            <td>{student.qualification?.twelfthOrDiplomaPercentage || "-"}</td>
                        </tr>

                        <tr>
                            <td>Certifications</td>
                            <td>{student.qualification?.certifications || "-"}</td>
                        </tr>

<tr>
    <td>Resume</td>
    <td>
        {
            student.resume ?

            <a
                href={`http://localhost:8080/api/resume/${student.resume}`}
                target="_blank"
                rel="noreferrer"
                className="resume-link"
            >
                📄 View Resume
            </a>

            :

            <span className="no-resume">
                No Resume Uploaded
            </span>
        }
    </td>
</tr>

                    </tbody>

                </table>

                <button
                    className="edit-btn"
                    onClick={() => navigate("/student/profile/edit")}
                >
                    Edit Profile
                </button>

            </div>

        </DashboardLayout>

    );
}

export default StudentProfile;
