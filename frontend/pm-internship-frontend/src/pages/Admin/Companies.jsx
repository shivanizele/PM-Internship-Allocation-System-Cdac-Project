import { useEffect, useState } from "react";
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
            .then(res => setCompanies(res.data));

    };

    const deleteCompany = (id) => {

        if (!window.confirm("Delete Company?"))
            return;

        api.delete(`/admin/companies/${id}`)
            .then(() => loadCompanies());

    };

    return (

        <DashboardLayout>

            <h1>Companies</h1>

            <input
                className="search-box"
                placeholder="Search Company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

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

                    {
                        companies
                            .filter(c =>
                                c.companyName.toLowerCase().includes(search.toLowerCase())
                            )
                            .map(company => (

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

export default Companies;