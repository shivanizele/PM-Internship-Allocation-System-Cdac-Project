import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";
import "./AddInternship.css";

function EditInternship() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [internship, setInternship] = useState({

        title: "",
        description: "",
        requiredSkills: "",
        location: "",
        stipend: "",
        durationMonths: "",
        minimumCgpa: "",
        availableSeats: ""

    });

    useEffect(() => {

        api.get(`/internships/${id}`)
            .then(res => {

                setInternship({

                    ...res.data,

                    requiredSkills: res.data.requiredSkills.join(", ")

                });

            });

    }, [id]);

    const handleChange = (e) => {

        setInternship({

            ...internship,

            [e.target.name]: e.target.value

        });

    };

    const updateInternship = async (e) => {

        e.preventDefault();

        try {

            await api.put(`/internships/${id}`, {

                title: internship.title,
                description: internship.description,
                requiredSkills: internship.requiredSkills
                    .split(",")
                    .map(skill => skill.trim()),

                location: internship.location,
                stipend: Number(internship.stipend),
                durationMonths: Number(internship.durationMonths),
                minimumCgpa: Number(internship.minimumCgpa),
                availableSeats: Number(internship.availableSeats)

            });

            alert("Internship Updated");

            navigate("/company/internships");

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

    <DashboardLayout>

        <div className="add-internship-page">

            <div className="page-header">

                <div>

                    <h1>✏️ Edit Internship</h1>

                    <p>
                        Update internship information and keep your job posting
                        accurate for students.
                    </p>

                </div>

            </div>

            <div className="internship-card">

                <form
                    className="internship-form"
                    onSubmit={updateInternship}
                >

                    <div className="form-grid">

                        <div className="form-group">

                            <label>Internship Title</label>

                            <input
                                type="text"
                                name="title"
                                value={internship.title}
                                onChange={handleChange}
                                placeholder="Java Developer Intern"
                            />

                        </div>

                        <div className="form-group">

                            <label>Location</label>

                            <input
                                type="text"
                                name="location"
                                value={internship.location}
                                onChange={handleChange}
                                placeholder="Pune"
                            />

                        </div>

                        <div className="form-group full-width">

                            <label>Description</label>

                            <textarea
                                rows="5"
                                name="description"
                                value={internship.description}
                                onChange={handleChange}
                                placeholder="Describe internship responsibilities..."
                            />

                        </div>

                        <div className="form-group full-width">

                            <label>Required Skills</label>

                            <input
                                type="text"
                                name="requiredSkills"
                                value={internship.requiredSkills}
                                onChange={handleChange}
                                placeholder="Java, Spring Boot, React, SQL"
                            />

                        </div>

                        <div className="form-group">

                            <label>Monthly Stipend (₹)</label>

                            <input
                                type="number"
                                name="stipend"
                                min="1"
                                value={internship.stipend}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Duration (Months)</label>

                            <input
                                type="number"
                                name="durationMonths"
                                min="1"
                                value={internship.durationMonths}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Minimum CGPA</label>

                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                name="minimumCgpa"
                                value={internship.minimumCgpa}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Available Seats</label>

                            <input
                                type="number"
                                name="availableSeats"
                                min="1"
                                value={internship.availableSeats}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="button-area">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/company/internships")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-btn"
                        >
                            Update Internship
                        </button>

                    </div>

                </form>

            </div>

        </div>

    </DashboardLayout>

);

}

export default EditInternship;