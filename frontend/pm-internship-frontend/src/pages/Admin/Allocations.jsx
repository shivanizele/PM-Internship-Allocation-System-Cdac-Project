
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

    const runAllocation = () => {

        api.post("/admin/allocate")
            .then(res => {

                alert(res.data);

                loadAllocations();

            });

    };

    const deleteAllocation = (id) => {

        if (!window.confirm("Delete Allocation?"))
            return;

        api.delete(`/admin/allocations/${id}`)
            .then(() => loadAllocations());

    };

    return (

        <DashboardLayout>

            <div className="allocation-header">

                <h1>Internship Allocations</h1>

                <button
                    className="allocate-btn"
                    onClick={runAllocation}
                >
                    Run AI Allocation
                </button>

            </div>

            <input
                className="search-box"
                placeholder="Search Student..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table className="allocation-table">

                <thead>

                    <tr>

                        <th>Student</th>
                        <th>Internship</th>
                        <th>Company</th>
                        <th>Match %</th>
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

                                    <td>{a.internshipTitle}</td>

                                    <td>{a.companyName}</td>

                                    <td>{a.matchPercentage}%</td>

                                    <td>
                                        {
                                            a.allocatedAt
                                                ? new Date(a.allocatedAt).toLocaleDateString()
                                                : "-"
                                        }
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

