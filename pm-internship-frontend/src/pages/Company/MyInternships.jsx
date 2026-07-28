import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";
import "./MyInternships.css";

function MyInternships() {

    const companyId = localStorage.getItem("companyId");

    const [internships, setInternships] = useState([]);

    useEffect(() => {
        loadInternships();
    }, []);

    const loadInternships = async () => {

        try {

            const response = await api.get(`/company/${companyId}/internships`);
            setInternships(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const deleteInternship = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this internship?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/internships/${id}`);

            alert("Internship deleted successfully.");

            loadInternships();

        } catch (error) {

            console.log(error);
             console.log(error.response);
             console.log(error.response?.data);
            alert("Unable to delete internship.");

        }

    };

    return (

<DashboardLayout>

<div className="internship-page">

    <div className="internship-header">

        <h2>💼 My Internships</h2>

        <Link
            to="/company/add-internship"
            className="add-btn"
        >
            + Add Internship
        </Link>

    </div>

    <div className="table-card">

        <table className="internship-table">

            <thead>

                <tr>

                    <th>Title</th>
                    <th>Location</th>
                    <th>Stipend</th>
                    <th>Duration</th>
                    <th>Seats</th>
                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {internships.length > 0 ? (

                    internships.map((i) => (

                        <tr key={i.id}>

                            <td>
                                <strong>{i.title}</strong>
                            </td>

                            <td>{i.location}</td>

                            <td>
                                <span className="stipend">
                                    ₹{i.stipend}
                                </span>
                            </td>

                            <td>
                                <span className="duration">
                                    {i.durationMonths} Months
                                </span>
                            </td>

                            <td>
                                <span className="seats">
                                    {i.availableSeats}
                                </span>
                            </td>

                            <td>

                                <div className="action-buttons">

                                    <Link to={`/company/edit-internship/${i.id}`}>
                                        <button className="edit-btn">
                                            Edit
                                        </button>
                                    </Link>

                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteInternship(i.id)}
                                    >
                                        Delete
                                    </button>

                                    <Link
                                        to={`/company/applications/${i.id}`}
                                    >
                                        <button className="application-btn">
                                            Applications
                                        </button>
                                    </Link>

                                </div>

                            </td>

                        </tr>

                    ))

                ) : (

                    <tr>

                        <td
                            colSpan="6"
                            className="empty-row"
                        >
                            🚫 No internships posted yet.
                        </td>

                    </tr>

                )}

            </tbody>

        </table>

    </div>

</div>

</DashboardLayout>

);
}

export default MyInternships;