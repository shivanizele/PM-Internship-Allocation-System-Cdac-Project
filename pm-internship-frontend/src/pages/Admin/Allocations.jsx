import { useEffect, useState } from "react";
import { FaRobot, FaCheckCircle, FaClipboardList } from "react-icons/fa";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";
import "./Allocations.css";

function Allocations() {

    const [allocations, setAllocations] = useState([]);
    const [preview, setPreview] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadAllocations();
    }, []);

    const loadAllocations = async () => {

        try {

            const res = await api.get("/admin/allocations");

            setAllocations(res.data || []);

        } catch (err) {

            setError(err.response?.data || "Unable to load allocations.");

        }

    };

    const generatePreview = async () => {

        setLoading(true);
        setError("");

        try {

            const res = await api.get("/allocation/preview");

            setPreview(res.data || []);

        } catch (err) {

            setError(
                err.response?.data ||
                "Unable to generate AI allocation preview."
            );

        } finally {

            setLoading(false);

        }

    };

    const confirmAllocation = async () => {

        if (!window.confirm("Confirm these AI allocation recommendations?"))
            return;

        setLoading(true);
        setError("");

        try {

            const res = await api.post("/allocation/confirm");

            alert(res.data);

            setPreview([]);

            loadAllocations();

        } catch (err) {

            setError(
                err.response?.data ||
                "Unable to confirm allocation."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <DashboardLayout>

            <div className="allocations-page">

                {/* Header */}

                <div className="allocations-header">

                    <div>

                        <h1>🤖 AI Allocation Review</h1>

                        <p>

                            Review AI-generated internship recommendations
                            before confirming the final allocation.

                        </p>

                    </div>

                    <div className="allocation-count">

                        <FaClipboardList />

                        <div>

                            <h2>{allocations.length}</h2>

                            <span>Confirmed Allocations</span>

                        </div>

                    </div>

                </div>

                {/* Buttons */}

                <div className="action-buttons">

                    <button

                        className="ai-btn"

                        onClick={generatePreview}

                        disabled={loading}

                    >

                        <FaRobot />

                        &nbsp;

                        {loading
                            ? "Generating..."
                            : "Generate AI Allocation"}

                    </button>

                    {

                        preview.length > 0 &&

                        <button

                            className="confirm-btn"

                            onClick={confirmAllocation}

                            disabled={loading}

                        >

                            <FaCheckCircle />

                            &nbsp;

                            Confirm Allocation

                        </button>

                    }

                </div>

                {/* Error */}

                {

                    error &&

                    <div className="error-box">

                        {error}

                    </div>

                }

                {/* Preview */}

                {

                    preview.map(item => (

                        <div

                            className="preview-card"

                            key={item.internshipId}

                        >

                            <h3>

                                {item.internshipTitle}

                            </h3>

                            <p>

                                <strong>Company:</strong>

                                {" "}

                                {item.companyName}

                                <br />

                                <strong>Available Seats:</strong>

                                {" "}

                                {item.availableSeats}

                                <br />

                                <strong>Total Applicants:</strong>

                                {" "}

                                {item.applicantCount}

                            </p>

                            {

                                item.recommendedStudents.length > 0

                                    ?

                                    <ol>

                                        {

                                            item.recommendedStudents.map(student => (

                                                <li

                                                    key={student.applicationId}

                                                >

                                                    <strong>

                                                        {

                                                            student.studentName

                                                        }

                                                    </strong>

                                                    {" "}

                                                    -

                                                    {" "}

                                                    {

                                                        Math.round(

                                                            student.matchScore

                                                        )

                                                    }

                                                    %

                                                    Match

                                                </li>

                                            ))

                                        }

                                    </ol>

                                    :

                                    <p>

                                        No eligible recommendation for this internship.

                                    </p>

                            }

                        </div>

                    ))

                }

                {/* Confirmed Allocation Table */}

                <h2
                    style={{
                        marginTop: "35px",
                        marginBottom: "15px"
                    }}
                >

                    Confirmed Allocations

                </h2>

                <div className="table-container">

                    <table className="allocation-table">

                        <thead>

                            <tr>

                                <th>Student</th>

                                <th>Company</th>

                                <th>Internship</th>

                                <th>Match %</th>

                                <th>Allocated On</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                allocations.length > 0

                                    ?

                                    allocations.map(a => (

                                        <tr

                                            key={a.allocationId}

                                        >

                                            <td>

                                                {a.studentName}

                                            </td>

                                            <td>

                                                {a.companyName}

                                            </td>

                                            <td>

                                                {a.internshipTitle}

                                            </td>

                                            <td>

                                                <span className="match-badge">

                                                    {

                                                        Math.round(

                                                            a.matchPercentage

                                                        )

                                                    }

                                                    %

                                                </span>

                                            </td>

                                            <td>

                                                {

                                                    new Date(

                                                        a.allocatedAt

                                                    ).toLocaleDateString("en-IN")

                                                }

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td
                                            colSpan="5"
                                            style={{
                                                textAlign: "center",
                                                padding: "30px"
                                            }}
                                        >

                                            No confirmed allocations yet.

                                        </td>

                                    </tr>

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default Allocations;