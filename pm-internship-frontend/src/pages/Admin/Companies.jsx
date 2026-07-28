import { useEffect, useState } from "react";
import { FaSearch, FaBuilding } from "react-icons/fa";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";
import "./Companies.css";

function Companies() {

    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadCompanies();
    }, []);

    const loadCompanies = () => {

        api.get("/admin/companies")
            .then(res => setCompanies(res.data))
            .catch(err => console.log(err));

    };

    const deleteCompany = (id) => {

        if (!window.confirm("Are you sure you want to delete this company?"))
            return;

        api.delete(`/admin/companies/${id}`)
            .then(() => loadCompanies())
            .catch(err => console.log(err));

    };

    const filteredCompanies = companies.filter(company =>
        company.companyName.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <DashboardLayout>

            <div className="companies-page">

                {/* Header */}

                <div className="companies-header">

                    <div>

                        <h1>🏢 Company Management</h1>

                        <p>
                            Manage all registered companies participating in the
                            PM Internship Allocation System.
                        </p>

                    </div>

                    <div className="company-count">

                        <FaBuilding />

                        <div>

                            <h2>{companies.length}</h2>

                            <span>Total Companies</span>

                        </div>

                    </div>

                </div>

                {/* Search */}

                <div className="search-container">

                    

                    <input
                        className="search-box"
                        placeholder="Search company..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                {/* Table */}

                <div className="table-container">

                    <table className="company-table">

                        <thead>

                            <tr>

                                <th>Company</th>
                                <th>Email</th>
                                <th>Industry</th>
                                <th>Website</th>
                                <th>Address</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredCompanies.length > 0 ? (

                                filteredCompanies.map(company => (

                                    <tr key={company.id}>

                                        <td>{company.companyName}</td>

                                        <td>{company.email}</td>

                                        <td>{company.industry}</td>

                                        <td>{company.website}</td>

                                        <td>{company.address}</td>

                                        <td>

                                            <button
                                                className="delete-btn"
                                                onClick={() => deleteCompany(company.id)}
                                            >
                                                🗑 Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="6" className="empty-data">

                                        No companies found.

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

export default Companies;