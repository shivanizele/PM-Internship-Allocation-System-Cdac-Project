import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";
import "./Allocations.css";

function Allocations() {

    const [allocations, setAllocations] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadAllocations();
    }, []);

    const loadAllocations = () => {

        api.get("/admin/allocations")
            .then(res => setAllocations(res.data))
            .catch(err => console.log(err));

    };

    const deleteAllocation = (id) => {

        if (!window.confirm("Delete this allocation?"))
            return;

        api.delete(`/admin/allocations/${id}`)
            .then(() => loadAllocations())
            .catch(err => console.log(err));

    };

    return (

        <DashboardLayout>

            <h1>Allocations</h1>

            <input
                className="search-box"
                placeholder="Search Student..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table className="student-table">

                <thead>

                    <tr>

                        <th>Student</th>
                        <th>Company</th>
                        <th>Internship</th>
                        <th>Allocated On</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        allocations
                            .filter(a =>
                                a.studentName
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            )
                            .map(a => (

                                <tr key={a.id}>

                                    <td>{a.studentName}</td>
                                    <td>{a.companyName}</td>
                                    <td>{a.internshipTitle}</td>
                                    <td>
                                    {new Date(a.allocatedAt).toLocaleDateString("en-IN")}
                                    </td>

                                    <td>

                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteAllocation(a.id)}
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

export default Allocations;