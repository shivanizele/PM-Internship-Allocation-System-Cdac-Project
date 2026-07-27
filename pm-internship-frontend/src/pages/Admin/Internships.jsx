import { useEffect, useState } from "react";
import { FaSearch, FaBriefcase } from "react-icons/fa";
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
            .then(res => setInternships(res.data))
            .catch(err => console.log(err));

    };

    const deleteInternship = (id) => {

        if (!window.confirm("Are you sure you want to delete this internship?"))
            return;

        api.delete(`/admin/internships/${id}`)
            .then(() => loadInternships())
            .catch(err => console.log(err));

    };

    const filteredInternships = internships.filter(internship =>
        internship.title.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <DashboardLayout>

            <div className="internships-page">

                {/* Header */}

                <div className="internships-header">

                    <div>

                        <h1>💼 Internship Management</h1>

                        <p>
                            Manage internship opportunities posted by companies
                            under the PM Internship Allocation System.
                        </p>

                    </div>

                    <div className="internship-count">

                        <FaBriefcase />

                        <div>

                            <h2>{internships.length}</h2>

                            <span>Total Internships</span>

                        </div>

                    </div>

                </div>

                {/* Search */}

                <div className="search-container">

                   

                    <input
                        className="search-box"
                        placeholder="Search internship..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                {/* Table */}

                <div className="table-container">

                    <table className="internship-table">

                        <thead>

                            <tr>

                                <th>Title</th>
                                <th>Company</th>
                                <th>Location</th>
                                <th>Stipend</th>
                                <th>Minimum CGPA</th>
                                <th>Available Seats</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredInternships.length > 0 ? (

                                filteredInternships.map(internship => (

                                    <tr key={internship.id}>

                                        <td>{internship.title}</td>

                                        <td>{internship.companyName}</td>

                                        <td>{internship.location}</td>

                                        <td>₹ {internship.stipend}</td>

                                        <td>{internship.minimumCgpa}</td>

                                        <td>{internship.availableSeats}</td>

                                        <td>

                                            <button
                                                className="delete-btn"
                                                onClick={() => deleteInternship(internship.id)}
                                            >
                                                🗑 Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="7" className="empty-data">

                                        No internships found.

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

export default Internships;