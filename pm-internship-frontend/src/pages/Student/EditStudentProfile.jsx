import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
// import api from "../../services/api";
import { isPasswordValid, validatePassword } from "../../utils/passwordValidation";
import { isStudentProfileComplete } from "../../utils/studentProfile";
import "./EditStudentProfile.css";
import api, { openResume } from "../../services/api";

const initialStudentState = {
    collegeName: "",
    branch: "",
    cgpa: "",
    location: "",
    skills: "",
    qualification: {
        highestQualification: "",
        degree: "",
        specialization: "",
        collegeOrUniversity: "",
        passingYear: "",
        percentageOrCgpa: "",
        tenthPercentage: "",
        twelfthOrDiplomaPercentage: "",
        certifications: ""
    }
};

const initialPasswordState = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
};

function EditStudentProfile() {

    const navigate = useNavigate();
    const studentId = localStorage.getItem("studentId");

    const [resume, setResume] = useState(null);
    const [student, setStudent] = useState(initialStudentState);
    const [passwordForm, setPasswordForm] = useState(initialPasswordState);
    const [errors, setErrors] = useState({});
    const [passwordMessage, setPasswordMessage] = useState("");
    const [existingResume, setExistingResume] = useState("");
    const [profileComplete, setProfileComplete] = useState(false);

    const passwordChecks = validatePassword(passwordForm.newPassword);
    const isFirstTime = !profileComplete;

    useEffect(() => {
        api.get(`/student/profile/${studentId}`)
            .then(res => {
                const data = res.data;

                setStudent({
                    collegeName: data.collegeName || "",
                    branch: data.branch || "",
                    cgpa: data.cgpa ?? "",
                    location: data.location || "",
                    skills: Array.isArray(data.skills) ? data.skills.join(", ") : "",
                    qualification: {
                        highestQualification: data.qualification?.highestQualification || "",
                        degree: data.qualification?.degree || "",
                        specialization: data.qualification?.specialization || "",
                        collegeOrUniversity: data.qualification?.collegeOrUniversity || "",
                        passingYear: data.qualification?.passingYear ?? "",
                        percentageOrCgpa: data.qualification?.percentageOrCgpa || "",
                        tenthPercentage: data.qualification?.tenthPercentage || "",
                        twelfthOrDiplomaPercentage: data.qualification?.twelfthOrDiplomaPercentage || "",
                        certifications: data.qualification?.certifications || ""
                    }
                });

                setExistingResume(data.resume || "");
                setProfileComplete(isStudentProfileComplete(data));
            })
            .catch(err => console.log(err));
    }, [studentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // CGPA validation
        if (name === "cgpa") {
            // Allow empty value while typing
            if (value === "") {
                setStudent(prev => ({
                    ...prev,
                    cgpa: ""
                }));

                setErrors(prev => ({
                    ...prev,
                    cgpa: "",
                    server: ""
                }));

                return;
            }

            const cgpaValue = Number(value);

            // Do not allow negative or greater than 10
            if (cgpaValue < 0 || cgpaValue > 10) {
                setErrors(prev => ({
                    ...prev,
                    cgpa: "CGPA must be between 0 and 10.",
                    server: ""
                }));

                return;
            }
        }

        setStudent(prev => ({
            ...prev,
            [name]: value
        }));

        setErrors(prev => ({
            ...prev,
            [name]: "",
            server: ""
        }));
    };

    const handleQualificationChange = (e) => {
    const { name, value } = e.target;

    // Validate 10th percentage
    if (name === "tenthPercentage") {
        if (value !== "") {
            const percentage = Number(value);

            if (percentage < 0 || percentage > 100) {
                setErrors(prev => ({
                    ...prev,
                    tenthPercentage: "10th percentage must be between 0 and 100.",
                    server: ""
                }));
                return;
            }
        }
    }

    // Validate 12th / Diploma percentage
    if (name === "twelfthOrDiplomaPercentage") {
        if (value !== "") {
            const percentage = Number(value);

            if (percentage < 0 || percentage > 100) {
                setErrors(prev => ({
                    ...prev,
                    twelfthOrDiplomaPercentage:
                        "12th/Diploma percentage must be between 0 and 100.",
                    server: ""
                }));
                return;
            }
        }
    }

    setStudent(prev => ({
        ...prev,
        qualification: {
            ...prev.qualification,
            [name]: value
        }
    }));

    setErrors(prev => ({
        ...prev,
        [name]: "",
        server: ""
    }));
};

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;

        setPasswordForm(prev => ({
            ...prev,
            [name]: value
        }));

        setErrors(prev => ({
            ...prev,
            [name]: "",
            passwordServer: ""
        }));

        setPasswordMessage("");
    };

    const validateProfileForm = () => {
        const nextErrors = {};

        if (!student.collegeName.trim()) nextErrors.collegeName = "College name is required.";
        if (!student.branch.trim()) nextErrors.branch = "Branch/Degree is required.";
        if (!student.location.trim()) nextErrors.location = "Location is required.";
        if (!String(student.cgpa).trim()) nextErrors.cgpa = "CGPA/Percentage is required.";

        const skillList = student.skills
            .split(",")
            .map(skill => skill.trim())
            .filter(Boolean);

        if (skillList.length === 0) {
            nextErrors.skills = "Add at least one skill.";
        }

        if (!student.qualification.highestQualification.trim()) nextErrors.highestQualification = "Highest qualification is required.";
        if (!student.qualification.degree.trim()) nextErrors.degree = "Degree is required.";
        if (!student.qualification.specialization.trim()) nextErrors.specialization = "Specialization/Branch is required.";
        if (!student.qualification.collegeOrUniversity.trim()) nextErrors.collegeOrUniversity = "College/University is required.";
        if (!String(student.qualification.passingYear).trim()) nextErrors.passingYear = "Passing year is required.";
        if (!student.qualification.percentageOrCgpa.trim()) nextErrors.percentageOrCgpa = "Percentage/CGPA is required.";
        if (!student.qualification.tenthPercentage.trim()) {
            nextErrors.tenthPercentage = "10th percentage is required.";
        } else {
            const tenthPercentage = Number(student.qualification.tenthPercentage);

            if (tenthPercentage < 0 || tenthPercentage > 100) {
                nextErrors.tenthPercentage =
                    "10th percentage must be between 0 and 100.";
            }
        }
        if (!student.qualification.twelfthOrDiplomaPercentage.trim()) {
            nextErrors.twelfthOrDiplomaPercentage =
                "12th/Diploma percentage is required.";
        } else {
            const twelfthPercentage =
                Number(student.qualification.twelfthOrDiplomaPercentage);

            if (twelfthPercentage < 0 || twelfthPercentage > 100) {
                nextErrors.twelfthOrDiplomaPercentage =
                    "12th/Diploma percentage must be between 0 and 100.";
            }
        }

        setErrors(prev => ({
            ...prev,
            ...nextErrors
        }));

        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateProfileForm()) {
            return;
        }

        const request = {
            collegeName: student.collegeName.trim(),
            branch: student.branch.trim(),
            cgpa: Number(student.cgpa),
            location: student.location.trim(),
            skills: student.skills
                .split(",")
                .map(skill => skill.trim())
                .filter(Boolean),
            qualification: {
                highestQualification: student.qualification.highestQualification.trim(),
                degree: student.qualification.degree.trim(),
                specialization: student.qualification.specialization.trim(),
                collegeOrUniversity: student.qualification.collegeOrUniversity.trim(),
                passingYear: Number(student.qualification.passingYear),
                percentageOrCgpa: student.qualification.percentageOrCgpa.trim(),
                tenthPercentage: student.qualification.tenthPercentage.trim(),
                twelfthOrDiplomaPercentage: student.qualification.twelfthOrDiplomaPercentage.trim(),
                certifications: student.qualification.certifications.trim()
            }
        };

        try {
            const profileResponse = await api.put(`/student/profile/${studentId}`, request);

            if (resume) {
                const formData = new FormData();
                formData.append("file", resume);

                await api.post(`/resume/upload/${studentId}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
            }

            alert("Profile updated successfully.");

            const complete = isStudentProfileComplete(profileResponse.data);
            setProfileComplete(complete);
            navigate(complete ? "/student/profile" : "/student/profile/edit");
        } catch (err) {
            console.log(err);
            setErrors(prev => ({
                ...prev,
                server: err.response?.data || "Update failed."
            }));
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        const nextErrors = {};

        if (!passwordForm.currentPassword) {
            nextErrors.currentPassword = "Current password is required.";
        }

        if (!isPasswordValid(passwordForm.newPassword)) {
            nextErrors.newPassword = "New password must satisfy all listed requirements.";
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            nextErrors.confirmPassword = "Confirm password must match.";
        }

        setErrors(prev => ({
            ...prev,
            ...nextErrors
        }));

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        try {
            const response = await api.put("/auth/change-password", passwordForm);
            setPasswordMessage(response.data);
            setPasswordForm(initialPasswordState);
        } catch (err) {
            console.log(err);
            setErrors(prev => ({
                ...prev,
                passwordServer: err.response?.data || "Password update failed."
            }));
        }
    };

    return (
        <DashboardLayout>
            <div className="edit-profile-container">
                <h2>{isFirstTime ? "Complete Your Profile" : "Edit Profile"}</h2>

                {isFirstTime && (
                    <div className="profile-info">
                        <h4>Welcome</h4>
                        <p>Please complete your profile before applying for internships.</p>
                    </div>
                )}

                <form className="profile-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>College Name</label>
                        <input type="text" name="collegeName" value={student.collegeName} onChange={handleChange} />
                        {errors.collegeName && <p className="field-error">{errors.collegeName}</p>}
                    </div>

                    <div className="form-group">
                        <label>Branch / Degree</label>
                        <input type="text" name="branch" value={student.branch} onChange={handleChange} />
                        {errors.branch && <p className="field-error">{errors.branch}</p>}
                    </div>

                    <div className="form-group">
                        <label>CGPA</label>
                        <input
                            type="number"
                            name="cgpa"
                            min="0"
                            max="10"
                            step="0.01"
                            value={student.cgpa}
                            onChange={handleChange}
                        />
                        {errors.cgpa && <p className="field-error">{errors.cgpa}</p>}
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input type="text" name="location" value={student.location} onChange={handleChange} />
                        {errors.location && <p className="field-error">{errors.location}</p>}
                    </div>

                    <div className="form-group">
                        <label>Skills</label>
                        <textarea
                            name="skills"
                            value={student.skills}
                            onChange={handleChange}
                            placeholder="Java, Spring Boot, React"
                        />
                        {errors.skills && <p className="field-error">{errors.skills}</p>}
                    </div>

                    <div className="form-section">
                        <h3>Qualification Details</h3>
                    </div>

                    <div className="form-group">
                        <label>Highest Qualification</label>
                        <input
                            type="text"
                            name="highestQualification"
                            value={student.qualification.highestQualification}
                            onChange={handleQualificationChange}
                        />
                        {errors.highestQualification && <p className="field-error">{errors.highestQualification}</p>}
                    </div>

                    <div className="form-group">
                        <label>Degree</label>
                        <input type="text" name="degree" value={student.qualification.degree} onChange={handleQualificationChange} />
                        {errors.degree && <p className="field-error">{errors.degree}</p>}
                    </div>

                    <div className="form-group">
                        <label>Specialization / Branch</label>
                        <input
                            type="text"
                            name="specialization"
                            value={student.qualification.specialization}
                            onChange={handleQualificationChange}
                        />
                        {errors.specialization && <p className="field-error">{errors.specialization}</p>}
                    </div>

                    <div className="form-group">
                        <label>College / University</label>
                        <input
                            type="text"
                            name="collegeOrUniversity"
                            value={student.qualification.collegeOrUniversity}
                            onChange={handleQualificationChange}
                        />
                        {errors.collegeOrUniversity && <p className="field-error">{errors.collegeOrUniversity}</p>}
                    </div>

                    <div className="form-group">
                        <label>Passing Year</label>

                        <select
                            name="passingYear"
                            value={student.qualification.passingYear}
                            onChange={handleQualificationChange}
                        >
                            <option value="">Select Year</option>

                            {Array.from(
                                { length: new Date().getFullYear() - 1990 + 1 },
                                (_, index) => new Date().getFullYear() - index
                            ).map(year => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>

                        {errors.passingYear && (
                            <p className="field-error">
                                {errors.passingYear}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Percentage / CGPA</label>
                        <input
                            type="text"
                            name="percentageOrCgpa"
                            value={student.qualification.percentageOrCgpa}
                            onChange={handleQualificationChange}
                            placeholder="8.65 CGPA or 86.5%"
                        />
                        {errors.percentageOrCgpa && <p className="field-error">{errors.percentageOrCgpa}</p>}
                    </div>

                    <div className="form-group">
                        <label>10th Percentage</label>
                        <input
                            type="number"
                            name="tenthPercentage"
                            min="0"
                            max="100"
                            step="0.01"
                            value={student.qualification.tenthPercentage}
                            onChange={handleQualificationChange}
                        />
                        {errors.tenthPercentage && (
                            <p className="field-error">{errors.tenthPercentage}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>12th Percentage / Diploma Percentage</label>
                        <input
                            type="number"
                            name="twelfthOrDiplomaPercentage"
                            min="0"
                            max="100"
                            step="0.01"
                            value={student.qualification.twelfthOrDiplomaPercentage}
                            onChange={handleQualificationChange}
                        />
                        {errors.twelfthOrDiplomaPercentage && (
                            <p className="field-error">{errors.twelfthOrDiplomaPercentage}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Certifications (Optional)</label>
                        <textarea
                            name="certifications"
                            value={student.qualification.certifications}
                            onChange={handleQualificationChange}
                            placeholder="Java, AWS, Spring Boot"
                        />
                    </div>

                    <div className="form-group">
                        <label>Current Resume</label>
                        {existingResume ? (
                            <div>
                                {/* <a
                                    href={`http://localhost:8080/api/resume/${existingResume}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="resume-link"
                                >
                                    View Resume
                                </a> */}
                                <button className="resume-btn" onClick={() => openResume(student.resume).catch(() => console.log("Unable to open resume."))}>View Resume</button>
                            </div>
                        ) : (
                            <p>No Resume Uploaded</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Upload New Resume (PDF)</label>
                        <input type="file" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} />
                    </div>

                    {errors.server && <p className="field-error">{errors.server}</p>}

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

                        <button type="submit" className="update-btn">
                            {isFirstTime ? "Complete Profile" : "Update Profile"}
                        </button>
                    </div>
                </form>

                <form className="profile-form password-form" onSubmit={handlePasswordSubmit}>
                    <div className="form-section">
                        <h3>Change Password</h3>
                    </div>

                    <div className="form-group">
                        <label>Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                        />
                        {errors.currentPassword && <p className="field-error">{errors.currentPassword}</p>}
                    </div>

                    <div className="form-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                        />
                        {errors.newPassword && <p className="field-error">{errors.newPassword}</p>}
                        <div className="password-hints">
                            <p className={passwordChecks.minLength ? "valid" : ""}>Minimum 8 characters</p>
                            <p className={passwordChecks.uppercase ? "valid" : ""}>At least one uppercase letter</p>
                            <p className={passwordChecks.lowercase ? "valid" : ""}>At least one lowercase letter</p>
                            <p className={passwordChecks.digit ? "valid" : ""}>At least one digit</p>
                            <p className={passwordChecks.special ? "valid" : ""}>At least one special character</p>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={passwordForm.confirmPassword}
                            onChange={handlePasswordChange}
                        />
                        {errors.confirmPassword && <p className="field-error">{errors.confirmPassword}</p>}
                    </div>

                    {errors.passwordServer && <p className="field-error">{errors.passwordServer}</p>}
                    {passwordMessage && <p className="success-message">{passwordMessage}</p>}

                    <button type="submit" className="update-btn">Update Password</button>
                </form>
            </div>
        </DashboardLayout>
    );
}

export default EditStudentProfile;
