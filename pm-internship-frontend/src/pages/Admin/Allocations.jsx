import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import api from "../../services/api";
import "./Allocations.css";

function Allocations() {
    const [allocations, setAllocations] = useState([]);
    const [preview, setPreview] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadAllocations = async () => {
        try { setAllocations((await api.get("/admin/allocations")).data || []); }
        catch (err) { setError(err.response?.data || "Unable to load allocations."); }
    };
    useEffect(() => { loadAllocations(); }, []);

    const generatePreview = async () => {
        setLoading(true); setError("");
        try { setPreview((await api.get("/allocation/preview")).data || []); }
        catch (err) { setError(err.response?.data || "Unable to generate allocation preview."); }
        finally { setLoading(false); }
    };
    const confirmAllocation = async () => {
        if (!window.confirm("Confirm the reviewed allocation recommendations?")) return;
        setLoading(true); setError("");
        try { alert((await api.post("/allocation/confirm")).data); setPreview([]); loadAllocations(); }
        catch (err) { setError(err.response?.data || "Unable to confirm allocation."); }
        finally { setLoading(false); }
    };

    return <DashboardLayout>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
            <div><h1 className="mb-1">AI Allocation Review</h1><p className="mb-0">Review recommendations before confirming allocations.</p></div>
            <div className="d-flex gap-2"><button className="btn btn-primary" onClick={generatePreview} disabled={loading}>{loading ? "Generating..." : "Generate AI Allocation"}</button>{preview.length > 0 && <button className="btn btn-success" onClick={confirmAllocation} disabled={loading}>Confirm Allocation</button>}</div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {preview.map(item => <div className="card mb-3" key={item.internshipId}><div className="card-body"><h4>{item.internshipTitle}</h4><p>{item.companyName} · Seats available: {item.availableSeats} · Applicants: {item.applicantCount}</p>{item.recommendedStudents.length ? <ol>{item.recommendedStudents.map(student => <li key={student.applicationId}><strong>{student.studentName}</strong> — {Math.round(student.matchScore)}% match</li>)}</ol> : <p className="mb-0">No eligible recommendation for this internship.</p>}</div></div>)}
        <h2 className="mt-5">Confirmed Allocations</h2>
        <div className="table-responsive"><table className="student-table"><thead><tr><th>Student</th><th>Company</th><th>Internship</th><th>Match</th><th>Allocated On</th></tr></thead><tbody>{allocations.map(a => <tr key={a.allocationId}><td>{a.studentName}</td><td>{a.companyName}</td><td>{a.internshipTitle}</td><td>{Math.round(a.matchPercentage)}%</td><td>{new Date(a.allocatedAt).toLocaleDateString("en-IN")}</td></tr>)}</tbody></table></div>
    </DashboardLayout>;
}
export default Allocations;
