import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";
import "./AddInternship.css";

function AddInternship() {

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

    const [errors, setErrors] = useState({
        minimumCgpa: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInternship({
            ...internship,
            [name]: value
        });

        if (name === "minimumCgpa") {
            if (Number(value) > 10) {
                setErrors({
                    ...errors,
                    minimumCgpa: "CGPA should be below or equal to 10"
                });
            } else {
                setErrors({
                    ...errors,
                    minimumCgpa: ""
                });
            }
        }
    };
    const saveInternship = async (e) => {

        e.preventDefault();

        try {

            await api.post("/internships", {

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

            alert("Internship Added Successfully");

            navigate("/company/internships");

        }

        catch (err) {

            console.log(err);

            alert("Unable to Add Internship");

        }

    };

    return (

    <DashboardLayout>

        <div className="add-internship-page">

            <div className="page-header">

                <div>

                    <h1>💼 Add New Internship</h1>

                    <p>
                        Create internship opportunities and start receiving
                        applications from talented students.
                    </p>

                </div>

            </div>

            <div className="internship-card">

                <form
                    className="internship-form"
                    onSubmit={saveInternship}
                >

                    <div className="form-grid">

                        <div className="form-group">

                            <label>Internship Title</label>

                            <input
                                type="text"
                                name="title"
                                placeholder="Java Developer Intern"
                                value={internship.title}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Location</label>

                            <input
                                type="text"
                                name="location"
                                placeholder="Pune"
                                value={internship.location}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group full-width">

                            <label>Description</label>

                            <textarea
                                rows="5"
                                name="description"
                                placeholder="Describe internship responsibilities..."
                                value={internship.description}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group full-width">

                            <label>Required Skills</label>

                            <input
                                type="text"
                                name="requiredSkills"
                                placeholder="Java, Spring Boot, React, SQL"
                                value={internship.requiredSkills}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Monthly Stipend (₹)</label>

                            <input
                                type="number"
                                name="stipend"
                                min="1"
                                placeholder="15000"
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
                                placeholder="6"
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
                                placeholder="7.5"
                                value={internship.minimumCgpa}
                                onChange={handleChange}
                                onKeyDown={(e) => {
                                    if (e.key === "-" || e.key === "e") {
                                        e.preventDefault();
                                    }
                                }}
                            />

                            {errors.minimumCgpa && (

                                <p className="field-error">

                                    {errors.minimumCgpa}

                                </p>

                            )}

                        </div>

                        <div className="form-group">

                            <label>Available Seats</label>

                            <input
                                type="number"
                                name="availableSeats"
                                min="1"
                                placeholder="5"
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

                            Save Internship

                        </button>

                    </div>

                </form>

            </div>

        </div>

    </DashboardLayout>

);

}

export default AddInternship;