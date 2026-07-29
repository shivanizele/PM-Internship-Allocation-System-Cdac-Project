import "./Topbar.css";
import { FaUserCircle, FaHome, FaSignOutAlt, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import api from "../../services/api";

function Topbar() {
    const fullName = localStorage.getItem("fullName");
    const role = localStorage.getItem("role");
    const studentId = localStorage.getItem("studentId");


    const [showMenu, setShowMenu] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(
        localStorage.getItem("profilePhoto")
    );

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProfilePhoto = async () => {
            if (role !== "STUDENT" || !studentId) {
                return;
            }

            try {
                const response = await api.get(
                    "/student/profile/" + studentId
                );

                const photo = response.data.profilePhoto;

                if (photo) {
                    setProfilePhoto(photo);
                    localStorage.setItem("profilePhoto", photo);
                }
            } catch (error) {
                console.error(
                    "Failed to load student profile:",
                    error
                );
            }
        };

        loadProfilePhoto();
    }, [role, studentId]);

    const goHome = () => {
        localStorage.clear();
        navigate("/");
    };

    const handlePhotoClick = () => {
        if (role === "STUDENT" && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];


        if (!file) {
            return;
        }

        if (!studentId) {
            alert("Student ID not found. Please login again.");
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image file.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Profile photo must be less than 5 MB.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("profilePhoto", file);

            const response = await api.put(
                "/student/profile/" + studentId + "/photo",
                formData
            );

            console.log("Upload response:", response.data);

            const uploadedPhoto = response.data.profilePhoto;

            if (uploadedPhoto) {
                localStorage.setItem(
                    "profilePhoto",
                    uploadedPhoto
                );

                setProfilePhoto(uploadedPhoto);
            }

            alert("Profile photo uploaded successfully!");
        } catch (error) {
            console.error(
                "Profile photo upload failed:",
                error
            );

            alert(
                error.response?.data ||
                "Failed to upload profile photo"
            );
        }
    };

    const photoUrl = profilePhoto
        ? "http://localhost:8080/uploads/profile-photos/" +
        profilePhoto
        : null;

    return (
        <div className="topbar">

            <div className="topbar-left">

                <button
                    className="home-btn"
                    onClick={goHome}
                >
                    <FaHome />
                    Home
                </button>

                <h2>
                    {role} Dashboard
                </h2>

            </div>

            <div className="topbar-user">

                <div
                    className="user-info"
                    onClick={() => setShowMenu(!showMenu)}
                >

                    {role === "STUDENT" && photoUrl ? (
                        <img
                            src={photoUrl}
                            alt="Profile"
                            className="profile-photo"
                            onClick={handlePhotoClick}
                        />
                    ) : (
                        <FaUserCircle
                            size={role === "ADMIN" || role === "COMPANY" ? 42 : 28}
                            onClick={handlePhotoClick}
                        />
                    )}

                    <span>
                        {fullName}
                    </span>


                </div>

                {role === "STUDENT" && (
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handlePhotoChange}
                        style={{ display: "none" }}
                    />
                )}

                {showMenu && (
                    <div
                        className={`user-dropdown ${role === "STUDENT" ? "student-dropdown" : ""
                            }`}
                    >

                        {role === "STUDENT" && (
                            <button
                                className="dropdown-btn change-photo-btn"
                                onClick={handlePhotoClick}
                            >
                                <FaCamera className="dropdown-icon" />
                                Change Photo
                            </button>
                        )}

                        <button
                            className="dropdown-btn logout-btn"
                            onClick={goHome}
                        >
                            <FaSignOutAlt className="dropdown-icon" />
                            Logout
                        </button>
                    </div>
                )}

            </div>

        </div>
    );


}

export default Topbar;
