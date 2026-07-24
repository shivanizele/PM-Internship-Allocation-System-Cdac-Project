import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";
import "./EditStudentProfile.css";

function EditStudentProfile() {

    const navigate = useNavigate();

    const studentId = localStorage.getItem("studentId");
    const [resume, setResume] = useState(null);

    const [student, setStudent] = useState({
        collegeName: "",
        branch: "",
        cgpa: "",
        location: "",
        skills: ""
    });
   const isFirstTime =
    !student.collegeName ||
    !student.branch ||
    !student.location ||
    student.cgpa === 0;

    useEffect(() => {

     api.get(`/student/profile/${studentId}`)
    .then(res => {
        setStudent({
            ...res.data,
            skills: Array.isArray(res.data.skills)
                ? res.data.skills.join(", ")
                : ""
        });
    });
  

    }, [studentId]);

   const handleChange = (e) => {
    setStudent({
        ...student,
        [e.target.name]: e.target.value
    });
};

    const handleSubmit = async (e) => {

    e.preventDefault();
    const firstTime =
    !student.collegeName ||
    !student.branch ||
    !student.location ||
    student.cgpa === 0;

    const request = {
        ...student,
        skills: student.skills
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill !== "")
    };

    try {

        // Update profile
        await api.put(`/student/profile/${studentId}`, request);

        // Upload resume if selected
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

        }

        alert("Profile Updated Successfully");

if (firstTime) {
    navigate("/student");
} else {
    navigate("/student/profile");
}

    }
    catch (err) {

        console.log(err);

        alert("Update Failed");

    }

};

    return (
    <DashboardLayout>

        <div className="edit-profile-container">

            <h2>
    {isFirstTime ? "Complete Your Profile" : "Edit Profile"}
</h2>
           {isFirstTime && (
    <div className="profile-info">
        <h4>👋 Welcome</h4>
        <p>
            Please complete your profile before applying for internships.
        </p>
    </div>
)}

            <form className="profile-form" onSubmit={handleSubmit}>

    <div className="form-group">
        <label>College Name</label>
        <input
            type="text"
            name="collegeName"
            value={student.collegeName}
            onChange={handleChange}
        />
    </div>

    <div className="form-group">
        <label>Branch</label>
        <input
            type="text"
            name="branch"
            value={student.branch}
            onChange={handleChange}
        />
    </div>

    <div className="form-group">
        <label>CGPA</label>
        <input
            type="number"
            step="0.1"
            name="cgpa"
            value={student.cgpa}
            onChange={handleChange}
        />
    </div>

    <div className="form-group">
        <label>Location</label>
        <input
            type="text"
            name="location"
            value={student.location}
            onChange={handleChange}
        />
    </div>

    <div className="form-group">
        <label>Skills</label>
       <textarea
    name="skills"
    value={student.skills}
    onChange={handleChange}
    placeholder="Java, Spring Boot, React"
/>
    </div>

    <div className="form-group">

    <label>Current Resume</label>

    {
        student.resume ?

        <div>

            <a
                href={`http://localhost:8080/api/resume/${student.resume}`}
                target="_blank"
                rel="noreferrer"
                className="resume-link"
            >
                📄 View Resume
            </a>

        </div>

        :

        <p>No Resume Uploaded</p>
    }

</div>

<div className="form-group">

    <label>Upload New Resume (PDF)</label>

    <input
        type="file"
        accept=".pdf"
        onChange={(e) => setResume(e.target.files[0])}
    />

</div>

<div className="button-group">

    {!isFirstTime && (
        <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/student/profile")}
        >
            Cancel
        </button>
    )}

    <button
        type="submit"
        className="update-btn"
    >
        {isFirstTime ? "Complete Profile" : "Update Profile"}
    </button>

</div>

</form>

        </div>

    </DashboardLayout>
);

}

export default EditStudentProfile;