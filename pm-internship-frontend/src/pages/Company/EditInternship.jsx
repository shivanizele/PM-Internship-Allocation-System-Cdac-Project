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

            <h2>Edit Internship</h2>

            <form
                className="internship-form"
                onSubmit={updateInternship}>

                <input
                    name="title"
                    value={internship.title}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    value={internship.description}
                    onChange={handleChange}
                />

                <input
                    name="requiredSkills"
                    value={internship.requiredSkills}
                    onChange={handleChange}
                />

                <input
                    name="location"
                    value={internship.location}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="stipend"
                    value={internship.stipend}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="durationMonths"
                    value={internship.durationMonths}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    step="0.1"
                    name="minimumCgpa"
                    value={internship.minimumCgpa}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="availableSeats"
                    value={internship.availableSeats}
                    onChange={handleChange}
                />

                <button type="submit">

                    Update Internship

                </button>

            </form>

        </DashboardLayout>

    );

}

export default EditInternship;