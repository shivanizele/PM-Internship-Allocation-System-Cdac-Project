
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";
import "./Internships.css";

function Internships() {

    const [internships, setInternships] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        loadInternships();

    }, []);

    const loadInternships = () => {

        api.get("/admin/internships")
            .then(res => setInternships(res.data));

    };

    const deleteInternship = (id) => {

        if (!window.confirm("Delete Internship?"))
            return;

        api.delete(`/admin/internships/${id}`)
            .then(() => loadInternships());

    };

    return (

        <DashboardLayout>

            <h1>Internships</h1>

            <input
                className="search-box"
                placeholder="Search Internship..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table className="internship-table">

                <thead>

                    <tr>

                        <th>Title</th>
                        <th>Company</th>
                        <th>Location</th>
                        <th>CGPA</th>
                        <th>Stipend</th>
                        <th>Seats</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        internships
                            .filter(i =>
                                i.title.toLowerCase().includes(search.toLowerCase())
                            )
                            .map(i => (

                                <tr key={i.id}>

                                    <td>{i.title}</td>
                                    <td>{i.companyName}</td>
                                    <td>{i.location}</td>
                                    <td>{i.minimumCgpa}</td>
                                    <td>₹ {i.stipend}</td>
                                    <td>{i.availableSeats}</td>

                                    <td>

                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteInternship(i.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))
                    }

                </tbody>

            </table>

        </DashboardLayout>

    );

}

export default Internships;
