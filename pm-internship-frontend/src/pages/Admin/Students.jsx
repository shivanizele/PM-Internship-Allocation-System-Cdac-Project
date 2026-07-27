import { useEffect, useState } from "react";
import { FaSearch, FaUsers } from "react-icons/fa";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Students.css";
import api, { openResume } from "../../services/api";

function Students() {

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = () => {
        api.get("/admin/students")
            .then(res => setStudents(res.data))
            .catch(err => console.log(err));
    };

    const deleteStudent = (id) => {

        if (!window.confirm("Are you sure you want to delete this student?"))
            return;

        api.delete(`/admin/students/${id}`)
            .then(() => loadStudents())
            .catch(err => console.log(err));
    };

    const filteredStudents = students.filter(student =>
        student.fullName.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <DashboardLayout>

            <div className="students-page">

                {/* Header */}

                <div className="students-header">

                    <div>

                        <h1>🎓 Student Management</h1>

                        <p>
                            Manage all registered students, view resumes,
                            and maintain student records in the
                            PM Internship Allocation System.
                        </p>

                    </div>

                    <div className="student-count">

                        <FaUsers />

                        <div>

                            <h2>{students.length}</h2>

                            <span>Total Students</span>

                        </div>

                    </div>

                </div>

                {/* Search */}

                <div className="search-container">

                    

                    <input
                        type="text"
                        className="search-box"
                        placeholder="Search student by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                {/* Table */}

                <div className="table-container">

                    <table className="student-table">

                        <thead>

                            <tr>

                                <th>Name</th>
                                <th>Email</th>
                                <th>College</th>
                                <th>Branch</th>
                                <th>CGPA</th>
                                <th>Location</th>
                                <th>Resume</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredStudents.length > 0 ? (

                                filteredStudents.map(student => (

                                    <tr key={student.id}>

                                        <td>{student.fullName}</td>

                                        <td>{student.email}</td>

                                        <td>{student.collegeName}</td>

                                        <td>{student.branch}</td>

                                        <td>{student.cgpa}</td>

                                        <td>{student.location}</td>

                                        <td>

                                            {student.resume ? (

                                                <button
                                                    className="resume-btn"
                                                    onClick={() =>
                                                        openResume(student.resume)
                                                            .catch(() =>
                                                                alert("Unable to open resume.")
                                                            )
                                                    }
                                                >
                                                    📄 View Resume
                                                </button>

                                            ) : (

                                                <span className="no-resume">
                                                    No Resume
                                                </span>

                                            )}

                                        </td>

                                        <td>

                                            <button
                                                className="delete-btn"
                                                onClick={() => deleteStudent(student.id)}
                                            >
                                                🗑 Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="8" className="empty-data">

                                        No students found.

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

export default Students;