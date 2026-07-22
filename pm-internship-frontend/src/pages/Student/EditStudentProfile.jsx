import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";
import "./EditStudentProfile.css";

function EditStudentProfile() {

    const navigate = useNavigate();

    const studentId = localStorage.getItem("studentId");

    const [student, setStudent] = useState({
        collegeName: "",
        branch: "",
        cgpa: "",
        location: "",
        skills: ""
    });

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

    const handleSubmit = (e) => {

    e.preventDefault();

    const request = {
        ...student,
        skills: student.skills
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill !== "")
    };

    api.put(`/student/profile/${studentId}`, request)
        .then(() => {
            alert("Profile Updated Successfully");
            navigate("/student/profile");
        })
        .catch(err => console.log(err));
};

    return (
    <DashboardLayout>

        <div className="edit-profile-container">

            <h2>Edit Profile</h2>

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

    <div className="button-group">
        <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/student/profile")}
        >
            Cancel
        </button>

        <button
            type="submit"
            className="update-btn"
        >
            Update Profile
        </button>
    </div>

</form>

        </div>

    </DashboardLayout>
);

}

export default EditStudentProfile;