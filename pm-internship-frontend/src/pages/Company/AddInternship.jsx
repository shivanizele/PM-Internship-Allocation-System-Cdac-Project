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

            <h2>Add Internship</h2>

            <form
                className="internship-form"
                onSubmit={saveInternship}>

                <input
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                />

                <input
                    name="requiredSkills"
                    placeholder="Java, Spring Boot, React"
                    onChange={handleChange}
                />

                <input
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="stipend"
                    placeholder="Stipend"
                    min="1"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="durationMonths"
                    placeholder="Duration(In Months)"
                    min="1"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    name="minimumCgpa"
                    placeholder="Minimum CGPA"
                    onKeyDown={(e) => {
                        if (e.key === "-" || e.key === "e") {
                            e.preventDefault();
                        }
                    }}
                    onChange={handleChange}
                />

                {errors.minimumCgpa && (
                    <p style={{ color: "red" }}>
                        {errors.minimumCgpa}
                    </p>
                )}

                <input
                    type="number"
                    name="availableSeats"
                    placeholder="Available Seats"
                    min="1"
                    onChange={handleChange}
                />

                <button type="submit">

                    Save Internship

                </button>

            </form>

        </DashboardLayout>

    );

}

export default AddInternship;