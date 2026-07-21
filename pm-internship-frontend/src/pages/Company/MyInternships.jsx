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

            <div className="internship-header">

                <h2>My Internships</h2>

                <Link
                    to="/company/add-internship"
                    className="add-btn"
                >
                    + Add Internship
                </Link>

            </div>

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

                                <td>{i.title}</td>
                                <td>{i.location}</td>
                                <td>₹{i.stipend}</td>
                                <td>{i.durationMonths} Months</td>
                                <td>{i.availableSeats}</td>

                                <td>

                                    <Link
                                        to={`/company/edit-internship/${i.id}`}
                                    >
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
                                    <Link to={`/company/applications/${i.id}`}>
                                     <button>Applications</button>
                                    </Link>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="6" style={{ textAlign: "center" }}>
                                No internships found.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </DashboardLayout>

    );

}

export default MyInternships;